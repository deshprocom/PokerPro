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


    componentDidMount() {
        console.log('selectProduct', this.props.selectProduct)
    }


    render() {

        const {id} = this.props.selectProduct;
        return (
            <View>
                <TouchableOpacity
                    style={styleP.specification}
                    onPress={() => {
                        this.props.showSpecInfo()

                    }}>
                    <Text style={styleP.specificationTxt1}>产品规格</Text>

                    <Text
                        style={styleP.specificationTxt2}>  {util.isEmpty(this.props.selectProduct) ? '未选' : '已选'}</Text>

                    <Text style={styleP.specificationTxt4}>A套餐{id}</Text>
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
        marginLeft: 17
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