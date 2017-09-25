/**
 * Created by lorne on 2017/2/20.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';

export default class BuyKnowPage extends Component {

    render() {
        return (<View testID="page_ticket_notice"
                      style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={I18n.t('buy_ticket')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>
            <ScrollView>

                <View style={{flexDirection: 'row', alignItems: 'center', height: 66}}>
                    <Image style={{
                        height: 18, width: 16, marginLeft: 18,
                        marginRight: 11
                    }}
                           source={Images.ticket_security2}/>
                    <Text style={{fontSize: Fonts.h15, color: Colors.txt_444}}>{I18n.t('ticket_prompt')}</Text>

                </View>
                <View style={{marginLeft: 18, marginRight: 18}}>
                    <Text style={{fontSize: Fonts.h14, color: Colors._888, textAlign: 'justify'}}>
                        {I18n.t('order_known')}
                    </Text>

                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 37, marginBottom: 10}}>
                    <Image style={{
                        height: 18, width: 16, marginLeft: 18,
                        marginRight: 11
                    }}
                           source={Images.ticket_security2}/>
                    <Text style={{fontSize: Fonts.h15, color: Colors.txt_444}}>{I18n.t('e_ticket_buy')}</Text>

                </View>
                <Image
                    resizeMode='contain'
                    style={{
                        height: 250, width: Metrics.screenWidth - 60,
                        alignSelf: 'center'
                    }}
                    source={language === 'zh' ? Images.e_ticket_buy_zh : Images.e_ticket_buy_en}/>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 37, marginBottom: 10}}>
                    <Image style={{
                        height: 18, width: 16, marginLeft: 18,
                        marginRight: 11
                    }}
                           source={Images.ticket_security2}/>
                    <Text style={{fontSize: Fonts.h15, color: Colors.txt_444}}>{I18n.t('entity_ticket_buy')}</Text>

                </View>
                <Image
                    resizeMode='contain'
                    style={{
                        height: 250, width: Metrics.screenWidth - 60,
                        alignSelf: 'center'
                    }}
                    source={language === 'zh' ? Images.entity_ticket_buy_zh : Images.entity_ticket_buy_en}/>
                <View style={{height: 40}}/>

            </ScrollView>


        </View>)
    }
}
