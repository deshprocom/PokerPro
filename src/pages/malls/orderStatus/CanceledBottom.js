import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';

export default class CanceledBottom extends PureComponent {



    render(){
        return(
            <View style={styleO.bottomView}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.showExpiredInfo()
                    }}
                    style={styleO.customer}>
                    <Text style={styleO.orderSubmitTxt}>{I18n.t('buy_again')}</Text>
                </TouchableOpacity>
                <View style={style.line}/>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={styleO.returnedBottom}>
                    <Text style={styleO.orderSubmitTxt2}>{I18n.t('order_del')}</Text>
                </TouchableOpacity>

            </View>
        )}
}
const styleO = StyleSheet.create({
    bottomView:{
        height:50,
        backgroundColor:"#FFFFFF",
        position:'absolute',
        bottom:0,
        flexDirection:'row-reverse',
        alignItems: 'center',
        width: '100%',
        zIndex:999
    },
    returnedBottom:{
        backgroundColor:'#FFFFFF',
        width: 90,
        height: 37,
        marginRight: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customer:{
        borderWidth:1,
        borderColor:'#F34A4A',
        borderRadius: 4,
        width: 90,
        height: 37,
        marginRight: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderSubmitTxt:{
        fontSize: 14,
        color: '#F34A4A'
    },
    orderSubmitTxt2:{
        fontSize: 14,
        color: '#333333'
    },
    line:{
        width:2,
        height:24,
        marginRight:10
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