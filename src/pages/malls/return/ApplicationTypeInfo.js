import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import * as Animatable from 'react-native-animatable';
import I18n from 'react-native-i18n';
import {showToast, strNotNull, pushProductToCart} from '../../../utils/ComonHelper';
import _ from 'lodash';


export default class ApplicationTypeInfo extends PureComponent {
    state = {};

    componentDidMount() {

    }


    render() {

        return (
            <Animatable.View
                duration={300}
                animation={'fadeInUp'}
                style={styleP.pageALl}>
                <Animatable.View
                    duration={300}
                    animation={'fadeInUp'}
                    style={styleP.page}>
                    <View style={styleP.top}>
                        <Text style={styleP.topTxt}>{I18n.t('select_type')}</Text>
                    </View>
                    <View style={styleP.content}>
                        <Text style={styleP.text}>{I18n.t('refund_mall_amount')}</Text>
                        <View style={{flex:1}}/>
                        <Image style={styleP.img} source={Images.return_radio}/>
                    </View>
                    <View style={styleP.content}>
                        <Text style={styleP.text}>{I18n.t('change_mall')}</Text>
                        <View style={{flex:1}}/>
                        <Image style={styleP.img} source={Images.return_radio}/>
                    </View>

                    <View style={styleP.confirmView}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.showSpecInfo(this.tempProduct)
                            }}
                            style={styleP.confirm}>
                            <Text style={styleP.confirmTxt}>{I18n.t('type_close')}</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </Animatable.View>


        );
    }


}
const styleP = StyleSheet.create({
    pageALl:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99
    },
    page: {
        backgroundColor: '#ECECEE',
        position: 'absolute',
        bottom: 0,
        zIndex: 999,
        width:'100%'
    },
    top: {
        height: 50,
        backgroundColor: "#FFFFFF",
        alignItems: 'center',
        justifyContent: 'center'
    },
    topTxt: {
        fontSize: 14,
        color: '#333333'
    },
    content: {
        marginTop:1,
        backgroundColor:"#FFFFFF",
        flexDirection:'row',
        alignItems:'center',
        height:50,
    },
    text:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17
    },
    img:{
        width:22,
        height:22,
        marginRight:17
    },
    confirmView: {
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%'
    },
    confirm: {
        height: 40,

        backgroundColor: '#F34A4A',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 133
    },
    confirmTxt: {
        fontSize: 18,
        color: '#FFFFFF'
    }
})