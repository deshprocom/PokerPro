/**
 * Created by hfl on 2018/4/13.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';

import {GiftedChat, Avatar} from 'react-native-gifted-chat';
import {Colors, Images, Metrics} from "../../Themes";
import NavigationBar from "../../components/NavigationBar";
import JMessage from "jmessage-react-plugin";
import I18n from "react-native-i18n";
import {showToast} from "../../utils/ComonHelper";
import SelfMessage from "./SelfMessage";
import OtherMessage from "./OtherMessage";
import {screenHeight, screenWidth} from "../socials/Header";
import VideoToast from "./VideoToast";
import ImagePicker from 'react-native-image-crop-picker';

const iOS = Platform.OS === "ios" ? "1" : "0";

const iPhone_X = iOS === "1" && screenWidth === 375 && screenHeight === 812 ? "1" : "0";

const marginBottom = iPhone_X === "1" ? 34 : 2;

export default class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            myUserName: "",
            messages: [],
            showToolBar: false,//隐藏显示工具栏
            videoPath: "",
            moreText: "加载更多",
            otherInfo: {},
        };
    }

    componentWillMount() {
        //获取用户的信息
        this.getChatUserInfo();
    }

    componentDidMount() {
        ///历史消息
        this.getHistoryMessage();
        //进入聊天室
        this.enterChat();

        ///添加消息监听
        JMessage.addReceiveMessageListener(this.receiveMessage);

        ///监听登录状态
        JMessage.addLoginStateChangedListener(this.loginState);
    }

    componentWillUnmount() {
        //继续接收推送
        JMessage.exitConversation();

        ///移除消息监听
        JMessage.removeReceiveMessageListener(this.receiveMessage);

        ///移除登录状态监听
        JMessage.removeLoginStateChangedListener(this.loginState);
    }

    ///进入聊天室
    enterChat = () => {
        //停止接收推送
        let userInfo = this.state.otherInfo;
        JMessage.enterConversation({type: 'single', username: userInfo.username},
            (conversation) => {

            }, (error) => {

            });

        //重置未读消息
        JMessage.resetUnreadMessageCount({type: 'single', username: userInfo.username},
            (conversation) => {
                ///回调，更新上一页数据
                if (this.props.params.userInfo.reloadPage !== undefined) {
                    this.props.params.userInfo.reloadPage();
                }
            }, (error) => {

            });
    };

    //获取用户的信息
    getChatUserInfo = () => {
        //获取当前用户自己的信息
        JMessage.getMyInfo((myInfo) => {
            this.myInfo = myInfo;
            this.setState({myUserName: myInfo.username});
        });
        this.setState({otherInfo: this.props.params.userInfo});
        JMessage.getUserInfo({username: this.props.params.userInfo.username},
            (userInfo) => {
                this.setState({otherInfo: userInfo});
            }, (error) => {
            });
    };

    ///历史消息
    getHistoryMessage = () => {
        let userInfo = this.state.otherInfo;
        let param = {
            type: "single",
            username: userInfo.username,
            from: this.state.currentIndex,
            limit: 20,
        };
        JMessage.getHistoryMessages(param,
            (messageArray) => {
                // 以参数形式返回消息对象数组
                if (messageArray.length < 20) {
                    this.setState({moreText: "没有更多了"});
                }

                let newMsgArray = [];
                messageArray.forEach((message) => {
                    let newMessage = this.createMessageBody(message);
                    if (newMessage !== undefined) {
                        newMsgArray.push(newMessage);
                    }
                });
                this.setState(previousState => ({
                    currentIndex: this.state.currentIndex + 20,
                    messages: GiftedChat.prepend(previousState.messages, newMsgArray),
                }))

            }, (error) => {
                ///被挤下线
                if (error.code === 863004) {
                    showToast(I18n.t('error_alert'));
                    router.pop()
                }
            });
    };

    //收到消息
    receiveMessage = (message) => {
        let newMessage = this.createMessageBody(message);
        if (newMessage !== undefined) {
            this.addMessage([newMessage]);
        }
    };

    //登录状态监听
    loginState = (message) => {
        if (message.type === "user_kicked") {
            showToast(I18n.t('error_alert'));
            router.pop()
        }
    };


    ///创建消息体
    createMessageBody = (message) => {
        const {id, type, text, target, thumbPath, path} = message;
        const {username, avatarThumbPath, nickname} = target;
        let user = {
            _id: username,
            name: nickname,
            avatar: avatarThumbPath,
        };
        let newMessage = {
            _id: id,
            user: user,
            system: true,
        };

        if (type === "text") {
            newMessage.type = "text";
            newMessage.text = text;
        }

        if (type === "image") {
            newMessage.type = "image";
            newMessage.image = thumbPath;
        }

        if (type === "voice") {
            newMessage.type = "voice";
            newMessage.path = path;
        }

        if (type === "file") {
            newMessage.system = true;
            newMessage.type = "video";
            newMessage.path = path;
        }

        return newMessage;
    };

    //消息点击
    clickMessageAction = (message) => {
        let {type, image, path, _id} = message;
        if (type === "image") {
            let images = [{url: image}];
            router.toImageGalleryPage(images, 0);
        }
        if (type === "video") {
            let url = path;

            ///视频未下载
            if (url === "") {
                let userInfo = this.state.otherInfo;
                let parma = {
                    type: "single",
                    username: userInfo.username,
                    messageId: _id,
                };
                JMessage.downloadFile(parma,
                    (result) => {
                        console.log("下载文件成功");
                        this.setState({videoPath: result.filePath});
                        message.path = result.filePath;
                    }, (error) => {
                        console.log("下载文件失败");
                    });
            }
            else {
                this.setState({videoPath: url});
            }

        }
    };


    ///添加消息
    addMessage = (messages) => {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    };

    ///发送视频
    onSendVideo = (mediaPath) => {
        this.createMessage({messageType: "file", path: mediaPath});
    };

    ///发送图片
    onSendImage = (mediaPath) => {
        this.createMessage({messageType: "image", path: mediaPath});
    };

    ///发送文字
    onSendMessage = (messages) => {
        let message = messages[0];
        let newMsg = {
            messageType: "text",
            text: message.text,
        };
        this.createMessage(newMsg);
        // if (text === "") {
        //     showToast("输入为空");
        //     return;
        // }
        // let newMsg = {
        //     messageType: "text",
        //     text: text,
        // };
        // this.createMessage(newMsg);

    };

    ///选择图片
    selectedImage = () => {
        ImagePicker.openPicker({}).then(image => {
            let type = image.mime;
            let path = image.path;
            let videoPath = path.replace("file://", "");
            if (type.indexOf("image") !== -1) {
                this.onSendImage(videoPath);
            }
            else if (type.indexOf("video") !== -1) {
                this.onSendVideo(videoPath);
            }
        }).catch(e => {
            // Alert.alert(e.message ? e.message : e);
        });
    };


    ///创建消息
    createMessage = (msg) => {
        let userInfo = this.state.otherInfo;
        let msgInfo = {
            type: "single",
            username: userInfo.username,
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

            console.log("发送一条" + msg.messageType + "类型的消息");
            //发送消息
            JMessage.sendMessage({
                id: message.id,
                type: msgInfo.type,
                username: msgInfo.username,
            }, (jmessage) => {
                let newMessage = this.createMessageBody(jmessage);
                if (newMessage !== undefined) {
                    this.addMessage([newMessage]);
                }
                console.log("发送成功", jmessage);


                ///回调，更新上一页数据
                if (this.props.params.userInfo.reloadPage !== undefined) {
                    this.props.params.userInfo.reloadPage();
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

    ///自定义消息组件
    createSystemMsg = (props) => {
        let message = props.currentMessage;
        let currentName = message.user._id;
        let username = this.myInfo.username;
        if (username === currentName) {
            message.userInfo = this.state.otherInfo;
            ///其他人发的消息
            return (
                <OtherMessage message={message} messageClick={() => {
                    this.clickMessageAction(message)
                }}/>
            );
        }
        else {
            message.userInfo = this.myInfo;
            ///自己发的消息
            return (
                <SelfMessage message={message} messageClick={() => {
                    this.clickMessageAction(message)
                }}/>
            );
        }

    };

    //自定义输入框左侧按钮组件
    createToolButton = () => {
        return (
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => {
                    Keyboard.dismiss();
                    this.setState({showToolBar: !this.state.showToolBar})
                }}>
                    <Image source={Images.social.chat_more} style={styles.btnIcon}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={Images.social.chat_emoji} style={styles.btnIcon}/>
                </TouchableOpacity>
            </View>
        );
    };

    renderAccessoryAction = () => {
        return(
            <View style={{flex:1}}>
                <View style={[{height:1},{backgroundColor:"#f5f5f5"}]}/>
                <View style={[{flex:1},{flexDirection:"row"},{alignItems:"center"}]}>
                    <TouchableOpacity onPress={this.selectedImage}>
                        <Image source={Images.social.chat_picture}
                               style={[{width: Metrics.reallySize(25)}, {marginLeft:17},{height: Metrics.reallySize(25)}]}/>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={() => {
                        router.toTakePhoto({
                            fileInfo: (file) => {
                                let type = file.type;
                                if (type === "image") {
                                    this.onSendImage(file.path);
                                }
                                else {
                                    this.onSendVideo(file.path);
                                }
                            }
                        })
                    }}>
                        <Image source={Images.social.chat_takephoto}
                               style={[{width: Metrics.reallySize(28)},  {marginLeft:30},{height: Metrics.reallySize(25)}]}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    //自定义底部工具栏组件
    createToolBar = () => {
        return (
            <View style={styles.superView}>
                <TouchableOpacity style={{flex: 1}} onPress={this.selectedImage}>
                    <View style={styles.subView}>
                        <Image source={Images.social.chat_picture}
                               style={[{width: Metrics.reallySize(34)}, {height: Metrics.reallySize(34)}]}/>
                        <Text style={styles.text}>图片</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}} onPress={() => {
                    router.toTakePhoto({
                        fileInfo: (file) => {
                            let type = file.type;
                            if (type === "image") {
                                this.onSendImage(file.path);
                            }
                            else {
                                this.onSendVideo(file.path);
                            }
                        }
                    })
                }}>
                    <View style={styles.subView}>
                        <Image source={Images.social.chat_takephoto}
                               style={[{width: Metrics.reallySize(39)}, {height: Metrics.reallySize(34)}]}/>
                        <Text style={styles.text}>拍照</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}}>
                    <View style={styles.subView}>
                        <Image source={Images.social.chat_picture}
                               style={[{width: Metrics.reallySize(34)}, {height: Metrics.reallySize(34)}]}/>
                        <Text style={styles.text}>语音</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    renderEarlyMessage = () => {
        return (
            <View style={styles.subView}>

                {this.state.moreText === "加载更多" ?
                    <TouchableOpacity onPress={() => {
                        this.getHistoryMessage();
                    }}>
                        <View style={styles.moreView}>
                            <Text style={styles.moreText}>加载更多</Text>
                        </View>
                    </TouchableOpacity>
                    : null}
                :null}
            </View>

        );
    };
    createTextInput = () => {
        return (
            <TextInput placeholder={"新消息"}
                       style={styles.textInput}
                       onFocus={() => {
                           this.setState({showToolBar: false})
                       }}
                       returnKeyType={"send"}
                       onSubmitEditing={(event) => this.onSendMessage(event.nativeEvent.text)}
                       ref={ref => this.textField = ref}
                       blurOnSubmit={false}
            />
        );
    };

    render() {
        let userInfo = this.state.otherInfo;
        return (
            <View style={styles.container}>
                {/*导航栏*/}
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: "white"}}
                    title={userInfo.nickname}
                    titleStyle={{color: Colors._333}}
                    leftBtnIcon={Images.set_back}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        router.pop()
                    }}
                    rightBtnIcon={Images.social.more_3}
                    rightImageStyle={{height: 4, width: 19, marginLeft: 20, marginRight: 20}}
                    rightBtnPress={() => {
                        // this.popAction && this.popAction.toggle()
                    }}
                />

                {this.state.myUserName === "" ? null :
                    <GiftedChat
                        // textStyle={{height: 27}}
                        messages={this.state.messages}              //消息
                        showUserAvatar={true}                       //显示自己的头像
                        loadEarlier={true}
                        renderLoadEarlier={this.renderEarlyMessage}           //加载历史消息
                        renderSystemMessage={this.createSystemMsg}  //自定义系统消息
                        user={{
                            _id: this.state.myUserName,
                        }}
                        label={"发送"}
                        onSend = {(event) => this.onSendMessage(event)}
                        placeholder={"新消息"}
                        renderAccessory={this.renderAccessoryAction}
                        // renderComposer={this.createTextInput}
                        // renderActions={this.createToolButton}       //自定义左侧按钮
                    />
                }
                {/*{this.state.showToolBar ? this.createToolBar() : null}*/}

                {this.state.videoPath !== "" ? <VideoToast videoUrl={this.state.videoPath} hiddenVideoAction={() => {
                    this.setState({videoPath: ""})
                }}/> : null}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    btnIcon: {
        width: Metrics.reallySize(26),
        height: Metrics.reallySize(26),
        marginTop: (50 - Metrics.reallySize(26)) / 2,
        marginBottom: (50 - Metrics.reallySize(26)) / 2,
        marginLeft: 17,
    },
    superView: {
        height: 200,
        flexDirection: "row",
    },
    subView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        flex: 1,
        height: 49,
        marginLeft: 10,
        marginRight: 17,
    },
    text: {
        marginTop: Metrics.reallySize(9),
        fontSize: 15,
        color: "#888888",
    },
    moreView: {
        backgroundColor: "#1D89FA",
        borderRadius: 4,
    },
    moreText: {
        padding: 10,
        color: "white",
    }
});