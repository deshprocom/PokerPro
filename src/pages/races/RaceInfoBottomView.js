/**
 * Created by lorne on 2017/2/17.
 */
import React from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class RaceInfoBottomView extends React.Component{


    render(){
        return (<TouchableOpacity
            activeOpacity={1}
            testID="btn_buy"
            onPress={this.props.onPress}
            style={{height:50,borderRadius:3,
                        backgroundColor:Colors.bg_09,flexDirection:'row',
                        alignItems:'center',justifyContent: 'center',
                        position:'absolute',bottom: 5,left: 15,right: 15}}>
            <Text style={{color:Colors.txt_E0C,
                                fontSize:18}}>{I18n.t('buy_ticket')}</Text>

        </TouchableOpacity> )
    }
}