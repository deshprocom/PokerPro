import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {deleteProductFromCart, util, showToast} from '../../../utils/ComonHelper';
import PropTypes from 'prop-types';
import {ImageLoad} from '../../../components';

export default class RenderItem extends PureComponent {

    static propTypes = {
        item: PropTypes.object
    };

    selectType = (arr_type) => {
        let type_value = '';
        if (!util.isEmpty(arr_type)) {
            arr_type.forEach(x => {
                type_value += x + ' ';
            });
        }
        return type_value;
    };

    render() {
        const {title, seven_days_return, number, variant} = this.props.item;
        const {image, original_price, price, text_sku_values, product_id} = variant;

        return (
            <TouchableOpacity style={styleR.renderItem}
                              onPress={() => {
                                  global.router.toMallInfoPage({id: product_id})
                              }}>

                <ImageLoad
                    resizeMode={'cover'}
                    style={styleR.mallImg}
                    source={{uri: image}}/>
                <View style={styleR.TxtView}>
                    <Text numberOfLines={2} style={styleR.mallTextName}>{title}</Text>
                    <Text
                        style={styleR.mallAttributes}>{this.selectType(text_sku_values)}</Text>

                    {seven_days_return ? <View style={styleR.returned}>
                    <Text style={styleR.returnedTxt}>{I18n.t('returned')}</Text>
                    </View> : null}

                    <View style={styleR.PriceView}>
                        <Text style={styleR.Price}>¥</Text><Text
                        style={[styleR.Price, {marginLeft: 1}]}>{price}</Text>
                        <Text style={styleR.originPrice}>¥</Text><Text
                        style={[styleR.originPrice, {marginLeft: 1}]}>{original_price}</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styleR.quantitys}>x{number}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styleR = StyleSheet.create({
    renderItem: {
        flexDirection: 'row', backgroundColor: '#FFFFFF', paddingBottom: 11
    },
    mallImg: {
        width: 100,
        height: 96,
        marginLeft: 17,
        marginTop: 12,
        resizeMode:'contain',
    },
    TxtView: {
        flex: 1,
        marginLeft: 14,
        marginTop: 15,
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
    returned: {
        backgroundColor: '#F34A4A',
        borderRadius: 2,
        width: 48,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3
    },
    returnedTxt: {
        fontSize: 10,
        color: '#FFFFFF'
    },
    PriceView: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',

    },
    Price: {
        fontSize: 14,
        color: '#F34A4A',
    },
    originPrice: {
        fontSize: 12,
        color: '#AAAAAA',
        textDecorationLine: 'line-through',
        textDecorationColor: '#979797',
        marginLeft: 17
    },
    quantitys: {
        fontSize: 17,
        color: '#161718',
        marginRight: 17
    },
})