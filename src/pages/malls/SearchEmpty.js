import React, {Component,PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';

export default class SearchEmpty extends Component {


    render(){
        return(
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
        position: 'absolute',
        top: Metrics.navBarHeight,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors._ECE
    },
    cartView:{
        marginTop:64,
        alignItems:'center'
    },
    cartImg:{
        width:88,
        height:88,
        overflow:'visible'
    },
    cartTxt:{
        fontSize: 15,
        color: '#AAAAAA',
        marginTop:19,
        fontWeight:'bold'
    }
})