import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {reallySize} from "./Header";
import I18n from "react-native-i18n";

export default class TitleView extends Component{

    static props = {
        callbackTitle:null,
        defaultValue:null,
    };

    updateText = (text) => {
        if (this.props.callbackTitle === null) return;
        this.props.callbackTitle(text);
    };

    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder={I18n.t('social_title')}
                           style={styles.textInput}
                           onChangeText={(text) => {this.updateText(text)}}
                           defaultValue={this.props.defaultValue}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        height:reallySize(76),
        justifyContent: "center",
        alignItems:"center",
    },
    textInput:{
        height:reallySize(54),
        width:reallySize(342),
        backgroundColor:"white",
        padding:10,
    }
});

/*
 import React, { Component } from 'react';
 import {
 Platform,
 StyleSheet,
 Text,
 View,
 } from 'react-native';
 import header from "../Library/Header";
 import MainNavBar from "../Library/MainNavBar";

 export default class Test extends Component{
 ///返回上一页
 backAction = () => {
 this.props.navigator.pop();
 };
 render(){
 return(
 <View style={styles.container}>
 <MainNavBar title={"标题"}
 leftItemClick={() =>{this.backAction()}}
 />
 </View>
 )
 }
 }
 const styles = StyleSheet.create({
 container: {
 backgroundColor: "#f0f0f5",
 flex: 1,
 alignItems: "center",
 },
 });
 */