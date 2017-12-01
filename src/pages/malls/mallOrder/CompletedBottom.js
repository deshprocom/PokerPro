import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import PayCountDown from '../../../components/PayCountDown';
import {cancelMallOrder, postWxPay, getWxPaidResult, postOrderConfirm} from "../../../services/MallDao";
import {MallStatus} from "../../../configs/Status";
import {util, payWx, isWXAppInstalled, call, alertOrder} from '../../../utils/ComonHelper';
import {DeShangPhone} from '../../../configs/Constants';


export default class CompletedBottom extends Component {


    state = {
        isInstall: false
    };

    componentDidMount() {
        isWXAppInstalled(isInstall => {
            this.setState({
                isInstall: isInstall
            })
        });
    }

    render() {
        const {orderItem} = this.props;
        return this.switchOrder(orderItem);
    }

    switchOrder = (orderItem) => {
        const {status} = orderItem;
        switch (status) {
            case MallStatus.canceled:
                return <View/>;
            case MallStatus.unpaid:
                return this.renderPay(orderItem);
            case MallStatus.paid:
                return this.paidOrder(orderItem);
            case MallStatus.completed:
                return this.completedOrder(orderItem);
            case MallStatus.delivered:
                return this.deliveredOrder(orderItem);
        }
    };


    wxPay = (order_number) => {
        if (this.state.isInstall) {
            let data = {order_number: order_number};
            postWxPay(data, ret => {
                payWx(ret, () => {
                    getWxPaidResult(data, result => {
                        if (this.props.refresh)
                            this.props.refresh();
                    }, err => {
                        alert('支付成功，系统正在处理')
                    })

                },()=>{

                })
            }, err => {

            });
        }
        else
            alert('商城支付需要安装微信')
    };


    _formatTime = (diff) => {

        let min = 0;
        if(min < 10){
            min = '0'+ min;
        }
        if (diff >= 60) {
            min = Math.floor(diff / 60);
            diff -= min * 60;
        }
        if(diff < 10){
            diff = '0'+ diff;
        }

        return `${min}:${diff}`
    };


    renderPay = (item) => {
        const {order_number} = item;
        return (//${I18n.t('pay')}
            <View style={styleO.bottomView}>
                <View style={styleO.payView}>
                    <View style={{alignItems:'flex-end'}}>
                        <Text style={{fontSize:14,color:'#FFFFFF',zIndex:999}}>{I18n.t('pay')}</Text>
                    </View>
                    <PayCountDown
                        frameStyle={styleO.payCount}
                        beginText='倒计时'
                        count={60 * 30}
                        pressAction={() => {
                        this.wxPay(order_number);
                    }}
                        changeWithCount={(count) => `${this._formatTime(count)}`}
                        id={order_number}
                        ref={(e) => {
                        this.countDownButton = e
                    }}/>
                </View>



                <View style={{height: 24, width: 1, backgroundColor: Colors._ECE}}/>

                <Text
                    onPress={() => {//`${I18n.t('confirm_cancel')}`
                        alertOrder('confirm_cancel',()=>{
                            cancelMallOrder({order_number: order_number}, ret => {
                            if (this.props.refresh)
                                this.props.refresh();
                        })
                        });
                    }}
                    style={[styleO.payment, {padding: 14}]}>{I18n.t('cancel_order')}</Text>
            </View>
        )
    };

    paidOrder = (orderItem) => {
        let body = {shipping_number:"2323232323",express_code:"YTO",order_number:"2171127170600001"}
        return <View style={styleO.bottomView}>
            <TouchableOpacity
                onPress={() => {
                    call(DeShangPhone)
                }}
                style={styleO.returnedBottom}>
                <Text style={styleO.orderSubmitTxt}>{I18n.t('contact_customer_service')}</Text>
            </TouchableOpacity>
            <TouchableOpacity

                onPress={() => {
                    global.router.toLogisticsWeb(body)
                }}
                style={styleO.returnedBottom}>
                <Text style={styleO.orderSubmitTxt}>{I18n.t('order_logistics')}</Text>
            </TouchableOpacity>

        </View>
    };

    completedOrder = (orderItem) => {
        const {shipments, order_number} = orderItem;
        return (
            <View style={styleO.bottomView}>

                <TouchableOpacity
                    onPress={() => {
                        global.router.toLogisticsWeb(shipments)
                    }}
                    style={styleO.customer}>
                    <Text style={styleO.orderSubmitTxt}>{I18n.t('order_logistics')}</Text>
                </TouchableOpacity>

            </View>)
    };


    deliveredOrder = (orderItem) => {
        const {shipments, order_number} = orderItem;
        return (
            <View style={styleO.bottomView}>
                <TouchableOpacity
                    onPress={() => {
                        alertOrder('confirm_receipt',()=>{
                            postOrderConfirm({order_number: order_number}, data => {
                            if (this.props.refresh)
                                this.props.refresh();
                        })
                        });
                    }}
                    style={styleO.returnedBottom2}>
                    <Text style={styleO.orderSubmitTxt1}>{I18n.t('order_receipt')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        global.router.toLogisticsWeb(shipments)
                    }}
                    style={styleO.customer}>
                    <Text style={styleO.orderSubmitTxt}>{I18n.t('order_logistics')}</Text>
                </TouchableOpacity>
                <TouchableOpacity

                    onPress={() => {
                    global.router.toReturnPage(orderItem)
                }}
                    style={styleO.returnedBottom}>
                    <Text style={styleO.orderSubmitTxt}>{I18n.t('refund_mall_amount')}</Text>
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
    returnedBottom2: {
        borderWidth: 1,
        borderColor: '#F34A4A',
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
    returnedMall: {
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
    orderSubmitTxt1: {
        fontSize: 14,
        color: '#F34A4A'
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
    payView:{
        height: 37,
        width: 120,
        borderRadius: 4,
        backgroundColor: '#F34A4A',
        marginRight: 17, marginLeft: 14,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    payCount: {
        height: 37,
        backgroundColor: '#F34A4A',
        alignItems:'flex-start'
    }
})