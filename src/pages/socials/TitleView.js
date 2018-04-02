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
                           onEndEditing={(event) => this.updateText(event.nativeEvent.text)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        height:reallySize(38),
        justifyContent: "center",
        alignItems:"center",
    },
    textInput:{
        height:reallySize(27),
        width:reallySize(171),
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