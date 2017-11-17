import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import Tips from './Tips';
import ShipAddress from './ShipAddress';
import MallInfo from './MallInfo';
import LeaveMessage from './LeaveMessage';
import OrderDetails from './OrderDetails';
import OrderBottom from './OrderBottom';
import {NavigationBar} from '../../../components';
import ExpiredOrder from './ExpiredOrder';
import {util} from '../../../utils/ComonHelper';

export default class OrderSubmitPage extends PureComponent {
    state = {
        isExpired: false
    };
    showExpiredInfo = (temp) => {
        if (util.isEmpty(temp)) {
            this.setState({
                isExpired: !this.state.isExpired
            })
        } else
            this.setState({
                isExpired: !this.state.isExpired
            })
    };

    money = () => {
        const {params} = this.props;

        let count = 0;
        params.forEach(item => {
            if (item.isSelect)
                count = count + (item.number * item.commodity.price);
        });

        return `${count}`;
    };
    sumMoney = (money, costs) => {
        return (Number(money) + costs);
    };

    submitBtn = () => {
        const {params} = this.props;
        console.log('commodity:', params)
        let adr = this.shipAddress.getAddress();
        console.log('address:', adr)


        let variants = [];
        if (!util.isEmpty(params))
            params.forEach(item => {
                let obj = {};
                obj.count = item.number;
                obj.id = item.commodity.id;
                variants.push(obj)
            });

        let shipping_info = {};
        if (!util.isEmpty(adr)) {
            shipping_info.name = adr.consignee;
            shipping_info.mobile = adr.mobile;
            shipping_info.address = {
                province: adr.province,
                city: adr.city,
                area: adr.area,
                detail: adr.address_detail
            }
        }

        console.log({variants, shipping_info})

    };

    render() {
        console.log("item:", this.props.params)
        const {isExpired} = this.state;
        let money = this.money();
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('confirm_order')}/>
                <ScrollView style={styleO.orderView}>

                    <Tips/>
                    <ShipAddress
                        ref={ref =>this.shipAddress = ref}/>
                    <MallInfo selectedData={this.props.params}/>
                    <LeaveMessage/>
                    <OrderDetails money={money} sumMoney={this.sumMoney(money,12)}/>
                    <View style={{height:80}}/>

                </ScrollView>
                <OrderBottom
                    submitBtn={this.submitBtn}
                    showExpiredInfo={this.showExpiredInfo}
                    sumMoney={this.sumMoney(money,12)}/>

                {isExpired ? <ExpiredOrder
                        showExpiredInfo={this.showExpiredInfo}/> : null}
            </View>

        );
    }
}
const styleO = StyleSheet.create({
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