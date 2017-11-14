import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class Positioning extends PureComponent {
    state={

    };

    render(){
        return(
            <View style={{backgroundColor:'#FFFFFF'}}>
                <View style={styleC.addressView}>
                    <View style={styleC.shipImagView}>
                        <Image style={styleC.shipAddrImg} source={Images.positioning}/>
                    </View>

                    <View style={styleC.shipAddr}>
                        <View style={{flexDirection: 'row',alignItems:'center'}}>
                            <Text style={styleC.shipAddrTxt1}>{I18n.t('buy_person')}</Text>
                            <Text style={styleC.shipAddrTxt1}>www</Text>
                            <Text style={styleC.mobile}>1478569332485</Text>
                        </View>
                        <Text style={styleC.shipAddrTxt2}>热热我认为让双方是否感受过对方</Text>
                    </View>

                </View>
                <Image style={styleC.lineImg} source={Images.order_line}/>
            </View>

        )}
}
const styleC = StyleSheet.create({
    lineImg:{
        width:'100%',
        height:4,
        marginTop:16,

    },
    addressView:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#FFFFFF',

    },
    shipImagView:{
        width: 28,
        height: 28,
        marginLeft:17,
        alignItems:'center'
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
    }
})