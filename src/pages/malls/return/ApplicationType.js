import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class ApplicationType extends PureComponent {
    state = {
        showStatus: true
    };


    render() {
        const {product_refund_type} = this.props;

        return (
            <TouchableOpacity style={styleS.page}
                              onPress={() => {
                                  this.props.showTypeInfo()
                              }}>
                <Text style={styleS.txt}>{I18n.t('application_type')}</Text>
                <View style={{flex: 1}}/>
                <View style={styleS.right}>
                    <Text style={styleS.select}>{product_refund_type.name || I18n.t('buy_ple_choice')}</Text>
                    <Image style={styleS.img} source={Images.is}/>
                </View>
            </TouchableOpacity>
        )
    }
}
const styleS = StyleSheet.create({
    page: {
        height: 48,
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt: {
        marginLeft: 17,
        fontSize: 14,
        color: '#333333',
    },
    right: {
        flexDirection: 'row',
        marginRight: 17,
        alignItems: 'center',
        height: 48,
        paddingLeft: 30
    },
    select: {
        fontSize: 14,
        color: '#666666',
    },
    img: {
        width: 8, height: 12, marginLeft: 6
    }
})