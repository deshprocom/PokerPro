import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class OrderStatus extends PureComponent {
    state = {
        showStatus: true
    };

    render() {
        return (
            <View>
                {this.state.showStatus ?
                    <View style={styleT.tipsView}>
                        <Text style={styleT.tipsTxt}>订单{this.props.status}</Text>
                    </View> : <View/>}
            </View>
        )
    }
}
const styleT = StyleSheet.create({
    tipsView: {
        height: 46,
        backgroundColor: '#F34A4A',
        opacity: 0.6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tipsTxt: {
        fontSize: 14,
        color: '#FFFFFF',
        marginLeft: 17
    },
    tipsTouch: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tipsImg: {
        width: 18,
        height: 18,
        marginRight: 17
    }
})