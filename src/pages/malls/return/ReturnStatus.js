import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class ReturnStatus extends PureComponent {
    state={
        showStatus:true
    };

    render(){
        return(
            <View>
                <View style={styleT.tipsView}>
                    <Text style={styleT.tipsTxt}>{I18n.t('refund_success')}</Text>
                    <Text style={styleT.date}>2017年   18:00</Text>
                </View>
                <View style={styleT.status}>
                    <Text style={styleT.statusTxt}>同意本次交易支持退款</Text>
                </View>
            </View>
        )}
}
const styleT = StyleSheet.create({
    tipsView:{
        height:46,
        backgroundColor:'#F34A4A',
        opacity:0.6,
        flexDirection:'row',
        alignItems:'center'
    },
    tipsTxt:{
        fontSize: 14,
        color: '#FFFFFF',
        marginLeft:17
    },
    tipsTouch:{
        width:30,
        height:30,
        alignItems:'center',
        justifyContent:'center'
    },
    date:{
        fontSize: 14,
        color: '#FFFFFF',
        marginLeft:23
    },
    status:{
        height:48,
        backgroundColor:"#FFFFFF",
        flexDirection:'row',
        alignItems:'center'
    },
    statusTxt:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17
    }
})