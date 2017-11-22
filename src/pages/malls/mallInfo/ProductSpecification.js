import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Modal} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {util} from '../../../utils/ComonHelper';

export default class ProductSpecification extends Component {
    static propTypes = {
        showSpecInfo: propTypes.func.isRequired
    };


    render() {

        const {text_sku_values} = this.props.selectProduct;
        let sku_values = '';
        if (!util.isEmpty(text_sku_values))
            text_sku_values.forEach(item => {
                sku_values += item + ' '
            });
        return (
            <View>
                <TouchableOpacity
                    style={styleP.specification}
                    onPress={() => {
                        this.props.showSpecInfo()

                    }}>
                    <Text style={styleP.specificationTxt1}>{I18n.t('specification')}</Text>

                    <Text
                        style={styleP.specificationTxt2}>  {util.isEmpty(this.props.selectProduct) ? I18n.t('unSelected') : I18n.t('selected')}</Text>

                    <Text style={styleP.specificationTxt4}>{sku_values}</Text>
                    <View style={{flex: 1}}/>
                    <Image style={styleP.specificationImg} source={Images.is}/>
                </TouchableOpacity>

            </View>

        );
    }
}

const styleP = StyleSheet.create({
    specification: {
        height: 48,
        backgroundColor: "#FFFFFF",
        marginTop: 7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    specificationTxt1: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17,
        fontWeight: 'bold'
    },
    specificationTxt2: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 24
    },
    specificationTxt3: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 41
    },
    specificationTxt4: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 24
    },
    specificationImg: {
        width: 8,
        height: 16,
        marginRight: 16
    }
})