import React, {Component} from 'react';
import {
    View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal,
    KeyboardAvoidingView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';

export default class InputComment extends Component {
    render(){
        return(
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.reads,{marginTop:1}]}>{I18n.t('read')}</Text>
                <Text style={styles.reads}></Text>
                <Image style={styles.likes} source={Images.listLike}/>
                <Text style={styles.likesTxt}></Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    reads:{
        color:'#AAAAAA',
        fontSize:12
    },
    likes:{
        marginLeft:10,
        width:13,
        height:13
    },
    likesTxt:{
        color:'#AAAAAA',
        fontSize:12
    }
})