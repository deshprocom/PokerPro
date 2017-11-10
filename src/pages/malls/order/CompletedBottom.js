import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';

export default class CompletedBottom extends PureComponent {



    render(){
        return(
            <View style={styleO.bottomView}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.showExpiredInfo()
                    }}
                    style={styleO.returnedBottom}>
                    <Text style={styleO.orderSubmitTxt}>{I18n.t('returnedMall')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.showExpiredInfo()
                    }}
                    style={styleO.customer}>
                    <Text style={styleO.orderSubmitTxt}>{I18n.t('contact_customer_service')}</Text>
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
    orderSubmitTxt:{
        fontSize: 14,
        color: '#333333'
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