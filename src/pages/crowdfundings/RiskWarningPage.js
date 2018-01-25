/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,Platform,
    StyleSheet, Image, Text
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar,ActionPay} from '../../components';
import OrderBottom from '../malls/order/OrderBottom';
import {crowd_order} from '../../services/CrowdDao';
import {showToast} from '../../utils/ComonHelper';

export default class RiskWarningPage extends PureComponent {
    state={

    };

    submitBtn = (order_info) => {
        if (this.props.params.clickImg) {

            crowd_order(order_info, data => {

                this.props.params.order=data;
                this.actionPay.toggle();
            }, err => {

            })
        } else {
            showToast('请返回上一页同意扑客协议')
        }

    };
    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: Colors.white}}
                    title={I18n.t('risk_warn')}
                    titleStyle={{color: Colors._161}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <View style={styles.page}>
                    <Text style={styles.pageTxt}>{I18n.t('risk_warn_content')}</Text>
                </View>
                <OrderBottom
                    submitBtn={()=>this.submitBtn(this.props.params.order_info)}
                    sumMoney={this.props.params.sumMoney}/>
                <ActionPay
                    ref={ref => this.actionPay = ref}
                    sumMoney = {this.props.params.sumMoney}
                    orderNumber={this.props.params.order.order_number}/>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    page:{
     margin:(15,17,0,17)
    },
    pageTxt:{
        fontSize:14,
        color:Colors._888,
        lineHeight:20
    }

});