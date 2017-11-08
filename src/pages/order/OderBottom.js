import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';

export default class OderBottom extends PureComponent {

    render(){
        return(
            <View style={styleO.bottomView}>
                <Text style={styleO.payment}>{I18n.t('payment')}</Text>
                <Text style={styleO.paymentPrice}>80890890</Text>
                <View style={{flex:1}}/>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={styleO.orderSubmit}>
                    <Text style={styleO.orderSubmitTxt}>{I18.t('orderSubmit')}</Text>
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
        flexDirection:'row'
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