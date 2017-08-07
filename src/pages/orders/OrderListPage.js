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
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import ListOrderView from './ListOrderView';
import {getDispatchAction} from '../../utils/ComonHelper';
import {GET_CERTIFICATION} from '../../actions/ActionTypes'
import {Verified} from '../../configs/Status';


export default class OrderListPage extends Component {

    state = {
        user_id: '',
        status: ''
    }

    componentDidMount() {
        if (user_extra.status !== Verified.PASSED)
            getDispatchAction()[GET_CERTIFICATION]();
    }


    render() {
        return (<View style={ApplicationStyles.bgContainer}
                      testID="page_order_list">
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={this.props.router}
                title={I18n.t('order')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => this.props.router.pop()}/>

            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar
                    backgroundColor={Colors.white}
                    activeTextColor="#161718"
                    inactiveTextColor={Colors._AAA}
                    textStyle={{fontSize: 17}}
                    style={{borderColor: Colors._EEE}}
                    tabStyle={{paddingBottom: 0}}
                    underlineStyle={{backgroundColor: '#161718', width: '12%', height: 2, marginLeft: '4.6%'}}/>}>


                <ListOrderView
                    status="all"
                    testViewID="page_all_order"
                    tabLabel={I18n.t('all')}
                    router={this.props.router}/>
                <ListOrderView
                    status="unpaid"
                    testViewID="page_payment"
                    tabLabel={I18n.t('unpaid')}
                    router={this.props.router}/>
                <ListOrderView
                    status="paid"
                    testViewID="page_ship"
                    tabLabel={I18n.t('unshipped')}
                    router={this.props.router}/>
                <ListOrderView
                    status="completed"
                    testViewID="page_complete"
                    tabLabel={I18n.t('completed')}
                    router={this.props.router}/>


            </ScrollableTabView>

        </View>)
    }
}
