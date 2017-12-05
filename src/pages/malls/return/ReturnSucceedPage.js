import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import ReturnStatus from './ReturnStatus';
import RefundAmount from './RefundAmount';
import RefundInfo from './RefundInfo';
import ReturnBottom from './ReturnBottom';
import RenderItem from '../order/RenderItem';

export default class ReturnSucceed extends PureComponent {

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
            <Text style={styleC.cart}>{I18n.t('apply_returned')}</Text>
            <View style={{flex: 1}}/>
            <View style={styleC.popBtn}/>
        </View>)
    };


    render(){
        return(
            <View>
                <ScrollView style={styleC.orderView}>
                    {this.topBar()}
                    <ReturnStatus/>
 
                    <RefundAmount/>
                    {/*<RenderItem/>*/}

                    <RefundInfo/>

                    <View style={{height:80}}/>
                </ScrollView>


                <ReturnBottom/>
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

})