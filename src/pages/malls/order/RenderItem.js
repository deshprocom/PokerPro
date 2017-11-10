import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class RenderItem extends PureComponent {

    render(){
        return(
            <View style={styleR.renderItem}>

                <Image style={styleR.mallImg} source={Images.empty_image}/>
                <View style={styleR.TxtView}>
                    <Text numberOfLines={2} style={styleR.mallTextName}>筹码14克皇冠粘土百家乐德州扑克筹码币</Text>
                    <Text style={styleR.mallAttributes}>{I18n.t('weight')}：1.62KG {I18n.t('weight')}：黑 {I18n.t('quantity')}：500</Text>
                    <View style={styleR.returned}>
                        <Text style={styleR.returnedTxt}>{I18n.t('returned')}</Text>
                    </View>
                    <View style={styleR.PriceView}>
                        <Text style={styleR.Price}>¥555555.55</Text>
                        <Text style={styleR.originPrice}>¥999999</Text>
                        <View style={{flex:1}}/>
                        <Text style={styleR.quantitys}>X2</Text>
                    </View>
                </View>
            </View>
        )}
}
const styleR = StyleSheet.create({
    renderItem: {
        flexDirection: 'row', backgroundColor: '#FFFFFF',paddingBottom: 11
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
})