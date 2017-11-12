import React, {PureComponent, PropTypes} from 'react';
import * as Animatable from 'react-native-animatable';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import RenderItem from './RenderItem';

export default class ExpiredOrder extends PureComponent {

    orderBottom=(item)=>{
        return(
            <View style={styleE.bottomView}>
                <Text style={styleE.payment}>{I18n.t('payment')}</Text>
                <Text style={styleE.paymentPrice}>80890890</Text>
                <View style={{flex:1}}/>
                <TouchableOpacity
                    onPress={() => {
                        item.showExpiredInfo(this)
                    }}
                    style={styleE.orderSubmit}>
                    <Text style={styleE.orderSubmitTxt}>{I18n.t('continue_payment')}</Text>
                </TouchableOpacity>
            </View>
        )
    };
    orderDetails=()=>{
        return(
            <View style={styleE.detailsView}>
                <View style={styleE.detailsName}>
                    <Text style={styleE.detailsNameTxt}>{I18n.t('order_msg')}</Text>
                </View>
                <View style={styleE.details}>
                    <View style={styleE.priceView}>
                        <Text style={styleE.priceName}>{I18n.t('order_price')}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styleE.price}>7878</Text>
                    </View>
                    <View style={styleE.effective}>
                        <Text style={styleE.effectiveName}>{I18n.t('effective_product')}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styleE.effectivePrice}>-21</Text>
                    </View>
                    <View style={styleE.costsView}>
                        <Text style={styleE.costsName}>{I18n.t('cost')}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styleE.price}>12</Text>
                    </View>
                </View>
                <View style={styleE.paymentView}>
                    <Text style={styleE.paymentPrice1}>787646466</Text>
                    <Text style={styleE.payment1}>{I18n.t('payment')}</Text>

                </View>
            </View>
        )
    }

    render(){
        console.log(this)
        return(
            <Animatable.View style={styleE.pages}>
                <Animatable.View
                    duration={300}
                    animation={'fadeInUp'}
                    style={styleE.page}>
                    <View style={styleE.pageView}>
                        <View style={styleE.expiredTop}>
                            <View style={{flex:1}}/>
                            <Text style={styleE.expiredTopTxt}>{I18n.t('expiredOrder')}</Text>
                            <View style={{flex:1}}/>
                            <TouchableOpacity
                                style={styleE.closeView}
                                onPress={() => {
                            this.props.showExpiredInfo()
                        }}>
                                <Image style={styleE.closeImg} source={Images.close}/>
                            </TouchableOpacity>
                        </View>

                        <RenderItem/>

                        {this.orderDetails()}
                        {this.orderBottom(this.props)}

                    </View>
                </Animatable.View>
            </Animatable.View>

        )
    }
}
const styleE = StyleSheet.create({
    pages: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
    },
    page: {
        backgroundColor:'#ECECEE',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
    pageView:{
    },
    expiredTop:{
        height:50,
      flexDirection:'row',
        alignItems:'center',
        backgroundColor:"#FFFFFF",
    },
    expiredTopTxt:{
        fontSize: 14,
        color: '#333333'
    },
    closeView: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeImg: {
        width: 18,
        height: 18,
        marginRight:17,
        marginTop:10
    },
    renderItem: {
        flexDirection: 'row', backgroundColor: '#FFFFFF',paddingBottom: 11,
        marginTop:1
    },
    mallImg: {
        width: 100,
        height: 96,
        marginLeft: 17,
        marginTop:12,
    },
    TxtView: {
        flex: 1,
        marginLeft: 12,
        marginTop:15,
    },
    mallTextName: {
        fontSize: 14,
        color: '#333333',
        marginRight: 17
    },
    mallAttributes: {
        fontSize: 10,
        color: '#AAAAAA',
        marginRight: 27,
        marginTop: 5
    },
    returned:{
        backgroundColor: '#F34A4A',
        borderRadius: 2,
        width:48,
        height:18,
        alignItems:'center',
        justifyContent:'center',
        marginTop:2
    },
    returnedTxt:{
        fontSize: 10,
        color:'#FFFFFF'
    },
    PriceView: {
        flexDirection: 'row',
        marginTop:5,
        alignItems:'center',

    },
    Price: {
        fontSize: 14,
        color: '#F34A4A',
    },
    originPrice:{
        fontSize: 12,
        color: '#AAAAAA',
        textDecorationLine:'line-through',
        textDecorationColor:'#979797',
        marginLeft:17
    },
    quantitys:{
        fontSize: 17,
        color: '#161718',
        marginRight:17
    },
    bottomView:{
        height:50,
        backgroundColor:"#FFFFFF",
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        alignItems: 'center',
        width: '100%'
    },
    orderSubmit:{
        backgroundColor: '#F34A4A',
        borderRadius: 4,
        width: 89,
        height: 37,
        marginRight: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsView:{
        marginTop:10,
        marginBottom:50
    },
    detailsName:{
        height:40,
        backgroundColor:'#FFFFFF',
        justifyContent:'center'
    },
    detailsNameTxt:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17,
        fontWeight:'bold'
    },
    details:{
        marginTop:1,
        backgroundColor:'#FFFFFF',
    },
    priceView:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:15,
    },
    effective:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:15,
    },
    effectiveName:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17
    },
    effectivePrice:{
        fontSize: 16,
        color: '#F34A4A',
        marginRight:17
    },
    costsView:{
        marginLeft:17,
        flexDirection:'row',
        alignItems:'center',
        marginTop:6,
        marginBottom:13
    },
    priceName:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17
    },
    costsName:{
        fontSize: 14,
        color: '#333333',

    },
    price:{
        fontSize: 16,
        color: '#F34A4A',
        marginRight:17
    },
    paymentView:{
        marginTop:1,
        flexDirection:'row-reverse',
        alignItems:'center',
        height:44,
        backgroundColor:'#FFFFFF'
    },
    payment1:{
        fontSize: 14,
        color: '#333333',

    },
    paymentPrice1:{
        fontSize: 18,
        color: '#F34A4A',
        marginRight:17
    },
    orderSubmitTxt:{
        fontSize: 14,
        color: '#FFFFFF'
    },
    payment:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17
    },
    paymentPrice:{
        fontSize: 18,
        color: '#F34A4A'
    }
})