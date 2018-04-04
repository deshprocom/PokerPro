/**
 * Created by lorne on 2018/1/11
 * Function:
 * Desc:
 */

/**
 * Created by lorne on 2017/8/4.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, Modal,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import {isEmptyObject, strNotNull, payWx, isWXAppInstalled, showToast} from '../utils/ComonHelper';

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
        flexDirection: 'row'
    },
    title: {
        fontSize: 17,
        color: '#444444'
    },
    btnClose: {
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
        backgroundColor: Colors.white,
        marginBottom: 14
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
        marginTop: 1
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


export default class ActionPay extends Component {
    state = {
        visible: false,
        order: {},
        payWay: 0,
        wxPay: {partnerId: ''},
        pay_url: 'pay-success',
        isInstall: false
    };

    componentDidMount() {
        isWXAppInstalled(isInstall => {
            this.setState({
                isInstall: isInstall
            })
        });
    }

    open = (pay_order) => {
        console.log('支付参数:', pay_order)
        const {order, wxPay} = pay_order;

        this.setState({
            visible: true,
            order,
            wxPay
        })
    };

    close = () => {
        this.setState({
            visible: false
        })
    }

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
                    {this.props.pay_ways.map((item, index) => {
                        return this.item(item, index)
                    })}

                    <View style={{height: 80}}/>
                </ScrollView>

                {this.payView()}
            </View>

        </Modal>)
    }

    topView = () => {

        return <View style={styles.top}>
            <TouchableOpacity
                onPress={() => {
                    this.setState({
                        visible: false
                    })
                }}
                style={styles.btnClose}>
                <Image
                    source={Images.pay_close}
                    style={styles.imgClose}/>

            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.title}>{I18n.t('pay_online')}</Text>
            </View>


            <TouchableOpacity
                onPress={() => {
                    this.toggle();
                    global.router.toWebPage('pay/help');
                }}
                style={styles.btnClose}>
                <Image
                    source={Images.pay_help}
                    style={{height: 24, width: 24}}/>

            </TouchableOpacity>
        </View>;
    };

    orderView = () => {

        const {order_number, price} = this.state.order;

        return <View style={styles.page3}>

            <Image style={styles.img3}
                   source={Images.pay_ticket}/>

            <View>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text style={styles.txt3}>{I18n.t('pay_need')}</Text>
                    <Text style={styles.txt32}> ¥{price}</Text>
                </View>
                <Text style={styles.txt31}>{I18n.t('order_num')}: {order_number}</Text>
            </View>

        </View>;
    };


    item = (item, index) => {
        return <TouchableOpacity
            key={`pay_${index}`}
            disabled={isEmptyObject(this.state.wxPay)}
            onPress={() => {
                this.setState({
                    payWay: item.index
                })
            }}
            style={styles.page5}>

            <Image style={styles.img4}
                   source={item.icon}/>

            <View>
                <Text style={styles.txt3}>{item.title}</Text>
                <Text style={styles.txt31}>{item.memo}</Text>
            </View>
            <View style={{flex: 1}}/>
            {isEmptyObject(this.state.wxPay) ? null : <View
                style={styles.btnClose}>
                <Image
                    source={this.state.payWay === item.index ? Images.pay_selected : Images.pay_select}
                    style={styles.img5}/>

            </View>}


            {isEmptyObject(this.state.wxPay) ? <View style={styles.support}>
                <Text style={styles.txt_support}>{I18n.t('un_support')}</Text>
            </View> : null}


        </TouchableOpacity>;
    };


    payView = () => {
        const {payWay} = this.state;
        return <TouchableOpacity
            onPress={() => {
                this.close();
                if (payWay === 0) {
                    this._wxPay();
                } else if (payWay === 1) {
                    this._webPay();
                }


            }}
            style={styles.btnPay}>
            <Text style={styles.txtPay}>{I18n.t('pay_confirm')}</Text>
        </TouchableOpacity>
    };

    _webPay = () => {

    };

    _wxPay = () => {
        const {wxPay, isInstall, order} = this.state;
        if (isInstall) {
            payWx(wxPay, () => {
                this.props.callback && this.props.callback(order);

            }, () => {
                this.props.callback && this.props.callback(order);
            })
        } else {
            showToast(I18n.t('need_weChat'))
        }


    }
}

