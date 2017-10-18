import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated, Image} from 'react-native';
import I18n from 'react-native-i18n';
import {Images} from '../../Themes';
import {TabIcon} from './TabIcon';

export default class BottomNavigation extends Component {

    render() {

        return (
            <View style={styleBN.navigation}>
                <View style={styleBN.navigations}>
                    {TabIcon(I18n.t('home'), Images.home, styleBN.textStyle, styleBN.bgHomeStyle,false)}
                </View>
                <View style={styleBN.navigations}>
                    {TabIcon(I18n.t('home_info'), Images.information, styleBN.textStyle, styleBN.bgInformationStyle,false)}
                </View>
                <View style={styleBN.navigations}>
                    {TabIcon(I18n.t('home_sort'), Images.rank, styleBN.textStyle, styleBN.bgRankStyle2,false)}
                </View>
                <View style={styleBN.navigations}>
                    {TabIcon(I18n.t('mine'), Images.mine, styleBN.textStyle, styleBN.bgHomeStyle,false)}
                </View>
            </View>

        )
    }
}
const styleBN = StyleSheet.create({
    navigation:{
        height:50,
        width:'100%',
        backgroundColor:'#ffffff',
        opacity:0.96,
        flexDirection:'row',
        alignItems:'center',
        position: 'absolute',
        bottom: 0
    },
    navigations:{
        flex:1
    },
    tabs: {
        height: 50
    },
    textStyle: {
        color: '#AAAAAA'
    },
    textStyle2: {
        color: '#161718'
    },
    bgHomeStyle: {
        height: 24,
        width: 24
    },
    bgInformationStyle: {
        width: 17,
        height: 23
    },
    bgRankStyle2: {
        height: 25,
        width: 25
    }
})

