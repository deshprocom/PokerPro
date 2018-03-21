import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class OrderDetails extends PureComponent {

    render() {
        const {shipping_price, total_price, total_product_price, deduction_result, deduction_price} = this.props.orderDetail;
        return (
            <View style={styleO.detailsView}>
                <View style={styleO.detailsName}>
                    <Text style={styleO.detailsNameTxt}>{I18n.t('order_msg')}</Text>
                </View>
                <View style={styleO.details}>
                    <View style={styleO.priceView}>
                        <Text style={styleO.priceName}>{I18n.t('order_price')}</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styleO.price}>¥</Text><Text
                        style={[styleO.price, {marginLeft: 1, marginRight: 17}]}>{total_product_price}</Text>
                    </View>
                    <View style={styleO.costsView}>
                        <Text style={styleO.costsName}>{I18n.t('cost')}</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styleO.price}>¥</Text><Text
                        style={[styleO.price, {marginLeft: 1, marginRight: 17}]}>{shipping_price}</Text>
                    </View>
                    {deduction_result === 'success' ? <View style={styleO.costsView}>
                        <Text style={styleO.costsName}>{I18n.t('poker_discount')}</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styleO.price}>-¥</Text><Text
                        style={[styleO.price, {marginLeft: 1, marginRight: 17}]}>{deduction_price}</Text>
                    </View> : null}

                    <View style={{height: 10}}/>

                </View>
                <View style={styleO.paymentView}>
                    <View style={styleO.paymentPrice}>
                        <Text style={styleO.paymentPriceTxt}>¥</Text><Text
                        style={[styleO.paymentPriceTxt, {marginLeft: 1}]}>{this.props.sumMoney}</Text>
                    </View>
                    <Text style={styleO.payment}>{I18n.t('payment')}</Text>

                </View>
            </View>
        )
    }
}
const styleO = StyleSheet.create({
    detailsView: {
        marginTop: 10,
        marginBottom: 50
    },
    detailsName: {
        height: 40,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
    },
    detailsNameTxt: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17,
        fontWeight: 'bold'
    },
    details: {
        marginTop: 1,
        backgroundColor: '#FFFFFF',
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    costsView: {
        marginLeft: 17,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,

    },
    priceName: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17
    },
    costsName: {
        fontSize: 14,
        color: '#333333',

    },
    price: {
        fontSize: 16,
        color: '#F34A4A',

    },
    paymentView: {
        marginTop: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        height: 44,
        backgroundColor: '#FFFFFF'
    },
    payment: {
        fontSize: 14,
        color: '#333333',

    },
    paymentPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 17
    },
    paymentPriceTxt: {
        fontSize: 18,
        color: '#F34A4A',
    }
})