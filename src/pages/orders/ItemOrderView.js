/**
 * Created by lorne on 2017/8/7.
 */
import React, {Component, PropTypes}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ListView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {ImageLoad} from '../../components';
import {orderStatus, YYYY_MM_DD, convertDate} from '../../utils/ComonHelper';

export default class ItemOrderView extends Component {


    _time = (begin_date, end_date) => {

        return convertDate(begin_date, YYYY_MM_DD)
            + '-' + convertDate(end_date, YYYY_MM_DD)
    }

    render() {
        const {ticket, orderInfo, raceInfo} = this.props;

        return (<View style={{backgroundColor: 'white'}}>
            <View style={styles.top}>
                <Text style={[styles.txtOrder, {marginLeft: 17}]}>{I18n.t('order_num')}:</Text>
                <Text style={styles.txtOrder}>{orderInfo.order_id}</Text>
                <View style={{flex: 1}}/>
                <Text style={[styles.txtOrder, {marginRight: 17}]}>{orderStatus(orderInfo.status)}</Text>
            </View>
            <View style={styles.lineView}/>

            <View style={styles.midView}>
                <ImageLoad
                    source={{uri: raceInfo.logo}}
                    style={styles.imgLog}/>

                <View style={{height: 86}}>
                    <View style={{flex: 1, width: '86%'}}>
                        <Text
                            numberOfLines={2}
                            style={styles.name}>{raceInfo.name + '-' + ticket.title}</Text>

                    </View>

                    <View style={styles.viewTime}>
                        <Image source={Images.home_adr}
                               style={styles.imgAdr}/>

                        <Text style={styles.txtTime}>{raceInfo.location}</Text>
                    </View>

                    <View style={[styles.viewTime, {marginTop: 7}]}>
                        <Image source={Images.home_clock}
                               style={styles.imgClock}/>
                        <Text style={styles.txtTime}>{this._time(raceInfo.begin_date, raceInfo.end_date)}</Text>
                    </View>
                </View>

            </View>
            <View style={styles.lineView}/>

            <View style={styles.top}>
                <View style={styles.viewTime}>
                    <Text style={styles.total}>{I18n.t('order_total')}: </Text>
                    <Text style={styles.price}>{ticket.price}</Text>
                </View>

                <View style={{flex: 1}}/>

                <View style={styles.btnCancel}>
                    <Text style={styles.cancel}>{I18n.t('order_cancel')}</Text>
                </View>
                <View style={styles.btnPay}>
                    <Text style={styles.pay}>{I18n.t('pay')}</Text>
                </View>

            </View>

        </View>)
    }
}

const styles = StyleSheet.create({
    top: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row'
    },
    txtOrder: {
        fontSize: 14,
        color: Colors._666,
        marginLeft: 7
    },
    lineView: {
        height: 1,
        backgroundColor: Colors.bg_ec
    },
    imgLog: {
        height: 86,
        width: 60,
        marginLeft: 17,
        marginRight: 20
    },
    midView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 125
    },
    name: {
        color: Colors._333,
        fontSize: 15,
    },
    txtTime: {
        fontSize: 13,
        color: Colors._888,
        marginLeft: 7
    },
    viewTime: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgAdr: {
        height: 14,
        width: 10
    },
    imgClock: {
        height: 12,
        width: 12
    },
    total: {
        fontSize: 15,
        color: Colors._333,
        marginLeft: 17
    },
    price: {
        color: Colors._DF1,
        fontSize: 17,
        marginLeft: 7
    },
    cancel: {
        color: Colors._333,
        fontSize: 12,
        margin: 5
    },
    btnCancel: {
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors._666,
        marginRight: 20,
        minWidth: 70,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pay: {
        color: Colors.white,
        fontSize: 12,
        margin: 5,
    },
    btnPay: {
        borderRadius: 2,
        backgroundColor: Colors._DF1,
        marginRight: 17,
        minWidth: 70,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center'

    }


});