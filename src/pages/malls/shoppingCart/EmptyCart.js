import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class EmptyCart extends Component {

    topBar = () => {
        return (<View style={styleE.topBar}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={styleE.popBtn}
                onPress={() => router.pop()}>
                <Image style={styleE.backImg}
                       source={Images.mall_return}/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <Text style={styleE.cart}>{I18n.t('cart')}</Text>
            <View style={{flex: 1}}/>
            <View style={styleE.popBtn}/>
        </View>)
    };

    render(){
        return(
            <View style={{flex:1}}>
                {this.topBar()}
                <View style={styleE.cartView}>
                    <Image style={styleE.cartImg} source={Images.emptyCart}/>
                    <TouchableOpacity
                        style={styleE.cartViewTxt}
                    onPress={()=>{
                        global.router.pop();
                    }}>
                        <Text style={styleE.cartTxt}>{I18n.t('rush_immediately')}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styleE = StyleSheet.create({
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: '#FFFFFF',
        width: '100%',
        zIndex: 999
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
    cart: {
        fontSize: 17,
        color: '#161718',
        alignItems: 'center'
    },
    cartView:{
        marginTop:64,
      alignItems:'center'
    },
    cartImg:{
        width:69,
        height:64
    },
    cartViewTxt:{
        marginTop:44,
        width:140,
        height:37,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'#F34A4A',
        borderRadius:4
    },
    cartTxt:{
        fontSize: 18,
        color: '#F34A4A',

    }
})