import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    TextInput,
    View,
    Image,
} from 'react-native';
import {reallySize} from "./Header";
import I18n from "react-native-i18n";

export default class ContentView extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder={I18n.t('social_content')}
                           style={styles.textInput}
                           multiline={true}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        height:reallySize(74),
        justifyContent: "center",
        alignItems:"center",
    },
    textInput:{
        height:reallySize(66),
        width:reallySize(171),
        backgroundColor:"white",
        padding:10,
    }
});