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

    ///注册
    registAction = () => {
        JMessage.register({
            username:"QQ1049260505",
            password:"QQ1049260505",
        },
        //注册成功回调
            () => {

            },
        //注册失败回调
            (error) => {

            }
        );
    };


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.registAction}>
                    <Text style={{marginRight:50}}>注册</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>登录</Text>
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
        flexDirection:"row",
    },
});
