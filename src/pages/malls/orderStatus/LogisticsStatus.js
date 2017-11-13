import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class LogisticsStatus extends PureComponent {
    state={

    };

    render(){
        return(
            <View style={styleC.addressView}>
                <Image style={styleC.shipImagView} source={Images.logistics}/>

                <View style={styleC.shipAddr}>
                    <Text style={styleC.shipAddrTxt1}>{I18n.t('buy_person')}</Text>
                    <Text style={styleC.shipAddrTxt2}>2017/10/13  21:34</Text>
                </View>
                <Image style={styleC.img} source={Images.is}/>

            </View>
        )}
}
const styleC = StyleSheet.create({
    addressView:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        paddingBottom:16,
    },
    shipImagView:{
        width: 28,
        height: 28,
        marginLeft:17,
    },
    title:{
        height:40,
        backgroundColor:'#FFFFFF'
    },
    titleName:{
        marginLeft:17,
        marginTop:11,
        marginBottom:9,
        fontSize: 14,
        color: '#333333'
    },
    shipAddr: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft:21,
        marginTop:20
    },
    shipAddrTxt1: {
        fontSize: 14,
        color: '#666666',
    },
    shipAddrTxt2: {
        fontSize: 14,
        color: '#666666',
        marginTop: 10
    },
    mobile:{
        marginLeft:20,
        fontSize: 14,
        color: '#666666',
    },
    shipAddrTouch:{
        marginRight: 16,
        width: 30,
        height: 50,
        alignItems:'center',
        justifyContent:'center'
    },
    shipAddrImg: {
        width: 28,
        height: 35
    },
    img:{
        width:8,
        height:12
    }
})