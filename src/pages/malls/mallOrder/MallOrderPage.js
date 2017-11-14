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
import {DefaultTabBar} from 'react-native-scrollable-tab-view';
import MallTypeView from './MallTypeView';

const  categories = [{id:1,name:"待收款"},{id:2,name:"待发货"},{id:3,name:"已完成"}];

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

            <MallTypeView
                categories={this.state.categories}
                />

        </View>)
    }
}
