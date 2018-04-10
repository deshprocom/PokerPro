import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules,
    Dimensions
} from 'react-native';
import IMUI from "aurora-imui-react-native";
import JMessage from "jmessage-react-plugin";
import NavigationBar from "../../components/NavigationBar";
import PopAction from '../comm/PopAction';
import VideoToast from "./VideoToast";
import ImagePicker from 'react-native-image-crop-picker';
import {Colors,Images} from "../../Themes";
import I18n from "react-native-i18n";
import {showToast} from '../../utils/ComonHelper';


let MessageList = IMUI.MessageList;
let ChatInput = IMUI.ChatInput;
const AuroraIController = IMUI.AuroraIMUIController;
const window = Dimensions.get('window');
let IS_HTTP = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;

export default class ChatMessage extends Component {
    constructor(props) {
        super(props);
        ///输入框初始高度
        let initHeight;
        if (Platform.OS === "android") {
            initHeight = 100
        } else {
            initHeight = 86
        }

        this.state = {
            messageListLayout: {},
            inputViewLayout: {width: window.width, height: initHeight},
            menuContainerHeight: 625,
            currentIndex: 0,
            videoPath:"",
        };

        //获取当前用户自己的信息
        JMessage.getMyInfo((myInfo) => {
            console.log(myInfo);
            this.myInfo = myInfo;
        });
    }


    componentDidMount() {
        this.resetMenu();
        this.enterChat();
        this.setState({messageListLayout: {flex: 1, margin: 0, width: window.width}});


        ///历史消息
        this.getHistoryMessage();

        ///添加消息监听
        JMessage.addReceiveMessageListener(this.receiveMessage);



        ///监听登录状态
        JMessage.addLoginStateChangedListener(this.loginState);
    }

    componentWillUnmount() {
        ///移除消息监听
        JMessage.removeReceiveMessageListener(this.receiveMessage);

        //继续接收推送
        JMessage.exitConversation();

        ///移除登录状态监听
        JMessage.removeMessageRetractListener(this.loginState)
    }

    enterChat = () => {
        //停止接收推送
        let userInfo = this.props.params.userInfo;
        JMessage.enterConversation({ type: 'single', username: userInfo.username},
            (conversation) => {

            }, (error) => {

            });
    };


    ///历史消息
    getHistoryMessage = () => {
        let userInfo = this.props.params.userInfo;
        let param = {
            type: "single",
            username: userInfo.username,
            from: this.state.currentIndex,
            limit: 10,
        };
        JMessage.getHistoryMessages(param,
            (messageArray) => { // 以参数形式返回消息对象数组
                // do something.
                this.setState({currentIndex: this.state.currentIndex + 10});
                let resultArray = [];

                messageArray.forEach((message) => {
                    let msg = this.convertJMessageToAuroraMsg(message);
                    resultArray.push(msg);
                    ///消息是视频而且未下载
                    if (msg.msgType === "video" && msg.mediaPath === ""){
                        let params = {
                            type: "single",
                            username: userInfo.username,
                            messageId: msg.msgId,
                        };
                        JMessage.downloadFile(params,
                            (result) => {
                                // msg.mediaPath = result.filePath;
                                // AuroraIController.updateMessage(msg);
                            }, (error) => {
                                console.log("下载文件失败");
                            });
                    }
                });
                AuroraIController.insertMessagesToTop(resultArray);
            }, (error) => {
                ///被挤下线
                if(error.code === 863004)
                {
                    showToast(I18n.t('error_alert'));
                    router.pop()
                }
            });
    };

    onClickSelectAlbum = () => {
        ImagePicker.openPicker({
            compressImageQuality: 0.5,
            compressImageMaxWidth: 1024,
            compressImageMaxHeight: 1024,
            mediaType: 'photo'
        }).then(image => {
            let image_path = image.path;
            if (Platform.OS !== "ios")
                image_path = image.path.replace(/^file:\/\//g, "")
            this.createMessage({messageType: "image", path: image_path});
        });
    };

    //登录状态
    loginState = (message) => {
        if (message.type === "user_kicked"){
            showToast(I18n.t('error_alert'));
            router.pop()
        }
    };


    //收到消息
    receiveMessage = (message) => {
        if (message.target.type === 'user') {

            let userInfo = this.props.params.userInfo;
            ///回调，更新上一页数据
            if (userInfo.reloadPage !== undefined)
            {
                userInfo.reloadPage();
            }

            let parma = {
                type: "single",
                username: userInfo.username,
                messageId: message.id,
            };
            //如果是文件类型 自动进行下载
            if (message.type === "file") {
                JMessage.downloadFile(parma,
                    (result) => {
                        let imgPath = result.filePath;
                        console.log("下载文件成功");
                        message.path = imgPath;

                        let msg = this.convertJMessageToAuroraMsg(message);
                        AuroraIController.appendMessages([msg]);

                    }, (error) => {
                        console.log("下载文件失败");
                    });
            }
            else {
                let msg = this.convertJMessageToAuroraMsg(message);
                AuroraIController.appendMessages([msg]);
            }
        }
    };


    //重置菜单栏
    resetMenu = () => {
        if (Platform.OS === "android") {
            this.refs["ChatInput"].showMenu(false);
            this.setState({messageListLayout: {flex: 1, width: window.width, margin: 0},});
        } else {
            this.setState({inputViewLayout: {width: window.width, height: 86}});
        }
    };
    ///下拉加载更多
    onPullToRefresh = () => {
        this.getHistoryMessage();
    };


    //头像点击
    onAvatarClick = (message) => {
        console.log(message)
    };

    //消息点击
    onMsgClick = (message) => {
        if (message.msgType === "video") {
            let url = message.mediaPath;

            ///视频未下载
            if (url === ""){
                let userInfo = this.props.params.userInfo;
                let parma = {
                    type: "single",
                    username: userInfo.username,
                    messageId: message.msgId,
                };
                JMessage.downloadFile(parma,
                    (result) => {
                        console.log("下载文件成功");
                        this.setState({videoPath:result.filePath});
                        message.mediaPath = result.filePath;
                        AuroraIController.updateMessage(message);
                    }, (error) => {
                        console.log("下载文件失败");
                    });
            }
            else {
                this.setState({videoPath:url});
            }

        }
        if (message.msgType === "image") {
            let image_url = message.mediaPath;
            if (!IS_HTTP.test(image_url) && Platform.OS !== 'ios')
                image_url = 'file://' + image_url;
            let images = [{url: image_url}];
            router.toImageGalleryPage(images, 0);
        }
    };

    //点击消息状态按钮触发
    onStatusViewClick = (message) => {
        message.status = 'send_succeed';
        message.fromUser.avatarPath = message.mediaPath;
        AuroraIController.updateMessage(message)
    };

    //点击消息列表
    onTouchMsgList = () => {
        AuroraIController.hidenFeatureView(true)
    };

    //开始滑动消息列表的时候触发，用于调整布局
    onBeginDragMessageList = () => {
        this.updateLayout({width: window.width, height: 86,});
        AuroraIController.hidenFeatureView(true)
    };


    ///进入编辑状态改变组件布局
    onInputViewSizeChange = (size) => {
        if (this.state.inputLayoutHeight !== size.height) {
            this.setState({
                inputLayoutHeight: size.height,
                inputViewLayout: {width: size.width, height: size.height},
                messageListLayout: {flex: 1, width: window.width, margin: 0}
            })
        }
    };

    ///更新组件布局
    updateLayout = (layout) => {
        this.setState({inputViewLayout: layout});
    };

    //键盘显示
    onShowKeyboard = (keyboard_height) => {
        let inputViewHeight = keyboard_height + 86;
        this.updateLayout({width: window.width, height: inputViewHeight});
    };


    //点击输入框
    onTouchEditText = () => {
        this.refs["ChatInput"].showMenu(false);
        this.setState({inputViewLayout: {width: window.width, height: this.state.inputLayoutHeight}});
    };

    //全屏显示拍照
    onFullScreen = () => {
        this.setState({
            messageListLayout: {flex: 0, width: 0, height: 0},
            inputViewLayout: {flex: 1, width: window.width, height: window.height}
        })
    };

    //半屏显示拍照
    onRecoverScreen = () => {
        this.setState({
            messageListLayout: {flex: 1, width: window.width, margin: 0},
            inputViewLayout: {flex: 0, width: window.width, height: this.state.inputLayoutHeight}
        })
    };

    //点击菜单栏麦克风按钮触发
    onSwitchToMicrophoneMode = () => {
        AuroraIController.scrollToBottom(true)
    };

    //点击菜单栏图片按钮触发。
    onSwitchToGalleryMode = () => {
        AuroraIController.scrollToBottom(true)
    };

    //点击菜单栏拍照按钮触发。
    onSwitchToCameraMode = () => {
        AuroraIController.scrollToBottom(true)
    };

    ///发送表情
    onSwitchToEmojiMode = () => {
        AuroraIController.scrollToBottom(true)
    };

    ///发送文字消息
    onSendText = (text) => {
        let msg = this.createMessage({messageType: "text", text: text});
    };

    ///开始录音
    onStartRecordVoice = (e) => {
        console.log("on start record voice")
    };

    ///取消录音
    onCancelRecordVoice = () => {
        console.log("on cancel record voice")
    };

    ///结束录音,发送语音消息
    onFinishRecordVoice = (mediaPath, duration) => {
        this.createMessage({messageType: "voice", path: mediaPath});
    };

    ///发送图片
    onSendGalleryFiles = (mediaFiles) => {
        for (let index in mediaFiles) {
            this.createMessage({messageType: "image", path: mediaFiles[index].mediaPath});
        }
    };

    ///拍照
    onTakePicture = (mediaPath) => {
        this.createMessage({messageType: "image", path: mediaPath.mediaPath});
    };

    ///开始录制视频
    onStartRecordVideo = () => {
        console.log("on start record video")
    };

    ///结束录制视频
    onFinishRecordVideo = (mediaPath) => {
        this.createMessage({messageType: "file", path: mediaPath.mediaPath});
    };


    /*
        创建消息
        msg 消息
        messageType 消息类型
        text    messageType为text时必传
        path    messageType为voice、image、file时必传
    */
    createMessage = (msg) => {
        let userInfo = this.props.params.userInfo;
        let msgInfo = {
            type: "single",//会话类型。可以为 'single' 或 'group'。
            username: userInfo.username,//对方用户的用户名。当 type 为 'single' 时，username 为必填。
            groupId: "", //对象群组 id。当 type 为 'group' 时，groupId 为必填。
            messageType: msg.messageType,
        };

        ///发送文字类型消息
        if (msg.messageType === "text") {
            msgInfo.text = msg.text;

        }

        ///语音类型 消息体拼接path字段
        if (msg.messageType === "voice") {
            msgInfo.path = msg.path;
        }

        ///图片类型 消息体拼接path字段
        if (msg.messageType === "image") {
            msgInfo.path = msg.path;
        }

        ///文件类型 消息体拼接path字段
        if (msg.messageType === "file") {
            msgInfo.path = msg.path;
        }


        console.log("创建一条" + msg.messageType + "类型的消息");
        console.log('消息对象', msgInfo);

        ///创建消息
        JMessage.createSendMessage(msgInfo, (message) => {


            this.sendingMessage(message);


            console.log("发送一条" + msg.messageType + "类型的消息");

            //发送消息
            JMessage.sendMessage({
                id: message.id,
                type: msgInfo.type,
                username: msgInfo.username,
            }, (jmessage) => {

                // 成功回调
                this.sendFinshMessage(jmessage);
                ///回调，更新上一页数据
                if (userInfo.reloadPage !== undefined)
                {
                    userInfo.reloadPage();
                }

            }, (error) => {
                // 失败回调
                console.log("发送" + msg.messageType + "类型消息失败");
                console.log(error);
            });

        }, (error) => {

            console.log("创建" + msg.messageType + "类型消息失败");
            console.log(error);
        });

    };

    ///正在发送消息，更新UI
    sendingMessage = (message) => {
        let auroraMsg = this.convertJMessageToAuroraMsg(message);
        auroraMsg.status = 'send_going';
        AuroraIController.appendMessages([auroraMsg]);
        AuroraIController.scrollToBottom(true);
    };

    ///消息发送完成，更新UI
    sendFinshMessage = (message) => {
        let auroraMsg = this.convertJMessageToAuroraMsg(message);
        AuroraIController.updateMessage(auroraMsg);
    };

    ///处理发送的消息
    convertJMessageToAuroraMsg = (jmessage) => {
        let auroraMsg = {};
        auroraMsg.msgType = jmessage.type;
        auroraMsg.msgId = jmessage.id;
        if (jmessage.type === 'text') {
            auroraMsg.text = jmessage.text
        }

        if (jmessage.type === 'image') {
            auroraMsg.mediaPath = jmessage.thumbPath
        }

        if (jmessage.type === 'voice') {
            auroraMsg.mediaPath = jmessage.path;
            auroraMsg.duration = jmessage.duration
        }

        if (jmessage.type === 'file') {
            auroraMsg.mediaPath = jmessage.path;
            auroraMsg.duration = jmessage.duration;
            auroraMsg.msgType = "video"
        }

        let user = {
            userId: "1",
            displayName: "",
            avatarPath: "",
        };

        user.userId = jmessage.from.username;
        user.displayName = jmessage.from.nickname;
        user.avatarPath = jmessage.from.avatarThumbPath;
        if (user.displayName === "") {
            user.displayName = jmessage.from.username;
        }
        if (user.avatarPath === "") {
            user.avatarPath = "/var/mobile/Containers/Data/Application/2DEEF1FD-C…5607b6/thumb/9C2C5D6B7B3A975EDFDDA4B7C802261D.jpg";
        }
        auroraMsg.fromUser = user;
        auroraMsg.status = "send_succeed";

        auroraMsg.isOutgoing = true;

        if (this.myInfo.username === jmessage.from.username) {
            auroraMsg.isOutgoing = true
        } else {
            auroraMsg.isOutgoing = false
        }

        auroraMsg.timeString = "";

        return auroraMsg;
    };

    //弹窗
    popActions = () => {
        return [{name: I18n.t('report'), txtStyle: {color: '#4A90E2'},onPress: () => this.report()},
            {name: I18n.t('add_blacklist'), txtStyle: {color: '#F24A4A'}, onPress: () => this.addBlacklist()},
            {name: I18n.t('cancel'), txtStyle: {color: Colors._AAA}, onPress: () => this.popAction.toggle()}]
    };

    //举报
    report = () => {

    };
    //拉黑
    addBlacklist = () => {
        let userInfo = this.props.params.userInfo;
        let param = {'usernameArray': [userInfo.username]}
        JMessage.addUsersToBlacklist(param,(success) => {
            showToast("添加黑名单成功");
            this.popAction && this.popAction.toggle();
        },(error) => {
            console.log("拉黑失败",error);
        });
    };


    render() {
        let userInfo = this.props.params.userInfo;
        return (
            <View style={styles.container}>
                {/*导航栏*/}
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: "white"}}
                    title={userInfo.nickName}
                    titleStyle={{color: Colors._333}}
                    leftBtnIcon={Images.set_back}
                    leftImageStyle={{height:19,width:11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        router.pop()
                    }}
                    rightBtnIcon={Images.social.more_3}
                    rightImageStyle={{height:4,width:19, marginLeft: 20, marginRight: 20}}
                    rightBtnPress={() => {
                        this.popAction && this.popAction.toggle()
                    }}
                />
                <MessageList style={this.state.messageListLayout}
                             ref="MessageList"
                             onAvatarClick={this.onAvatarClick}
                             onMsgClick={this.onMsgClick}
                             onStatusViewClick={this.onStatusViewClick}
                             onTouchMsgList={this.onTouchMsgList}
                             onTapMessageCell={this.onTapMessageCell}
                             onBeginDragMessageList={this.onBeginDragMessageList}
                             onPullToRefresh={this.onPullToRefresh}
                             avatarSize={{width: 40, height: 40}}
                             sendBubbleTextSize={18}
                             sendBubbleTextColor={"#000000"}
                             sendBubblePadding={{left: 10, top: 10, right: 15, bottom: 10}}
                             isAllowPullToRefresh={true}
                             isShowOutgoingDisplayName={true}
                             isShowDisplayName={true}
                />

                <ChatInput style={this.state.inputViewLayout}
                           ref="ChatInput"
                           menuContainerHeight={this.state.menuContainerHeight}
                           isDismissMenuContainer={this.state.isDismissMenuContainer}
                           onSendText={this.onSendText} // 输入文字后点击发送按钮触发
                           onTakePicture={this.onTakePicture}
                           onStartRecordVoice={this.onStartRecordVoice} //录音
                           onFinishRecordVoice={this.onFinishRecordVoice} //录音完成
                           onCancelRecordVoice={this.onCancelRecordVoice} //取消录音
                           onStartRecordVideo={this.onStartRecordVideo}
                           onFinishRecordVideo={this.onFinishRecordVideo}
                           onSendGalleryFiles={this.onSendGalleryFiles} //选中视频或图片后点击发送按钮触发
                           onSwitchToEmojiMode={this.onSwitchToEmojiMode} //发送表情
                           onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode} //点击菜单栏麦克风按钮触发
                           onSwitchToGalleryMode={this.onSwitchToGalleryMode} //点击菜单栏图片按钮触发。
                           onSwitchToCameraMode={this.onSwitchToCameraMode} //点击菜单栏拍照按钮触发。
                           onShowKeyboard={this.onShowKeyboard}
                           onTouchEditText={this.onTouchEditText}
                           onFullScreen={this.onFullScreen} //全屏显示拍照
                           onRecoverScreen={this.onRecoverScreen} //半屏显示拍照
                           onSizeChange={this.onInputViewSizeChange}
                           onClickSelectAlbum={this.onClickSelectAlbum}
                />

                {this.state.videoPath !== ""?<VideoToast videoUrl={this.state.videoPath} hiddenVideoAction={() => {this.setState({videoPath:""})}}/>:null}

                <PopAction
                    ref={ref => this.popAction = ref}
                    btnArray={this.popActions()}/>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        backgroundColor: 'green',
        width: window.width,
        height: 100,

    },
    btnStyle: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3e83d7',
        borderRadius: 8,
        backgroundColor: '#3e83d7'
    },
});