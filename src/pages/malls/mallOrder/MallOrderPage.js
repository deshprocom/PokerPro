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
import MallListOrderView from './MallListOrderView';

const  categories = [{id:1,name:"全部"},{id:2,name:"代收款"},{id:3,name:"代发货"},{id:4,name:"已完成"}];

export default class MallOrderPage extends Component {

    state = {
        categories:[],
        user_id: '',
        status: ''
    };

    componentDidMount() {
        this.setState({categories:categories})
    }


    render() {
        return (<View style={[ApplicationStyles.bgContainer,{backgroundColor:'#ECECEE'}]}
                      testID="page_order_list">
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.white}}
                title={I18n.t('mall_order')}
                titleStyle={{color: Colors._161}}
                leftBtnIcon={Images.mall_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            {/*<View*/}
                {/*renderTabBar={() => <DefaultTabBar*/}
                    {/*backgroundColor={Colors.white}*/}
                    {/*activeTextColor="#F34A4A"*/}
                    {/*inactiveTextColor={Colors._AAA}*/}
                    {/*textStyle={{fontSize: 15}}*/}
                    {/*style={{borderColor: Colors.bg_ec,marginTop:1}}*/}
                    {/*tabStyle={{paddingBottom: 0}}*/}
                    {/*underlineStyle={{backgroundColor: '#F34A4A', width: '12%', height: 2, marginLeft: '4.6%'}}/>}>*/}

                {/**/}
            {/*</View>*/}

            <MallListOrderView
                categories={categories}
                />

        </View>)
    }
}
