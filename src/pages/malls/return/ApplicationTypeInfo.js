import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import * as Animatable from 'react-native-animatable';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';

export default class ApplicationTypeInfo extends PureComponent {

    static propTypes = {
        showTypeInfo: propTypes.func.isRequired,
        _refund_mall_amount: propTypes.func.isRequired,
        _change_mall: propTypes.func.isRequired
    };


    render() {

        const {refund_mall_amount, change_mall, refund_types} = this.props;
        return (
            <Animatable.View
                style={styleP.pageALl}>
                <Animatable.View
                    duration={300}
                    animation={'fadeInUp'}
                    style={styleP.page}>
                    <View style={{height: 280}}>
                        <View style={styleP.top}>
                            <Text style={styleP.topTxt}>{I18n.t('select_type')}</Text>
                        </View>
                        {refund_types.map(item => {
                            return <TouchableOpacity
                                key={`refund_type${item.id}`}
                                style={styleP.content}
                                onPress={() => {
                                    this.props._refund_mall_amount(item)
                                }}>
                                <Text style={styleP.text}>{item.name}</Text>
                                <View style={{flex: 1}}/>
                                <Image style={styleP.img}
                                       source={item.isSelect ? Images.return_radio_selected : Images.return_radio}/>
                            </TouchableOpacity>
                        })}


                        <TouchableOpacity style={styleP.confirmView}
                                          onPress={() => {
                                              this.props.showTypeInfo()
                                          }}>
                            <Text style={styleP.confirmTxt}>{I18n.t('type_close')}</Text>
                        </TouchableOpacity>

                    </View>

                </Animatable.View>
            </Animatable.View>


        );
    }


}
const styleP = StyleSheet.create({
    pageALl: {
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
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999
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
        marginTop: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    text: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17
    },
    img: {
        width: 22,
        height: 22,
        marginRight: 17
    },
    confirmView: {
        height: 50,
        backgroundColor: "#F34A4A",
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    confirmTxt: {
        fontSize: 18,
        color: '#FFFFFF'
    }
})