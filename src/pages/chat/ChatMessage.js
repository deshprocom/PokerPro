
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

export default class ChatMessage extends Component{
    render(){
        alert(this.props.params.userInfo.username);
        return (
            <View/>
        );
    }
}