/**
 * Created by lorne on 2017/1/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View,
    ListView, TouchableOpacity, Image
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';

export default class ListNoDataPage extends Component {
    render() {
        return (
            <View style={{height:200,alignItems:'center',
            justifyContent:'center'}}>

                <View style={{alignItems:'center',
            justifyContent:'center'}}>
                    <Image style={{height:93,width:70}}
                           source={Images.home_no}/>

                    <Text style={{fontSize:19,marginTop:21,
                    color:'#2d2e30'}}>{I18n.t('have_no_races')} </Text>

                </View>

            </View>
        )
    }

}