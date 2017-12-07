/**
 * Created by lorne on 2017/2/22.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar} from '../../../components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import OrderListStatus from './OrderListStatus';
import {MallStatus} from "../../../configs/Status";


export default class MallOrderPage extends Component {

    state = {
        categories: [],
        user_id: '',
        status: '',
        mall_orders: []
    };


    render() {
        let menu = ['all', MallStatus.unpaid, MallStatus.paid, MallStatus.completed];
        return (<View style={[ApplicationStyles.bgContainer, {backgroundColor: '#ECECEE'}]}
                      testID="page_order_list">
            <NavigationBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
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
                    tabStyle={{paddingBottom: 0}}
                    style={{borderColor: Colors._EEE, marginTop: 1,height:44,alignItems:'center'}}
                    underlineStyle={{backgroundColor: '#F34A4A', width: '12%', height: 2, marginLeft: '4.6%'}}/>}>
                {menu.map((item, index) => {
                    return <OrderListStatus
                        key={`mallStatus${index}`}
                        status={item}
                        tabLabel={item === MallStatus.paid ? I18n.t('unshipped') : I18n.t(`${item}`)}/>
                })}

            </ScrollableTabView>


        </View>)
    }
}
