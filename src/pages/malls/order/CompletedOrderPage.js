import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import OrderStatus from './OrderStatus';
import Positioning from './Positioning';
import OrderMessage from './OrderMessage';
import OrderDetails from './OrderDetails';
import CompletedBottom from './CompletedBottom';

export default class CompletedOrder extends PureComponent {

    state={

    };

    topBar = () => {
        return (<View style={styleC.topBar}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={styleC.popBtn}
                onPress={() => router.pop()}>
                <Image style={styleC.backImg}
                       source={Images.mall_return}/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <Text style={styleC.cart}>{I18n.t('confirm_order')}</Text>
            <View style={{flex: 1}}/>
            <View style={styleC.popBtn}/>
        </View>)
    };


    render(){
        return(
            <View>
                <ScrollView style={styleC.orderView}>
                    {this.topBar()}
                    <OrderStatus/>
                    <Positioning/>
                    <MallInfo/>
                    <OrderMessage/>
                    <OrderDetails/>
                </ScrollView>

                <CompletedBottom/>
            </View>

        );
    }
}
const styleC = StyleSheet.create({
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