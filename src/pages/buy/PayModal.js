/**
 * Created by lorne on 2017/8/4.
 */
import React, {Component, PropTypes}from 'react';
import {
    TouchableOpacity, View, Modal,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';


var testUrl = 'http://localhost:4200/pay/fail'

export default class PayModal extends Component {


    state = {
        visible: false
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    };


    render() {
        return (<Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.visible}
            style={styles.page}>
            <View style={styles.pageTop}/>

            <View style={styles.page2}>
                {this.topView()}
                <View style={{height: 1}}/>
                {this.orderView()}
                {this.cardView()}
                {this.payView()}

            </View>

        </Modal>)
    }

    topView = () => {
        return <View style={styles.top}>
            <Text style={styles.title}>{I18n.t('pay_online')}</Text>

            <TouchableOpacity
                onPress={this.toggle}
                style={styles.btnClose}>
                <Image
                    source={Images.pay_close}
                    style={styles.imgClose}/>

            </TouchableOpacity>
        </View>;
    };

    orderView = () => {
        return <View style={styles.page3}>

            <Image style={styles.img3}
                   source={Images.pay_ticket}/>

            <View>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text style={styles.txt3}>{I18n.t('pay_need')}  </Text>
                    <Text style={styles.txt32}>2348</Text>
                </View>
                <Text style={styles.txt31}>{I18n.t('order_num')}: 2394u2893479</Text>
            </View>

        </View>;
    };

    cardView = () => {
        return <View style={styles.page4}>

            <Image style={styles.img4}
                   source={Images.pay_card}/>

            <View>
                <Text style={styles.txt3}>{I18n.t('pay_card')}  </Text>
                <Text style={styles.txt31}>{I18n.t('pay_tine')}</Text>
            </View>

            <View
                style={styles.btnClose}>
                <Image
                    source={Images.pay_selected}
                    style={styles.img5}/>

            </View>

        </View>;
    };

    payView = () => {
        return <TouchableOpacity
            onPress={() => {
                this.toggle();
                router.toWebViewPage(this.props, testUrl)
            }}
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
        marginTop: 14
    },
    img4: {
        height: 22,
        width: 33,
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
    }

});