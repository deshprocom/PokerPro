import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';

export default class OrderDetails extends PureComponent {

    render(){
        return(
            <View style={styleO.detailsView}>
                <View style={styleO.detailsName}>
                    <Text style={styleO.detailsNameTxt}>{I18n.t('order_msg')}</Text>
                </View>
                <View style={styleO.details}>
                    <View style={styleO.priceView}>
                        <Text style={styleO.priceName}>{I18n.t('order_price')}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styleO.price}>7878</Text>
                    </View>
                    <View style={styleO.costsView}>
                        <Text style={styleO.costsName}>{I18n.t('cost')}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styleO.price}>12</Text>
                    </View>
                </View>
                <View style={styleO.paymentView}>
                    <Text style={styleO.payment}>{I18n.t('payment')}</Text>
                    <Text style={styleO.paymentPrice}>787646466</Text>
                </View>
            </View>
        )}
}
const styleO = StyleSheet.create({
    detailsView:{
        marginTop:10
    },
    detailsName:{
        height:40,
        backgroundColor:'#FFFFFF'
    },
    detailsNameTxt:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17
    },
    details:{
        marginTop:1,
        backgroundColor:'#FFFFFF',
    },
    priceView:{
        marginLeft:17,
        flexDirection:'row',
        alignItems:'center',
        marginTop:15,
    },
    costsView:{
        marginLeft:17,
        flexDirection:'row',
        alignItems:'center',
        marginTop:6
    },
    priceName:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17
    },
    costsName:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17
    },
    price:{
        fontSize: 16,
        color: '#F34A4A',
        marginRight:17
    },
    paymentView:{
        flexDirection:'row-reverse',
        alignItems:'center',
        height:44
    },
    payment:{
        fontSize: 14,
        color: '#333333'
    },
    paymentPrice:{
        fontSize: 18,
        color: '#F34A4A',
        marginRight:17
    }
})