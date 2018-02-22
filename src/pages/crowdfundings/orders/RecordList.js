/**
 * Created by lorne on 2018/1/17
 * Function:
 * Desc:赞助记录
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes/index';
import {NavigationBar} from '../../../components/index';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import I18n from 'react-native-i18n';
import {CrowdStatus} from '../../../configs/Status';
import CrowdList from './CrowdList';
import {user_crowd_orders} from '../../../services/CrowdDao';

export default class RecordList extends PureComponent {


    render() {
        var menu =[
            CrowdStatus.ALL, CrowdStatus.UNPUBLISHED, CrowdStatus.SUCCESS, CrowdStatus.FAILED
        ];
        return <View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                barStyle={'dark-content'}
                toolbarStyle={{backgroundColor: 'white'}}
                leftBtnIcon={Images.mall_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 17, marginRight: 20}}
                leftBtnPress={() => router.pop()}
                titleStyle={{color: Colors._161}}
                title={'赞助记录'}/>

            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar
                    backgroundColor={Colors.white}
                    activeTextColor="#F34A4A"
                    inactiveTextColor={Colors._AAA}
                    textStyle={{fontSize: 15}}
                    tabStyle={{paddingBottom: 0}}
                    style={{borderColor: Colors._EEE, marginTop: 1, height: 44, alignItems: 'center'}}
                    underlineStyle={{backgroundColor: '#F34A4A', width: '12%', height: 2, marginLeft: '4.6%'}}/>}>
                {menu.map((item, index) => <CrowdList
                    status={item}
                    key={item + index}
                    tabLabel={I18n.t(this._tabLabel(item))}/>)}


            </ScrollableTabView>

        </View>
    }

    _tabLabel = (status) => {
        switch (status) {
            case  CrowdStatus.ALL:
                return 'all'
            case CrowdStatus.UNPUBLISHED:
                return 'unpublish'
            case CrowdStatus.SUCCESS:
                return 'success'
            case CrowdStatus.FAILED:
                return 'unsuccess'
        }
    }


}