import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from './ScrollableTabBar';
import MallList from './MallList';

export default class MallSearchResult extends Component {


    topBar = () => {
        const {category} = this.props.params;

        return (<View style={styleM.topBar}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={styleM.popBtn}
                onPress={() => router.pop()}>
                <Image style={styleM.backImg}
                       source={Images.mall_return}/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <Text style={styleM.cart}>{category.name}</Text>
            <View style={{flex: 1}}/>
            <View style={styleM.popBtn}/>


        </View>)
    };


    render() {
        const {category} = this.props.params;

        return (
            <View style={ApplicationStyles.bgContainer}>
                {this.topBar()}

                <MallList
                    category={category}/>


            </View>
        )
    }
}

const styleM = StyleSheet.create({
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: '#FFFFFF',
        width: '100%',
        marginBottom: 1
    },
    popBtn: {
        height: 44,
        width: 50,
        justifyContent: 'center'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    rightTxt: {
        fontSize: 15,
        color: '#161718'
    },
    bgContainer: {
        flex: 1,
        backgroundColor: Colors.bg_f5
    },
})