/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput, Platform,
    StyleSheet, Image, Text
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import OrderBottom from '../malls/order/OrderBottom';
import {showToast} from '../../utils/ComonHelper';

export default class SubscriptionConfirmPage extends PureComponent {
    state = {
        clickImg:false
    };

    submitBtn = () => {
        if(this.state.clickImg){
            return showToast('成功')
        }else{
            return
        }
    };

    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: Colors.white}}
                    title={I18n.t('confirm_order')}
                    titleStyle={{color: Colors._161}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <View style={styles.page}>
                    <View style={styles.title}>
                        <Text style={styles.titleTxt}>{I18n.t('order_info')}</Text>
                    </View>

                    <View style={[styles.message,{paddingTop:15}]}>
                        <Text style={styles.messageTxt1}>{I18n.t('order_price')}</Text>

                        <Text style={styles.messageTxt2}>¥2182.8</Text>
                    </View>
                    <View style={[styles.message,{marginTop:6,paddingBottom:13}]}>
                        <Text style={styles.messageTxt1}>{I18n.t('purchase_copies')}</Text>

                        <Text style={styles.messageTxt1}>X2</Text>
                    </View>

                </View>

                <View style={styles.buy}>
                    <Text style={styles.messageTxt2}>¥2182.8</Text>
                    <Text style={styles.messageTxt1}>{I18n.t('payment')}：</Text>

                </View>

                <View style={styles.read}>
                    <View style={{marginLeft: 17, marginRight: 17}}>
                        <Text style={styles.readTxt1}>我是投资人本人xxx，身份证号码xxxxxxxxxxxxxxxxxxxx，我已认真阅读并同意
                            <Text style={{color:'#438EE6'}}
                                  onPress={()=>{
                                global.router.toRiskWarningPage()
                            }}>《风险提示》</Text>
                            及其他相关条款和协议，自愿认购xxxxxx赛事众筹项目，并支付众筹款项
                            <Text style={{color:Colors._F34}}>200.00元</Text>。</Text>

                    </View>
                    <TouchableOpacity
                        style={{flexDirection:'row',alignItems:'center',marginTop:12,marginLeft: 17, marginRight: 17}}
                    onPress={()=>{
                        this.setState({
                            clickImg:!this.state.clickImg
                        })
                    }}>
                        <Image style={styles.img} source={this.state.clickImg?Images.clickImgBlue:Images.clickImg} alt=""/>
                        <Text style={styles.txt}>{I18n.t('promise_message')}</Text>
                    </TouchableOpacity>
                </View>

                <OrderBottom
                    submitBtn={this.submitBtn}
                    sumMoney="222222"/>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    page: {
        marginTop: 5,
        backgroundColor: 'white'
    },
    title: {
        height: 40,
        paddingLeft: 17,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors._ECE
    },
    titleTxt: {
        fontSize: 14,
        color: Colors._333,
        fontWeight: 'bold'

    },
    message: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 17,
        paddingRight: 17
    },

    messageTxt1: {
        fontSize: 14,
        color: '#333333'
    },
    messageTxt2: {
        fontSize: 18,
        color: '#F34A4A'
    },
    buy: {
        marginTop: 1,
        paddingLeft: 17,
        paddingTop: 11,
        paddingBottom: 11,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    read: {
        marginTop: 10,
        paddingTop: 18,
        paddingBottom: 15,
        backgroundColor: 'white'
    },
    readTxt1: {
        fontSize: 14,
        color: '#444444',
        lineHeight: 20
    },
    readTxt2: {
        fontSize: 14,
        color: '#F34A4A'
    },
    readTxt3: {
        fontSize: 14,
        color: '#438EE6'
    },
    img: {
        width: 16,
        height: 16
    },
    txt: {
        fontSize: 12,
        color: '#444444',
        marginLeft: 10
    }


});