/**
 * Created by lorne on 2017/2/22.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar} from '../../../components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import OrderListStatus from './OrderListStatus';


export default class MallOrderPage extends Component {

    state = {
        categories: [],
        user_id: '',
        status: '',
        mall_orders: []
    };




    render() {
        let menu = ['全部', '待付款', '待收获', '已完成'];
        return (<View style={[ApplicationStyles.bgContainer,{backgroundColor:'#ECECEE'}]}
                      testID="page_order_list">
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.white}}
                title={I18n.t('mall_order')}
                titleStyle={{color: Colors._161}}
                leftBtnIcon={Images.mall_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar
                    backgroundColor={Colors.white}
                        activeTextColor="#F34A4A"
                        inactiveTextColor={Colors._AAA}
                        textStyle={{fontSize: 15}}
                        style={{borderColor: Colors._EEE,marginTop:1}}
                        underlineStyle={{backgroundColor: '#F34A4A', height: 2}}/>}>
                {menu.map((item, index) => {
                    return <OrderListStatus
                        key={`mallStatus${index}`}
                        status={item}
                        tabLabel={item}/>
                })}

            </ScrollableTabView>


        </View>)
    }
}
