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

import JMessage from "jmessage-react-plugin";
import {
    showToast,
} from '../../utils/ComonHelper';

export default class ChatLogin extends Component<{}> {
    // componentDidMount(){
    //     //获取用户信息
    //     JMessage.getMyInfo((myInfo) => {
    //         console.log('myInfo:',myInfo);
    //     });
    // }

    constructor(props){
        super(props);
        this.state = {
            userName:"QQ104926050",
            password:"QQ104926050",
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
                        /* userInfo
                         appKey:"3789f75e5d780c24595607b6"
                         avatarThumbPath:""
                         gender:"unknown"
                         isFriend:false
                         isInBlackList:false
                         isNoDisturb:false
                         type:"user"
                         username:"QQ1049260505"
                         */
                        router.toFriendList(userInfo);
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

    };


    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={"账号"} style={styles.textInput} onChangeText={(text) => this.setState({userName:text})} defaultValue={"QQ104926050"}/>
                <TextInput placeholder={"密码"} style={[styles.textInput,{marginTop:20}]} onChangeText={(text) => this.setState({password:text})}  defaultValue={"QQ104926050"}/>


                <View style={styles.actionView}>
                    <TouchableOpacity onPress={this.registAction}>
                        <Text style={[{height:40},{marginRight:40}]}>注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.loginAction}>
                        <Text style={{height:40}}>登录</Text>
                    </TouchableOpacity>
                </View>
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
    actionView:{
        marginTop:20,
        flexDirection:"row",
    },
    textInput:{
        height:40,
        width:200,
        backgroundColor:"white",
        borderRadius:4,
    }
});
