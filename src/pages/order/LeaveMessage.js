import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';

export default class LeaveMessage extends PureComponent {

    render(){
        return(
            <TextInput style={styleL.messageView}
                       placeholder={I18n.t('leaveMessage')}
                       placeholderTextColor="#AAAAAA"
                       >

            </TextInput>
        )}
}
const styleL = StyleSheet.create({
    messageView:{
        height:85,
        backgroundColor:"#FFFFFF",
        marginTop:11
    }
})