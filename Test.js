/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import JMessage from "jmessage-react-plugin";
import {
    JPUSH_APPKEY
} from './src/configs/Constants';
import Orientation from 'react-native-orientation';
import SplashScreen from 'react-native-smart-splash-screen';
import {
    showToast,
} from './src/utils/ComonHelper';

export default class App extends Component<{}> {
    componentDidMount(){
        Orientation.lockToPortrait();
        //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        });
        ///初始化
        JMessage.init({
            appkey:JPUSH_APPKEY,
            isProduction:false,//是否为生产模式
            isOpenMessageRoaming:false,//是否开启消息漫游
        });
        //开启Debug模式
        JMessage.setDebugMode({ enable: false });

        //获取用户信息
        JMessage.getMyInfo((myInfo) => {
            console.log('myInfo:',myInfo);
        });
    }

    constructor(props){
        super(props);
        this.state = {
            userName:"",
            password:"",
        }
    }


    ///注册
    registAction = () => {
        JMessage.register({
            username:this.state.userName,
            password:this.state.password,
        },
        //注册成功回调
            () => {
                showToast("注册成功");
            },
        //注册失败回调
            (error) => {
                console.log("注册失败"+error);
            }
        );
    };

    ///登录
    loginAction = () => {
        JMessage.login({
                username:this.state.userName,
                password:this.state.password,
        },
            //登录成功回调
            () => {
                showToast("登录成功");

                //登录成功获取用户信息
                JMessage.getMyInfo((userInfo) =>{
                    if (userInfo.username === undefined){
                        //用户未登录
                    }
                    else
                    {
                        console.log(userInfo);
                    }
                });

            },
            //登录失败回调
            (error) => {
                console.log("登录失败"+error);
            }
        );
    };

    ///创建聊天消息
    createSendMessage = () => {
        let msgInfo = {
            type:"single",//会话类型。可以为 'single' 或 'group'。
            username:"",//对方用户的用户名。当 type 为 'single' 时，username 为必填。
            appKey:"",//对方用户所属应用的 AppKey。如果不填，默认为当前应用。
            groupId:"", //对象群组 id。当 type 为 'group' 时，groupId 为必填。
            messageType:"text",//text,path,latitude,longitude,scale,address,customObject,extras
        };

        JMessage.createSendMessage({

        });
    };


    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={"账号"} style={[{height:40},{width:200}]} onChangeText={(text) => this.setState({userName:text})}/>
                <TextInput placeholder={"密码"} style={[{height:40},{width:200}]} onChangeText={(text) => this.setState({password:text})}/>

                <TouchableOpacity onPress={this.registAction}>
                    <Text style={{height:40}}>注册</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.loginAction}>
                    <Text style={{height:40}}>登录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
