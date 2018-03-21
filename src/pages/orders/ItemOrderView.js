/**
 * Created by lorne on 2017/8/7.
 */

import React, {Component}from 'react';
import {
    TouchableOpacity, View,
    StyleSheet, Image, Text, ListView, Alert
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {ImageLoad} from '../../components';
import {orderStatus, YYYY_MM_DD, convertDate, showToast, isEmptyObject} from '../../utils/ComonHelper';
import {postOrderCancel, postOrderComplete} from '../../services/OrderDao';
import PayModal from '../buy/PayModal';
import Communications from 'react-native-communications';

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
                    <Text style={styles.total}>{I18n.t('order_total')}</Text>
                    <Text style={styles.price}>¥{orderInfo.final_price}</Text>
                </View>

                <View style={{flex: 1}}/>

                {this.btnView(orderInfo)}


            </View>
            <PayModal
                ref={ref => this.payModal = ref}/>
        </View>)
    }

    btnView = (orderInfo) => {
        switch (orderInfo.status) {
            case 'unpaid':
                return this._unPaidBtn(orderInfo);
            case 'paid':
                return this._paidBtn();
            case 'completed':
                return null;
            case 'canceled':
                return null;
            case 'delivered':
                return this._deliveredBtn();
        }
    };

    _paidBtn = () => {
        return <View style={styles.viewBtn}>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(I18n.t('hot_line'), I18n.t('hot_phone') + '\n' + I18n.t('work_time'),
                        [{
                            text: I18n.t('cancel'), onPress: () => {
                            }
                        },
                            {
                                text: I18n.t('call'), onPress: () => {
                                    Communications.phonecall(I18n.t('hot_phone'), false)
                                }
                            }])
                }}
                style={styles.btnCancel}>
                <Text style={styles.cancel}>{I18n.t('contact_customer_service')}</Text>
            </TouchableOpacity>

        </View>
    };

    _logistics = () => {

        const {orderInfo} = this.props;
        if (!isEmptyObject(orderInfo)) {
            const {ticket_type, email, courier, tracking_no} = orderInfo;

            if (ticket_type === 'e_ticket') {
                let mail = I18n.t('order_logistics_email') + '\n' + email;
                Alert.alert(I18n.t('order_logistics'), mail,
                    [
                        {
                            text: I18n.t('I_known'), onPress: () => {

                            }
                        }])
            } else {
                let courierInfo = courier + '\n' + I18n.t('tracking_no') + ': ' + tracking_no;
                Alert.alert(I18n.t('order_logistics'), courierInfo,
                    [
                        {
                            text: I18n.t('I_known'), onPress: () => {

                            }
                        }])
            }

        }

    };


    _orderCom = () => {
        const {orderInfo} = this.props;

        const body = {
            order_number: orderInfo.order_id
        };
        postOrderComplete(body, data => {
            this.props.refresh();
        })
    };

    _deliveredBtn = () => {
        return <View style={styles.viewBtn}>
            <TouchableOpacity
                onPress={this._logistics}
                style={styles.btnCancel}>
                <Text style={styles.cancel}>{I18n.t('order_logistics')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={this._orderCom}
                style={styles.btnLog}>
                <Text style={styles.btnGet}>{I18n.t('order_receipt')}</Text>
            </TouchableOpacity>
        </View>
    };

    _unPaidBtn = (orderInfo) => {
        return <View style={styles.viewBtn}>
            <TouchableOpacity
                onPress={() => {

                    Alert.alert(I18n.t('tint'), I18n.t('is_cancel_order'), [{
                        text: I18n.t('cancel'),
                        onPress: () => {
                        }
                    },
                        {
                            text: I18n.t('confirm'),
                            onPress: () => {
                                const body = {
                                    order_id: orderInfo.order_id
                                };
                                postOrderCancel(body, data => {
                                    this.props.refresh();
                                }, err => {
                                    showToast(err)
                                })
                            }
                        }]);

                }
                }
                style={styles.btnCancel}>
                <Text style={styles.cancel}>{I18n.t('order_cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    router.toOrderInfo(this.props, orderInfo.order_id, orderInfo.final_price, true)
                }}
                style={styles.btnPay}>
                <Text style={styles.pay}>{I18n.t('pay')}</Text>
            </TouchableOpacity>
        </View>
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
        fontSize: 13,
    },
    btnCancel: {
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors._666,
        marginRight: 17,
        minWidth: 70,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pay: {
        color: Colors.white,
        fontSize: 13,
    },
    btnPay: {
        borderRadius: 2,
        backgroundColor: Colors._DF1,
        marginRight: 17,
        minWidth: 70,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center'

    },
    viewBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnLog: {
        borderRadius: 2,
        borderColor: Colors._DF1,
        marginRight: 17,
        minWidth: 70,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1

    },
    btnGet: {
        color: Colors._DF1,
        fontSize: 13,
    }


});