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

export default class ItemOrderView extends Component {


    render() {
        return (<View style={{backgroundColor: 'white'}}>
            <View style={styles.top}>
                <Text style={[styles.txtOrder, {marginLeft: 17}]}>{I18n.t('order_num')}:</Text>
                <Text style={styles.txtOrder}>xx4857349587349</Text>
                <View style={{flex: 1}}/>
                <Text style={[styles.txtOrder, {marginRight: 17}]}>待付款</Text>
            </View>
            <View style={styles.lineView}/>

            <View style={styles.midView}>
                <ImageLoad
                    source={{uri: ''}}
                    style={styles.imgLog}/>

                <View style={{height: 86}}>
                    <View style={{flex: 1,width:'86%'}}>
                        <Text
                            numberOfLines={2}
                            style={styles.name}>2017扑克王杯 - 澳门站澳门展拉链可减少到了放假拉开结束了 啊索朗多吉</Text>

                    </View>

                    <View style={styles.viewTime}>
                        <Image source={Images.home_adr}
                               style={styles.imgAdr}/>

                        <Text style={styles.txtTime}>澳门威尼斯人</Text>
                    </View>

                    <View style={[styles.viewTime, {marginTop: 7}]}>
                        <Image source={Images.home_clock}
                               style={styles.imgClock}/>
                        <Text style={styles.txtTime}>2017.5.18-2017.5.26</Text>
                    </View>
                </View>

            </View>
            <View style={styles.lineView}/>

            <View style={styles.top}>
                <View style={styles.viewTime}>
                    <Text style={styles.total}>{I18n.t('order_total')}: </Text>
                    <Text style={styles.price}>16,343</Text>
                </View>

                <View style={{flex: 1}}/>

                <View style={styles.btnCancel}>
                    <Text style={styles.cancel}>{I18n.t('order_cancel')}</Text>
                </View>
                <View style={styles.btnPay}>
                    <Text style={styles.pay}>付款</Text>
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
        color: Colors._666
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
        color: Colors._888
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
        fontSize: 17
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
        marginRight: 20
    },
    pay: {
        color: Colors._DF1,
        fontSize: 12,
        margin: 5
    },
    btnPay: {
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors._DF1,
        marginRight: 17
    }


});