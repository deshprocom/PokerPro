import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import OrderStatus from './OrderStatus';
import Positioning from './Positioning';
import OrderMessage from './OrderMessage';
import OrderDetails from '../submitOrder/OrderDetails';
import CompletedBottom from '../mallOrder/CompletedBottom';
import {NavigationBar, BaseComponent} from '../../../components';
import {util} from '../../../utils/ComonHelper';
import ProductItem from '../mallOrder/ProductItem';
import {getMallDetail} from "../../../services/MallDao";

export default class MallOrderInfo extends PureComponent {


    state = {
        detail: {}
    };

    componentDidMount() {
        this.refresh();
    }


    refresh = () => {
        this.container && this.container.open();
        const {orderDetail} = this.props.params;
        getMallDetail({order_number: orderDetail.order_number}, data => {
            this.setState({
                detail: data
            })
        }, err => {
        })
    };


    render() {
        const {detail} = this.state;


        return (
            <BaseComponent
                ref={ref => this.container = ref}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        global.router.pop();
                        const {listRefresh} = this.props.params;
                        listRefresh && listRefresh();
                    }}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('order_info')}/>

                {util.isEmpty(detail) ? null : this.renderContent()}
            </BaseComponent>

        );
    }

    renderContent = () => {
        const {detail} = this.state;

        const {address, order_items, status,deduction_result,final_price,total_price} = detail;
        return <View style={{flex: 1}}>
            <ScrollView style={styleC.orderView}>
                <OrderStatus
                    status={I18n.t(`${status}`)}/>
                <Positioning
                    orderDetail={detail}
                    address={address}
                />
                <View style={styleC.detailView}>
                    <Text style={styleC.txtDetail}>{I18n.t('mallInfo')}</Text>

                </View>
                {util.isEmpty(order_items) ? null :
                    <ProductItem lists={order_items}
                                 disabled={false}/>}
                <OrderMessage
                    orderDetail={detail}/>
                <OrderDetails
                    sumMoney={deduction_result === 'success'?final_price:total_price}
                    orderDetail={detail}/>
                <View style={{height: 80}}/>
            </ScrollView>


            <CompletedBottom
                pageOrderInfo={true}
                refresh={this.refresh}
                orderItem={detail}/>
        </View>
    }
}
const styleC = StyleSheet.create({
    bottom: {
        height: 50,
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width: '100%',
        zIndex: 999
    },
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
    detailView: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white'
    },
    txtDetail: {
        color: '#333333',
        fontSize: 14,
        marginLeft: 17
    }

});