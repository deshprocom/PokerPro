import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated, Image} from 'react-native';
import I18n from 'react-native-i18n';
import {Images} from '../../Themes';


export default class BackTop extends PureComponent {


    render() {

        return (
            <TouchableOpacity
                style={styleB.buttonAnimated}
                onPress={() => {
                    console.log('alskdjflj')
                    this.props.onPressBackTop()
                }}>
                <View style={styleB.buttonView}>
                    <Image style={styleB.topImg} source={Images.top}/>
                    <Text style={styleB.topText}>{I18n.t('backTop')}</Text>
                </View>
            </TouchableOpacity>


        )
    }
}
const styleB = StyleSheet.create({
    buttonAnimated: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonView: {
        width: 94,
        height: 50,
        backgroundColor: '#FFE9AD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topImg: {
        width: 19,
        height: 12
    },
    topText: {
        backgroundColor: 'transparent',
        color: '#151516',
        fontSize: 12,
        marginTop: 5
    }
})

