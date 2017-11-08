import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import Tips from './Tips';
import ShipAddress from './ShipAddress';
import MallInfo from './MallInfo';
import LeaveMessage from './LeaveMessage';
import OrderDetails from './OrderDetails';
import OderBottom from './OderBottom';

export default class OrderConfirm extends PureComponent {


    topBar = () => {
        return (<View style={styleO.topBar}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={styleO.popBtn}
                onPress={() => router.pop()}>
                <Image style={styleO.backImg}
                       source={Images.mall_return}/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <Text style={styleO.cart}>{I18n.t('confirm_order')}</Text>
            <View style={{flex: 1}}/>
            <View style={styleO.popBtn}/>
        </View>)
    };

    render(){
        return(
            <View style={styleO.orderView}>
                {this.topBar()}
                <Tips/>
                <ShipAddress/>
                <MallInfo/>
                <LeaveMessage/>
                <OrderDetails/>
                <OderBottom/>
            </View>
        );
    }
}
const styleO = StyleSheet.create({
    orderView:{
        backgroundColor:'#ECECEE'
    },
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: '#FFFFFF',
        width: '100%',
        zIndex: 999
    },
    popBtn: {
        height: 44,
        width: 50,
        justifyContent: 'center'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    rightTxt: {
        fontSize: 15,
        color: '#161718'
    },
})