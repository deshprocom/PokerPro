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
            showToolBar:true,//隐藏显示工具栏
        };
    }

    componentWillMount() {
        //获取用户的信息
        this.getUserInfo();
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
        let userInfo = this.otherInfo;
        JMessage.enterConversation({type: 'single', username: userInfo.username},
            (conversation) => {

            }, (error) => {

            });

        //重置未读消息
        JMessage.resetUnreadMessageCount({type: 'single', username: userInfo.username},
            (conversation) => {
                ///回调，更新上一页数据
                if (userInfo.reloadPage !== undefined) {
                    userInfo.reloadPage();
                }
            }, (error) => {

            });
    };

    //获取用户的信息
    getUserInfo = () => {
        //获取当前用户自己的信息
        JMessage.getMyInfo((myInfo) => {
            this.myInfo = myInfo;

            console.log("自己的信息", this.myInfo);
            this.setState({myUserName: myInfo.username});
        });

        //获取其他用户的信息
        this.otherInfo = this.props.params.userInfo;
        console.log("其他人的信息", this.otherInfo);
    };

    ///历史消息
    getHistoryMessage = () => {
        let userInfo = this.otherInfo;
        let param = {
            type: "single",
            username: userInfo.username,
            from: this.state.currentIndex,
            limit: 10,
        };
        JMessage.getHistoryMessages(param,
            (messageArray) => {
                // 以参数形式返回消息对象数组
                console.log("历史消息", messageArray);
                this.setState({currentIndex: this.state.currentIndex + 10});

                let newMsgArray = [];
                messageArray.forEach((message) => {
                    let newMessage = this.createMessageBody(message);
                    if (newMessage !== undefined) {
                        newMsgArray.push(newMessage);
                    }
                });
                this.addMessage(newMsgArray);

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
        console.log("收到新的消息了", message);
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


    ///添加消息
    addMessage = (messages) => {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    };

    ///发送图片
    onSendImage = (mediaPath) => {
        this.createMessage({messageType: "image", path: mediaPath});
    };


    ///发送消息
    onSend(messages = []) {
        console.log("发送的消息", messages);
        let message = messages[0];
        let newMsg = {
            messageType: "text",
            text: message.text,
        };
        this.createMessage(newMsg);
    }


    createMessage = (msg) => {
        let userInfo = this.otherInfo;
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


                ///回调，更新上一页数据
                if (userInfo.reloadPage !== undefined) {
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

    ///自定义消息组件
    createSystemMsg = (props) => {
        console.log("创建系统消息", props);
        let message = props.currentMessage;
        let currentName = message.user._id;

        let username = this.myInfo.username;
        if (username === currentName) {
            ///其他人发的消息
            return (
                <OtherMessage message={message}/>
            );
        }
        else {
            ///自己发的消息
            return (
                <SelfMessage message={message}/>
            );
        }

    };

    //自定义输入框左侧按钮组件
    createToolButton = () => {
        return (
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => {
                    Keyboard.dismiss();
                    this.setState({showToolBar:!this.state.showToolBar})
                }}>
                    <Image source={Images.social.chat_more} style={styles.btnIcon}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={Images.social.chat_emoji} style={styles.btnIcon}/>
                </TouchableOpacity>
            </View>
        );
    };

    //自定义底部工具栏组件
    createToolBar = () => {
        return (
            <View style={styles.superView}>
                <TouchableOpacity style={{flex:1}}>
                    <View style={styles.subView}>
                        <Image source={Images.social.chat_picture} style={[{width:Metrics.reallySize(34)},{height:Metrics.reallySize(34)}]}/>
                        <Text style={styles.text}>图片</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1}} onPress={() => {router.toTakePhoto({imageInfo:(images) => {
                        this.onSendImage(images);
                    }})}}>
                    <View style={styles.subView}>
                        <Image source={Images.social.chat_takephoto} style={[{width:Metrics.reallySize(39)},{height:Metrics.reallySize(34)}]}/>
                        <Text style={styles.text}>拍照</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1}}>
                    <View style={styles.subView}>
                        <Image source={Images.social.chat_picture} style={[{width:Metrics.reallySize(34)},{height:Metrics.reallySize(34)}]}/>
                        <Text style={styles.text}>语音</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };


    render() {
        let userInfo = this.otherInfo;
        //{username: "ngdy6037671", nickName: "测试as度假酒店"}
        return (
            <View style={styles.container}>
                {/*导航栏*/}
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: "white"}}
                    title={userInfo.nickName}
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
                        label={'发送 '}
                        textStyle={{height: 27}}
                        // renderSend={() => {}}
                        messages={this.state.messages}              //消息
                        showUserAvatar={true}                       //显示自己的头像
                        // loadEarlier={true}                          //加载历史消息
                        // isLoadingEarlier={true}                     //在加载早期消息时显示
                        // onLoadEarlier={this.getHistoryMessage()}    //加载更早的消息
                        onKeyboardWillShow={() => {alert("!11")}}
                        onKeyboardWillHide={() => {alert("!22")}}
                        renderSystemMessage={this.createSystemMsg}  //自定义系统消息
                        renderActions={this.createToolButton}       //自定义左侧按钮
                        placeholder={"新消息"}
                        onSend={messages => this.onSend(messages)}  //发送消息
                        user={{
                            _id: this.state.myUserName,
                        }}
                    />
                }
                {this.state.showToolBar?this.createToolBar():null}

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
    textInput:{
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        lineHeight: 16,
        marginTop: Platform.select({
            ios: 6,
            android: 0,
        }),
        marginBottom: Platform.select({
            ios: 5,
            android: 3,
        }),
    },
    text:{
        marginTop:Metrics.reallySize(9),
        fontSize:15,
        color:"#888888",
    }
});