import React,{Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export class ShoppingCart extends Component {

    topBar = () => {
        return (<View style={styleS.topBar}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={styleS.popBtn}
                onPress={() => router.pop()}>
                <Image style={styleS.backImg}
                       source={Images.sign_return}/>
            </TouchableOpacity>
            <Text style={styleS.cart}>购物车</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                testID="btn_bar_right"
                style={styleS.popBtn}
                onPress={() => {
                }}>
                <Text style={styleS.rightTxt}>编辑</Text>
            </TouchableOpacity>


        </View>)
    };

    render(){
        return(
            <View>

            </View>
        )
    }
}

const styleS = StyleSheet.create({
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        width: '100%'
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
    rightTxt:{
        fontSize: 15,
        color: '#161718'
    },
    cart:{
        fontSize: 17,
        color: '#161718'
    }
})