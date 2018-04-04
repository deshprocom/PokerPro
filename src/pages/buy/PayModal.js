/**
 * Created by lorne on 2017/8/4.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, Modal,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {isEmptyObject, strNotNull, payWx} from '../../utils/ComonHelper';
import {postWxPay, postPayOrder} from '../../services/OrderDao'

var testUrl = 'http://localhost:4200/pay/success';

export default class PayModal extends Component {

    state = {
        visible: false,
        payUrl: {},
        payWay: 1,
        wxPay: {partnerId: ''},
        pay_url: 'pay-success'
    };

    toggle = () => {

        this.setState({
            visible: !this.state.visible
        })
    };

    getPayUrl = () => {
        return this.state.payUrl;
    };


    setRefresh = (orderRefresh) => {
        this.orderRefresh = orderRefresh;
    };

    setPayUrl = (data) => {
        console.log('payUrl', data);

        this._getPayData(data);
        this.setState({
            payUrl: data
        })
    };

    _getPayData = (payUrl) => {
        const {order_number, price} = payUrl;
        const body = {
            order_number: order_number
        };
        postWxPay(body, data => {
            this.setState({
                wxPay: data,
                payWay: 1,
            })
        }, err => {
            this.setState({
                wxPay: {},
                payWay: 0
            })
        });

        postPayOrder(body, data => {
            this.setState({
                pay_url: data.pay_url
            });
        }, err => {
            this.setState({
                pay_url: ''
            });
        })

    };


    render() {
        return (<Modal
            onRequestClose={() => {

            }}
            animationType={"slide"}
            transparent={true}
            visible={this.state.visible}
            style={styles.page}>
            <View style={styles.pageTop}/>

            <View style={styles.page2}>
                {this.topView()}
                <View style={{height: 1}}/>
                <ScrollView>
                    {this.orderView()}
                    {this.wxView()}
                    {this.cardView()}

                    <View style={{height: 80}}/>
                </ScrollView>

                {this.payView()}
            </View>

        </Modal>)
    }

    topView = () => {
        const {order_number, price} = this.state.payUrl;
        return <View style={styles.top}>
            <Text style={styles.title}>{I18n.t('pay_online')}</Text>

            <TouchableOpacity
                onPress={() => {
                    this.toggle();
                    if (strNotNull(order_number) && this.props.toOrder)
                        router.toOrderInfo(this.props, order_number, price)
                }}
                style={styles.btnClose}>
                <Image
                    source={Images.pay_close}
                    style={styles.imgClose}/>

            </TouchableOpacity>
        </View>;
    };

    orderView = () => {
        const {order_number, price} = this.state.payUrl;
        return <View style={styles.page3}>

            <Image style={styles.img3}
                   source={Images.pay_ticket}/>

            <View>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text style={styles.txt3}>{I18n.t('pay_need')}  </Text>
                    <Text style={styles.txt32}> ¥{this._invitePrice()}</Text>
                </View>
                <Text style={styles.txt31}>{I18n.t('order_num')}: {order_number}</Text>
            </View>

        </View>;
    };


    _invitePrice = () => {
        const {price} = this.state.payUrl;
        const {toOrder, invitePrice} = this.props;
        if (toOrder && strNotNull(invitePrice))
            return invitePrice;
        else
            return price;
    }

    cardView = () => {
        return <TouchableOpacity
            disabled={!strNotNull(this.state.pay_url)}
            onPress={() => {
                this.setState({
                    payWay: 0
                })
            }}
            style={styles.page4}>

            <Image style={styles.img4}
                   source={Images.pay_card}/>

            <View>
                <Text style={styles.txt3}>{I18n.t('pay_card')}  </Text>
                <Text style={styles.txt31}>{I18n.t('pay_tine')}</Text>
            </View>

            {strNotNull(this.state.pay_url) ? <View
                style={styles.btnClose}>
                <Image
                    source={this.state.payWay === 0 ? Images.pay_selected : Images.pay_select}
                    style={styles.img5}/>

            </View> : null}

            {strNotNull(this.state.pay_url) ? null : <View style={styles.support}>
                <Text style={styles.txt_support}>{I18n.t('un_support')}</Text>
            </View>}
        </TouchableOpacity>;
    };

    wxView = () => {
        return <TouchableOpacity
            disabled={isEmptyObject(this.state.wxPay)}
            onPress={() => {
                this.setState({
                    payWay: 1
                })
            }}
            style={styles.page5}>

            <Image style={styles.img4}
                   source={require('../../../source/buy/weixin.png')}/>

            <View>
                <Text style={styles.txt3}>{I18n.t('pay_weixin')}  </Text>
                <Text style={styles.txt31}>{I18n.t('pay_weixin_support')}</Text>
            </View>

            {isEmptyObject(this.state.wxPay) ? null : <View
                style={styles.btnClose}>
                <Image
                    source={this.state.payWay === 1 ? Images.pay_selected : Images.pay_select}
                    style={styles.img5}/>

            </View>}


            {isEmptyObject(this.state.wxPay) ? <View style={styles.support}>
                <Text style={styles.txt_support}>{I18n.t('un_support')}</Text>
            </View> : null}


        </TouchableOpacity>;
    };


    _wxPay = () => {
        const {payUrl, wxPay} = this.state;
        const {order_number, price} = payUrl;

        if (!isEmptyObject(wxPay))
            payWx(wxPay, () => {
                if (this.orderRefresh)
                    this.orderRefresh();
                else
                    router.replaceOrder(order_number, price)
            },()=>{})
    };

    _webPay = () => {
        const {payUrl, pay_url} = this.state;

        if (strNotNull(payUrl)) {
            payUrl['pay_url'] = pay_url;
            router.toWebViewPay(this.props, payUrl, this.orderRefresh)
        }

    };


    payView = () => {
        const {payWay} = this.state;
        return <TouchableOpacity
            onPress={() => {
                this.toggle();
                if (payWay === 0) {
                    this._webPay();
                } else if (payWay === 1) {
                    this._wxPay();
                }


            }
            }
            style={styles.btnPay}>
            <Text style={styles.txtPay}>{I18n.t('pay_confirm')}</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    pageTop: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'},
    page2: {
        flex: 1,
        backgroundColor: Colors.bg_ec
    },
    top: {
        height: 56,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 17,
        color: '#444444'
    },
    btnClose: {
        position: 'absolute',
        right: 0,
        height: 56,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgClose: {
        height: 19,
        width: 19,
    },
    page3: {
        height: 72,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    img3: {
        height: 37,
        width: 37,
        marginLeft: 17,
        marginRight: 22
    },
    txt3: {
        fontSize: 15,
        color: '#444444',
    },
    txt31: {
        fontSize: 12,
        color: Colors._888,
        marginTop: 8
    },
    txt32: {
        fontSize: 18,
        color: Colors._DF1
    },
    page4: {
        height: 74,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginTop: 1
    },
    page5: {
        height: 74,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginTop: 14
    },
    img4: {
        height: 23,
        width: 29,
        marginLeft: 17,
        marginRight: 22
    },
    btnPay: {
        height: 50,
        backgroundColor: Colors._DF1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    txtPay: {
        fontSize: 17,
        color: Colors.white
    },
    img5: {
        height: 25,
        width: 25
    },
    txt_support: {
        fontSize: 11,
        color: Colors.white,
        margin: 3
    },
    support: {
        position: 'absolute',
        top: 18,
        left: 170,
        backgroundColor: Colors._DF1,
        opacity: 0.4,
        borderRadius: 2
    }

});