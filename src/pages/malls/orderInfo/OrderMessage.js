import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {utcDate} from '../../../utils/ComonHelper';

export default class OrderMessage extends PureComponent {

    render() {
        const {order_number, status, created_at} = this.props.orderDetail;
        return (
            <View style={styleO.detailsView}>
                <View style={styleO.detailsName}>
                    <Text style={styleO.detailsNameTxt}>{I18n.t('order_detail')}</Text>
                </View>
                <View style={styleO.details}>
                    <View style={styleO.orderNum}>
                        <Text style={styleO.numName}>{I18n.t('order_num')}: {order_number}</Text>
                    </View>
                    <View style={styleO.orderNum}>
                        <Text
                            style={styleO.numName}>{I18n.t('order_time')}: {utcDate(created_at, 'YYYY/MM/DD  HH:mm')}</Text>
                    </View>
                    <View style={styleO.orderStatus}>
                        <Text style={styleO.numName}>{I18n.t('order_status')}: </Text>
                        <Text style={styleO.status}>{I18n.t(`${status}`)}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styleO = StyleSheet.create({
    detailsView: {
        marginTop: 10,

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
    orderNum: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    orderStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20
    },
    costsView: {
        marginLeft: 17,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 13
    },
    numName: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17
    },
    status: {
        fontSize: 14,
        color: '#F34A4A'
    }
})