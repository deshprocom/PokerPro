import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class Positioning extends PureComponent {
    state={

    };

    render(){
        return(
            <View style={styleC.addressView}>
                <Image style={styleC.shipAddrImg} source={Images.positioning}/>
                <View style={styleC.shipAddr}>
                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                        <Text style={styleC.shipAddrTxt1}>{I18n.t('buy_person')}:</Text>
                        <Text style={styleC.shipAddrTxt1}>www</Text>
                        <Text style={styleC.mobile}>1478569332485</Text>
                    </View>
                    <Text style={styleC.shipAddrTxt2}>热热我认为让双方是否感受过对方</Text>
                </View>

            </View>
        )}
}
const styleC = StyleSheet.create({
    addressView:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#FFFFFF'
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
        marginLeft:28,
        marginTop:20
    },
    shipAddrTxt1: {
        fontSize: 14,
        color: '#666666',
        marginLeft: 19
    },
    shipAddrTxt2: {
        fontSize: 14,
        color: '#666666',
        marginLeft: 17,
        marginTop: 5
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
        height: 28,
        marginTop:38,
        marginLeft:17
    }
})