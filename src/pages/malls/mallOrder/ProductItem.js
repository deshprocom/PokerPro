import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {util, showToast, isEmptyObject} from '../../../utils/ComonHelper';
import PropTypes from 'prop-types';
import {ImageLoad} from '../../../components';
import {RefundStatus} from "../../../configs/Status";

export default class ProductItem extends PureComponent {

    static propTypes = {
        lists: PropTypes.array,
        disabled: PropTypes.bool
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
    refundTxt = (status) => {
        let menu = [RefundStatus.none, RefundStatus.open, RefundStatus.close, RefundStatus.completed];
        if (status === undefined || status === menu[0]) {
            return null;
        } else {
            return <Text style={[styleR[`txt${status}`]]}>{I18n.t(`mall_${status}`)}</Text>
        }
    };

    renderItem = ({item}) => {
        const {title, original_price, price, number, sku_value, image, seven_days_return, product_id, refund_status} = item;

        return <TouchableOpacity
            style={styleR.renderItem}
            disabled={this.props.disabled}
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
                    style={styleR.mallAttributes}>{this.selectType(sku_value)}</Text>

                <View style={styleR.returnedView}>
                    {seven_days_return ? <View style={styleR.returned}>
                        <Text style={styleR.returnedTxt}>{I18n.t('returned')}</Text>
                    </View> : null}
                    <View style={{flex: 1}}/>
                    {this.refundTxt(refund_status)}
                </View>

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
    };

    render() {


        return <FlatList
            data={this.props.lists}
            keyExtractor={(item, index) => `${index}`}
            ItemSeparatorComponent={() => <View style={{height: 1, width: '100%', backgroundColor: Colors._ECE}}/>}
            renderItem={this.renderItem}
        />
    }
}
const styleR = StyleSheet.create({
    renderItem: {
        flexDirection: 'row', backgroundColor: '#FBFAFA', paddingBottom: 11
    },
    mallImg: {
        width: 100,
        height: 96,
        marginLeft: 17,
        marginTop: 12,
        resizeMode: 'contain',
        backgroundColor: 'white'
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
    returnedView: {
        flexDirection: 'row',
        marginTop: 3,
        alignItems: 'center',
    },
    returned: {
        backgroundColor: '#F34A4A',
        borderRadius: 2,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        width:65,
        flexWrap:'nowrap'
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
    txtopen: {
        fontSize: 14,
        color: '#4990E2',
        marginRight: 17
    },
    txtclose: {
        fontSize: 14,
        marginRight: 17,
        color: '#F34A4A',
    },
    txtcompleted: {
        color: '#34BA3C',
        fontSize: 14,
        marginRight: 17
    },

})