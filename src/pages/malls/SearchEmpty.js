import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';

export default class SearchEmpty extends Component {


    render() {
        return (
            <View style={styleE.viewSearch}>
                <View style={styleE.cartView}>
                    <Image style={styleE.cartImg} source={Images.search_empty}/>
                    <Text style={styleE.cartTxt}>{I18n.t('search_empty')}</Text>
                </View>

            </View>
        )
    }
}

const styleE = StyleSheet.create({
    viewSearch: {
        flex: 1,
        backgroundColor: Colors._ECE
    },
    cartView: {
        marginTop: 64,
        alignItems: 'center'
    },
    cartImg: {
        width: 63,
        height: 66,
        overflow: 'visible',
        opacity:0.8
    },
    cartTxt: {
        fontSize: 15,
        color: '#CCCCCC',
        marginTop: 19
    }
})