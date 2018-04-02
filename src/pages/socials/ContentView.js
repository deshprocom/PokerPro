import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TextInput,
} from 'react-native';
import {reallySize} from "./Header";
import I18n from "react-native-i18n";

export default class ContentView extends Component{
    static props = {
        callbackText:null,
    };

    updateText = (text) => {
        if (this.props.callbackText === null) return;
        this.props.callbackText(text);
    };

    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder={I18n.t('social_content')}
                           style={styles.textInput}
                           multiline={true}
                           onEndEditing={(event) => this.updateText(event.nativeEvent.text)}
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