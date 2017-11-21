import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';

export default class UnpaidBottom extends PureComponent {



    render(){
        return(
            <View style={styleO.bottomView}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.showExpiredInfo()
                    }}
                    style={styleO.customer}>
                    <Text style={styleO.orderSubmitTxt}>{I18n.t('pay')}:16</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        global.router.toReturnPage()
                    }}
                    style={styleO.returnedBottom}>
                    <Text style={styleO.orderSubmitTxt}>{I18n.t('cancel_order')}</Text>
                </TouchableOpacity>

            </View>
        )}
}
const styleO = StyleSheet.create({
    bottomView:{
        flexDirection:'row-reverse',
        alignItems: 'center',
        // height:50,
        // backgroundColor:"#FFFFFF",
        // position:'absolute',
        // bottom:0,
        //
        // width: '100%',
        // marginTop:80
    },
    returnedBottom:{
        borderWidth:1,
        borderColor:'#FFFFFF',
        borderRadius: 4,
        width: 120,
        height: 37,
        marginRight: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customer:{
        borderWidth:1,
        borderColor:'#F34A4A',
        borderRadius: 4,
        width: 120,
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