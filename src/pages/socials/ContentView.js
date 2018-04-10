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
        defaultValue:null,
        beginEdit:null,
    };

    updateText = (text) => {
        if (this.props.callbackText === null) return;
        this.props.callbackText(text);
    };
    beginEditing = () => {
        if (this.props.beginEdit === null) return;
        this.props.beginEdit();
    };

    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder={I18n.t('social_content')}
                           style={styles.textInput}
                           multiline={true}
                           defaultValue={this.props.defaultValue}
                           onChangeText={(text) => {this.updateText(text)}}
                           onFocus={() => this.beginEditing()}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        height:reallySize(148),
        justifyContent: "center",
        alignItems:"center",
    },
    textInput:{
        height:reallySize(132),
        width:reallySize(342),
        backgroundColor:"white",
        padding:10,
    }
});