import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {util, showToast} from '../../../utils/ComonHelper';
import PropTypes from 'prop-types';
import {ImageLoad} from '../../../components';

export default class ProductItem extends PureComponent {

    static propTypes = {
        lists: PropTypes.array
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

    renderItem = ({item}) => {
        const {title, original_price, price, number, sku_value, image, refunded} = item;
        return <View
            style={styleR.renderItem}>

            <ImageLoad style={styleR.mallImg} source={{uri: image}}/>
            <View style={styleR.TxtView}>
                <Text numberOfLines={2} style={styleR.mallTextName}>{title}</Text>
                <Text
                    style={styleR.mallAttributes}>{this.selectType(sku_value)}</Text>

                {refunded ? <View style={styleR.returned}>
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
        </View>
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