import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import PayCountDown from '../../../components/PayCountDown';

export default class CompletedBottom extends Component {


    render() {

        return (
            <View style={styleO.bottomView}>
                {this.renderPay(this.props.orderItem)}


            </View>
        )
    }

    _formatTime = (diff) => {

        let min = 0;

        if (diff >= 60) {
            min = Math.floor(diff / 60);
            diff -= min * 60;

        }

        return `${I18n.t('pay')} ${min}:${diff}`
    };

    renderPay = (item) => {
        const {order_number} = item;
        return (
            <View style={styleO.bottomView}>
                <PayCountDown
                    frameStyle={styleO.payCount}
                    beginText='倒计时'
                    endText='付款失效'
                    count={60 * 15}
                    pressAction={() => {

                        this.countDownButton.startCountDown()
                    }}
                    changeWithCount={(count) => `${this._formatTime(count)}`}
                    id={`time${order_number}`}
                    ref={(e) => {
                        this.countDownButton = e
                    }}/>


                <View style={{height: 24, width: 1, backgroundColor: Colors._ECE}}/>

                <Text style={[styleO.payment, {padding: 14}]}>{I18n.t('cancel_order')}</Text>
            </View>
        )
    };


    mallOrderCompleted = () => {
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
}


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
    },
    payCount: {
        height: 37, width: 120, borderRadius: 4,
        backgroundColor: '#F34A4A',
        marginRight: 17, marginLeft: 14
    }
})