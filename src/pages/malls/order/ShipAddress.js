import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class ShipAddress extends PureComponent {
    state={

    };

    render(){
        return(
            <TouchableOpacity style={styleS.addressView}>
                <View style={styleS.title}>
                    <Text style={styleS.titleName}>{I18n.t('shopping_addr')}</Text>
                </View>
                <View style={styleS.shipAddr}>
                    <View style={{marginTop: 12}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styleS.shipAddrTxt1}>{I18n.t('buy_person')}</Text>
                            <Text style={styleS.shipAddrTxt1}>www</Text>
                            <Text style={styleS.mobile}>1478569332485</Text>
                        </View>
                        <Text style={styleS.shipAddrTxt2}>fdsobfsoyrfnskfhsdfnslkfsalfnas;phgdknls;f</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <View style={styleS.shipAddrTouch}>
                        <Image style={styleS.shipAddrImg} source={Images.is}/>
                    </View>
                </View>
                <Image style={styleS.lineImg} source={Images.order_line}/>

            </TouchableOpacity>
        )}
}
const styleS = StyleSheet.create({
    lineImg:{
        width:'100%',
        height:4
    },
    addressView:{

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
        color: '#333333',
        fontWeight:'bold'
    },
    shipAddr: {
        backgroundColor: '#FFFFFF',
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15
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
        width: 8,
        height: 16,
        marginTop:20
    }
})