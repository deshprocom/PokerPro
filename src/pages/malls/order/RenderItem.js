import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {deleteProductFromCart, util, showToast} from '../../../utils/ComonHelper';

export default class RenderItem extends PureComponent {

    selectType=(arr_type)=>{
        let type_value = '';
        if(!util.isEmpty(arr_type)){
            arr_type.forEach(x => {
                type_value += x.name + ':';
                type_value += x.value + '  ';
            });
        }
    };

    render(){
        const{commodity} = this.props.item;
        return(
            <View style={styleR.renderItem}>

                <Image style={styleR.mallImg} source={Images.empty_image}/>
                <View style={styleR.TxtView}>
                    <Text numberOfLines={2} style={styleR.mallTextName}>{commodity.title}</Text>
                    <Text style={styleR.mallAttributes}>{I18n.t('weight')}：{commodity.weight}KG  {I18n.t('colour')}：{this.selectType(commodity.arr_type)} {I18n.t('quantity')}：{commodity.stock}</Text>
                    <View style={styleR.returned}>
                        <Text style={styleR.returnedTxt}>{I18n.t('returned')}</Text>
                    </View>
                    <View style={styleR.PriceView}>
                        <Text style={styleR.Price}>¥</Text><Text style={[styleR.Price,{marginLeft:1}]}>{commodity.price}</Text>
                        <Text style={styleR.originPrice}>¥</Text><Text style={[styleR.originPrice,{marginLeft:1}]}>{commodity.original_price}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styleR.quantitys}>x{this.props.item.number}</Text>
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
        marginLeft: 14,
        marginTop:15,
    },
    mallTextName: {
        fontSize: 14,
        color: '#333333',
        marginRight: 12
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
        marginTop:3
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