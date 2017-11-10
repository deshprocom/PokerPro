import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import Tips from './Tips';
import ShipAddress from './ShipAddress';
import MallInfo from './MallInfo';
import LeaveMessage from './LeaveMessage';
import OrderDetails from './OrderDetails';
import OrderBottom from './OrderBottom';
import {NavigationBar} from '../../../components';

export default class OrderConfirmPage extends PureComponent {


    render() {
        return (
            <View>
                <NavigationBar
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('confirm_order')}/>
                <ScrollView style={styleO.orderView}>

                    <Tips/>
                    <ShipAddress/>
                    <MallInfo/>
                    <LeaveMessage/>
                    <OrderDetails/>
                </ScrollView>

                <OrderBottom/>
            </View>

        );
    }
}
const styleO = StyleSheet.create({
    orderView: {
        backgroundColor: '#ECECEE'
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