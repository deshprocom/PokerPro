import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import PayCountDown from '../../../components/PayCountDown';

export default class CompletedBottom extends Component {


    render() {
        return (
            <View style={styleO.bottomView}>
                {renderPay()}


            </View>
        )
    }
}

const renderPay = () => {
    return (
        <View style={styleO.bottomView}>
            <View style={{flex: 1}}/>

            <Text style={styleO.payment}>{I18n.t('cancel_order')}</Text>
            <View style={{height: 24, width: 1}}/>
            <PayCountDown
                frameStyle={{height: 60, width: 135, borderRadius: 0}}
                beginText='获取验证码'
                endText='付款失效'
                count={60 * 15}
                pressAction={() => {
                    console.log('PayCountDown')
                    this.countDownButton.startCountDown()
                }}
                changeWithCount={(count) => count}
                id='pay_time'
                ref={(e) => {
                    this.countDownButton = e
                }}/>

        </View>
    )
};

const mallOrderCompleted = () => {
    return (
        <View style={styleO.bottomView}>
            <TouchableOpacity
                onPress={() => {
                }}
                style={styleO.returnedBottom}>
                <Text style={styleO.orderSubmitTxt}>{I18n.t('logistics_view')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {

                }}
                style={styleO.customer}>
                <Text style={styleO.orderSubmitTxt}>{I18n.t('order_del')}</Text>
            </TouchableOpacity>


        </View>
    )
};
const styleO = StyleSheet.create({
    bottomView: {
        height: 50,
        backgroundColor: "#FFFFFF",
        marginTop: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width: '100%',
    },
    returnedBottom: {
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 4,
        width: 90,
        height: 37,
        marginRight: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customer: {
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 4,
        width: 90,
        height: 37,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderSubmitTxt: {
        fontSize: 14,
        color: '#333333'
    },
    payment: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17
    },
    paymentPrice: {
        fontSize: 18,
        color: '#F34A4A'
    }
})