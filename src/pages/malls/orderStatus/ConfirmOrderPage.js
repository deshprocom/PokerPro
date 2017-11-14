import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import OrderStatus from './OrderStatus';
import MallInfo from '../order/MallInfo';
import Positioning from './Positioning';
import OrderMessage from './OrderMessage';
import OrderDetails from '../order/OrderDetails';
import UnShippedBottom from './UnShippedBottom';
import {NavigationBar} from '../../../components';

export default class ConfirmOrderPage extends PureComponent {

    state={

    };


    render(){
        return(
            <View style={{flex:1}}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('confirm_order')}/>

                <ScrollView style={styleC.orderView}>
                    <OrderStatus/>
                    <Positioning/>
                    <MallInfo/>
                    <OrderMessage/>
                    <OrderDetails/>
                    <View style={{height:80}}/>
                </ScrollView>


                <View style={styleC.bottom}>
                    <UnShippedBottom/>
                </View>
            </View>

        );
    }
}
const styleC = StyleSheet.create({
    bottom:{
        height:50,
        backgroundColor:"#FFFFFF",
        position:'absolute',
        bottom:0,
        flexDirection:'row-reverse',
        alignItems:'center',
        width: '100%',
        zIndex:999
    },
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
    cart:{
        fontSize: 17,
        color: '#161718',
        fontWeight:'bold'
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

});