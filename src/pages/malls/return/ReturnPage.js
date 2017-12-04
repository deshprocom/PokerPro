//退换货申请页面
import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import ApplicationType from './ApplicationType';
import ApplicationTypeInfo from './ApplicationTypeInfo';
import RefundAmount from './RefundAmount';
import RefundInstruction from './RefundInstruction';
import UploadDocument from './UploadDocument';
import UploadBottom from './UploadBottom';
import {NavigationBar} from '../../../components';
import ReturnItem from './ReturnItem';


export default class ReturnPage extends Component {

    state = {
        typeShow: false,
        refund_mall_amount: false,
        change_mall: false
    };

    showTypeInfo = () => {
        this.setState({
            typeShow: !this.state.typeShow
        })
    };
    _refund_mall_amount = () => {
        this.setState({
            refund_mall_amount: !this.state.refund_mall_amount,
            change_mall: false
        })
    };
    _change_mall = () => {
        this.setState({
            change_mall: !this.state.change_mall,
            refund_mall_amount: false
        })
    };

    render() {
        const {order_items} = this.props.params;
        console.log("items:", order_items)
        return (
            <View style={{flex: 1}}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('apply_returned')}/>
                <ScrollView style={styleC.orderView}>
                    <View style={{height: 1}}/>
                    {order_items.map(x => {
                        return <ReturnItem
                            key={x.id}
                            item={x}/>;
                    })}


                    <ApplicationType
                        showTypeInfo={this.showTypeInfo}
                        refund_mall_amount={this.state.refund_mall_amount}
                        change_mall={this.state.change_mall}/>

                    <RefundAmount/>


                    <RefundInstruction/>

                    <UploadDocument/>

                    <View style={{height: 80}}/>
                </ScrollView>


                <UploadBottom
                    showTypeInfo={this.showTypeInfo}/>

                {this.state.typeShow ? <ApplicationTypeInfo
                    showTypeInfo={this.showTypeInfo}
                    _refund_mall_amount={this._refund_mall_amount}
                    _change_mall={this._change_mall}
                    refund_mall_amount={this.state.refund_mall_amount}
                    change_mall={this.state.change_mall}/> : null}
            </View>

        );
    }
}
const styleC = StyleSheet.create({
    orderView: {
        backgroundColor: '#ECECEE'
    },
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: '#FFFFFF',
        width: '100%',
        zIndex: 999
    },
    popBtn: {
        height: 44,
        width: 50,
        justifyContent: 'center'
    },
    cart: {
        fontSize: 17,
        color: '#161718',
        fontWeight: 'bold'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    rightTxt: {
        fontSize: 15,
        color: '#161718'
    },

})