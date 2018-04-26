/**
 * Created by hfl on 2018/4/13.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    PermissionsAndroid, NativeModules
} from 'react-native';

import {GiftedChat, Avatar} from 'react-native-gifted-chat';
import {Colors, Images, Metrics} from "../../Themes";
import NavigationBar from "../../components/NavigationBar";
import JMessage from "jmessage-react-plugin";
import I18n from "react-native-i18n";
import {getFileName, localFilePath, showToast, strNotNull} from "../../utils/ComonHelper";
import SelfMessage from "./SelfMessage";
import OtherMessage from "./OtherMessage";
import {screenHeight, screenWidth} from "../socials/Header";
import VideoToast from "./VideoToast";
import ImagePicker from 'react-native-image-crop-picker';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import PopAction from '../comm/PopAction';
import {report_user, uploadImage} from '../../services/SocialDao';

import Thumb from 'react-native-thumb';
import {checkPermission} from "../comm/Permission";


let Sound = require('react-native-sound');
Sound.setCategory('Playback');

let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

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
            moreText: I18n.t("load_more"),
            inputVoice: false,//是否输入语音
            currentTime: 0.0, //开始录音到现在的持续时间
            recording: false, //是否正在录音
            stoppedRecording: false, //是否停止了录音
            finished: false, //是否完成录音
            audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac', //路径下的文件名
            hasPermission: undefined, //是否获取权限
            windowType: 1,//弹窗类型 1-举报、拉黑 2-举报原因
        };
    }

    componentWillMount() {
        //获取用户的信息
        this.getChatUserInfo();
    }

    componentDidMount() {
        ///检测是否有权限
        this.checkPermission().then((hasPermission) => {
            console.log(hasPermission);
            this.setState({hasPermission});

            if (!hasPermission) return;

            //准备录音
            this.prepareRecordingPath();


            ///录音时长
            AudioRecorder.onProgress = (data) => {
                this.setState({currentTime: Math.floor(data.currentTime)});
            };

            //录制完成
            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this.finishRecording(data.status === "OK", data.audioFileURL);
                }
            };
        });


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

        //停止播放语音
        if (this.sound) {
            this.sound.stop();
        }

        let userInfo = this.otherInfo;
        //重置未读消息
        JMessage.resetUnreadMessageCount({type: 'single', username: userInfo.username},
            (conversation) => {
                ///回调，更新上一页数据
                if (this.props.params.userInfo.reloadPage !== undefined) {
                    this.props.params.userInfo.reloadPage();
                }
            }, (error) => {

            });
    }

    //<!--------------------------------   极光相关   --------------------------------!>//
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
        ///其他人的信息
        this.otherInfo = this.props.params.userInfo;
    };

    ///历史消息
    getHistoryMessage = () => {
        let userInfo = this.otherInfo;
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
                    this.setState({moreText: I18n.t("no_more")});
                }

                console.log('数据库', messageArray)

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
        console.log("收到的消息:", message);
        const {username} = message.from;
        let newMessage = this.createMessageBody(message);

        if (newMessage !== undefined && username === this.otherInfo.username) {
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


    //<!--------------------------------   消息相关   --------------------------------!>//

    ///发送文字
    onSendMessage = (messages) => {
        let message = messages[0];
        let newMsg = {
            messageType: "text",
            text: message.text,
        };
        this.createMessage(newMsg);
    };

    ///发送语音
    onSendVoice = (mediaPath) => {
        this.createMessage({messageType: "voice", path: mediaPath});
    };


    ///发送视频
    onSendVideo = (mediaPath) => {
        Thumb.getVideoCover(mediaPath, (events) => {
            if (Platform.OS === 'android')
                events = 'file://' + events;
            this.uploadImageAction(events, (data) => {
                this.createMessage({messageType: "file", path: mediaPath, coverPath: data.image_path});
            });
        });
    };

    ///上传图片
    uploadImageAction = (imagePath, successCallBack) => {
        let formData = new FormData();
        let file = {uri: imagePath, type: "multipart/form-data", name: getFileName(imagePath)};
        formData.append("image", file);
        uploadImage(formData, data => {
            successCallBack(data);
        }, err => {
            this.uploadImageAction(imagePath, successCallBack);
        });
    };

    ///发送图片
    onSendImage = (mediaPath) => {
        this.createMessage({messageType: "image", path: mediaPath});
    };

    ///选择图片
    selectedImage = () => {
        checkPermission("photo", (result) => {
            if (result) {
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
            }
        });
    };

    ///创建并发送消息
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
            msgInfo.extras = {coverPath: msg.coverPath};
        }


        console.log("创建一条" + msg.messageType + "类型的消息");
        console.log('消息对象', msgInfo);
        msgInfo.id = 'msgId_1524644642276219';
        ///创建消息
        JMessage.createSendMessage(msgInfo, (message) => {

            message.serverMessageId = 0;
            let newMessage = this.createMessageBody(message);
            if (newMessage !== undefined) {
                this.addMessage([newMessage]);
            }

            console.log("发送一条", msg.messageType, "类型的消息:", message);
            //发送消息
            JMessage.sendMessage({
                id: message.id,
                type: msgInfo.type,
                username: msgInfo.username,
                extras: {coverPath: msg.coverPath}
            }, (jmessage) => {


                this.refresh(message, -1);

                console.log("发送成功", jmessage);

                ///回调，更新上一页数据
                if (this.props.params.userInfo.reloadPage !== undefined) {
                    this.props.params.userInfo.reloadPage();
                }

            }, (error) => {
                // 失败回调

                this.refresh(message, undefined);
                console.log("发送" + msg.messageType + "类型消息失败", error);

            });

        });

    };

    ///整理消息格式，添加到消息列表中
    createMessageBody = (message) => {
        const {id, type, text, target, thumbPath, path, duration, extras, serverMessageId} = message;
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
            serverMessageId: serverMessageId
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
            newMessage.duration = duration;
        }

        if (type === "file") {
            newMessage.type = "video";
            newMessage.path = path;
            newMessage.coverPath = extras.coverPath;
        }

        return newMessage;
    };


    ///将消息添加到消息列表
    addMessage = (messages) => {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    };

    refresh = (message, serverMessageId) => {
        this.state.messages.filter(m => {
            if (m._id === message.id) {
                m.serverMessageId = serverMessageId;

            }
            return m._id === message.id;
        })
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append([], this.state.messages)
            };
        });
    }

    //消息点击事件
    clickMessageAction = (message) => {
        console.log('消息点击事件', message)
        let {type, image, path, _id} = message;
        if (type === "image") {
            let images = [{url: localFilePath(image)}];
            router.toImageGalleryPage(images, 0);
        }
        if (type === "voice") {
            if (this.sound) {
                this.sound.stop(() => {
                    this.playVoice(path);
                });
            }
            else {
                this.playVoice(path);
            }
        }
        if (type === "video") {
            let url = path;

            ///视频未下载
            if (!strNotNull(url)) {
                let userInfo = this.otherInfo;
                let parma = {
                    type: "single",
                    username: userInfo.username,
                    messageId: _id,
                };
                JMessage.downloadFile(parma,
                    (result) => {
                        console.log("下载文件成功", result);
                        this.setState({videoPath: result.filePath});
                        message.path = result.filePath;
                    }, (error) => {
                        console.log("下载文件失败", error);
                    });
            }
            else {
                this.setState({videoPath: url});
            }

        }
    };

    //<!--------------------------------   播放录音相关   --------------------------------!>//
    playVoice = (mediaPath) => {
        this.sound = new Sound(mediaPath, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            setTimeout(() => {
                this.sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        });
    };


    //<!--------------------------------   录音相关   --------------------------------!>//
    ///准备录制
    prepareRecordingPath = () => {
        console.log('准备录制', audioPath)
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    };

    //开始录音
    record = async () => {

        if (this.state.recording) {
            console.warn('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
            return;
        }

        if (this.state.stoppedRecording) {
            this.prepareRecordingPath();
        }

        this.setState({recording: true, paused: false});

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    };

    //停止录音
    stop = async () => {
        if (!this.state.recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }

        this.setState({stoppedRecording: true, recording: false, paused: false});

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this.finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    };

    ///完成录制
    finishRecording = (didSucceed, filePath) => {

        if (this.state.currentTime === 0) {
            showToast(I18n.t("time_short"));
            return;
        }
        this.setState({finished: didSucceed, currentTime: 0});
        this.onSendVoice(filePath.replace("file://", ""));
    };

    //检测是否授权
    checkPermission = () => {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title': I18n.t("voice_root"),
            'message': I18n.t("voice_root_des")
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                return (result === true || PermissionsAndroid.RESULTS.GRANTED)
            });
    };

    //<!--------------------------------   举报弹窗相关   --------------------------------!>//
    //弹窗
    popActions = () => {
        if (this.state.windowType === 1) {
            return [{name: I18n.t('report'), txtStyle: {color: '#4A90E2'}, onPress: () => this.report()},
                {name: I18n.t('add_blacklist'), txtStyle: {color: '#F24A4A'}, onPress: () => this.addBlacklist()},
                {name: I18n.t('cancel'), txtStyle: {color: Colors._AAA}, onPress: () => this.popAction.toggle()}]

        }
        else {
            let reportList = global.reportList;
            let resultArray = [];
            reportList.forEach((data, index) => {
                let item = {name: data.name, txtStyle: {color: '#4A90E2'}, onPress: () => this.report(index)};
                resultArray.push(item);
            });
            resultArray.push({
                name: I18n.t('cancel'),
                txtStyle: {color: Colors._AAA},
                onPress: () => this.popAction.toggle()
            });

            return resultArray;
        }
    };

    //举报
    report = (index) => {
        if (index === undefined) {
            this.setState({windowType: 2});
            this.popAction && this.popAction.toggle();
            setTimeout(() => {
                this.popAction && this.popAction.toggle();
            }, 500);
            return;
        }
        let userInfo = this.otherInfo;
        let reportList = global.reportList;
        let data = reportList[index];
        let body = {
            "reported_user_id": userInfo.username,
            "body": data.name,
            "description": ""
        };
        report_user(body, (ret) => {
            showToast(I18n.t("report_success"));
        }, (err) => {
            console.log(err);
        });
        this.popAction && this.popAction.toggle();

    };
    //拉黑
    addBlacklist = () => {
        let userInfo = this.props.params.userInfo;
        let param = {'usernameArray': [userInfo.username]};
        JMessage.addUsersToBlacklist(param, (success) => {
            showToast(I18n.t("add_backlist_success"));
            this.popAction && this.popAction.toggle();
        }, (error) => {
            if (error.code === 861101) {
                showToast(I18n.t("add_backlist_failure"));
                this.popAction && this.popAction.toggle();
            }
        });
    };


    //<!--------------------------------   UI相关   --------------------------------!>//
    ///加载更多
    renderEarlyMessage = () => {
        return (
            <View style={styles.subView}>

                {this.state.moreText === I18n.t("load_more") ?
                    <TouchableOpacity onPress={() => {
                        this.getHistoryMessage();
                    }}>
                        <View style={styles.moreView}>
                            <Text style={styles.moreText}>{I18n.t("load_more")}</Text>
                        </View>
                    </TouchableOpacity>
                    : null}
            </View>

        );
    };

    ///自定义消息组件
    createSystemMsg = (props) => {
        let message = props.currentMessage;
        let currentName = message.user._id;
        let username = this.myInfo.username;
        if (username === currentName) {
            message.userInfo = this.otherInfo;
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
        let source = Images.social.voiceinput;
        if (this.state.inputVoice) {
            source = Images.social.keyboard;
        }

        return (
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => {
                    checkPermission("microphone", (result) => {
                        if (result) {
                            this.setState({inputVoice: !this.state.inputVoice})
                        }
                    });
                }}>
                    <Image source={source} style={styles.btnIcon}/>
                </TouchableOpacity>
                {/*<TouchableOpacity>*/}
                {/*<Image source={Images.social.chat_emoji} style={styles.btnIcon}/>*/}
                {/*</TouchableOpacity>*/}
            </View>
        );
    };


    ///输入语音
    createTextInput = () => {
        let color = this.state.recording ? "#ECECEE" : "white";
        return (
            <TouchableWithoutFeedback
                onLongPress={() => {
                    this.record();
                }}
                onPressOut={() => {
                    this.stop();
                }}
            >
                <View style={[styles.voiceView, {backgroundColor: color}]}>
                    <Text>{I18n.t("touch_speech")}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };


    ///第二排按钮
    renderAccessoryAction = () => {
        return (
            <View style={{flex: 1}}>
                <View style={[{height: 0.5}, {backgroundColor: "#E5E5E5"}]}/>
                <View style={[{flex: 1}, {flexDirection: "row"}, {alignItems: "center"}]}>
                    <TouchableOpacity onPress={this.selectedImage}>
                        <Image source={Images.social.chat_picture}
                               style={[{width: Metrics.reallySize(25)}, {marginLeft: 17}, {height: Metrics.reallySize(25)}]}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        checkPermission("camera", (result) => {
                            if (result) {
                                router.toCamera({
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
                            }
                        });
                    }}>
                        <Image source={Images.social.chat_takephoto}
                               style={[{width: Metrics.reallySize(28)}, {marginLeft: 30}, {height: Metrics.reallySize(25)}]}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    // //自定义底部工具栏组件
    // createToolBar = () => {
    //     return (
    //         <View style={styles.superView}>
    //             <TouchableOpacity style={{flex: 1}} onPress={this.selectedImage}>
    //                 <View style={styles.subView}>
    //                     <Image source={Images.social.chat_picture}
    //                            style={[{width: Metrics.reallySize(34)}, {height: Metrics.reallySize(34)}]}/>
    //                     <Text style={styles.text}>图片</Text>
    //                 </View>
    //             </TouchableOpacity>
    //             <TouchableOpacity style={{flex: 1}} onPress={() => {
    //                 router.toTakePhoto({
    //                     fileInfo: (file) => {
    //                         let type = file.type;
    //                         if (type === "image") {
    //                             this.onSendImage(file.path);
    //                         }
    //                         else {
    //                             this.onSendVideo(file.path);
    //                         }
    //                     }
    //                 })
    //             }}>
    //                 <View style={styles.subView}>
    //                     <Image source={Images.social.chat_takephoto}
    //                            style={[{width: Metrics.reallySize(39)}, {height: Metrics.reallySize(34)}]}/>
    //                     <Text style={styles.text}>拍照</Text>
    //                 </View>
    //             </TouchableOpacity>
    //             <TouchableOpacity style={{flex: 1}}>
    //                 <View style={styles.subView}>
    //                     <Image source={Images.social.chat_picture}
    //                            style={[{width: Metrics.reallySize(34)}, {height: Metrics.reallySize(34)}]}/>
    //                     <Text style={styles.text}>语音</Text>
    //                 </View>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // };


    render() {
        let userInfo = this.otherInfo;
        let voiceView = {};
        if (this.state.inputVoice)
            voiceView = {renderComposer: this.createTextInput};
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
                        this.setState({windowType: 1});
                        this.popAction && this.popAction.toggle()
                    }}
                />

                {this.state.myUserName !== "" ?
                    <GiftedChat
                        {...voiceView}
                        messages={this.state.messages}              //消息
                        showUserAvatar={true}                       //显示自己的头像
                        loadEarlier={true}
                        renderLoadEarlier={this.renderEarlyMessage}           //加载历史消息
                        renderSystemMessage={this.createSystemMsg}  //自定义系统消息
                        user={{
                            _id: this.state.myUserName,
                        }}
                        label={I18n.t("send")}
                        onSend={(event) => this.onSendMessage(event)}
                        placeholder={I18n.t("new_message")}
                        renderAccessory={this.renderAccessoryAction}
                        renderActions={this.createToolButton}       //自定义左侧按钮
                    /> : null}

                {this.state.recording ? <View style={styles.voiceAlert}><Text
                    style={styles.voiceText}>{this.leadingZeros(this.state.currentTime)}</Text></View> : null}


                {this.state.videoPath !== "" ? <VideoToast videoUrl={localFilePath(this.state.videoPath)}
                                                           hiddenVideoAction={() => {
                                                               this.setState({videoPath: ""})
                                                           }}/> : null}

                <PopAction
                    ref={ref => this.popAction = ref}
                    btnArray={this.popActions()}/>


            </View>
        );
    }


    ///计时格式
    leadingZeros = (num) => {
        let min = 0;//分钟数
        let sec = 0;//秒数
        //大于60s
        if (num >= 60) {
            min = parseInt(num / 60);
            sec = num % 60;
        }
        else {
            sec = num;
        }
        min = String(min);
        while (min.length < 2) {
            min = '0' + min;
        }
        sec = String(sec);
        while (sec.length < 2) {
            sec = '0' + sec;
        }
        return `${min}:${sec}`;
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
        marginRight: 17,
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
    voiceView: {
        flex: 1,
        height: 39,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 17,
        borderColor: "#E5E5E5",
        borderWidth: 0.5,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
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
    },
    voiceAlert: {
        position: 'absolute',
        marginTop: Metrics.screenHeight - 150,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 4,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: (Metrics.screenWidth - 80) / 2,
    },
    voiceText: {
        padding: 10,
        color: "white",
        fontSize: 15,
    }
});





