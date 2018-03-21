import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Alert, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import Tips from './Tips';
import ShipAddress from './ShipAddress';
import MallInfo from './MallInfo';
import LeaveMessage from './LeaveMessage';
import OrderDetails from './OrderDetails';
import OrderBottom from './OrderBottom';
import {NavigationBar, BaseComponent} from '../../../components';
import ExpiredOrder from './ExpiredOrder';
import {
    util,
    payWx,
    isWXAppInstalled,
    deleteProductFromCart,
    showToast,
    alertOrderChat
} from '../../../utils/ComonHelper';
import {getProductOrders, postMallOrder, postWxPay, getWxPaidResult} from '../../../services/MallDao';
import {addTimeRecode} from "../../../components/PayCountDown";
import Discount from '../../comm/Discount';
import {get_discount} from '../../../services/CrowdDao';

export default class OrderSubmitPage extends PureComponent {
    state = {
        isExpired: false,
        order_number: {},
        orderData: {},
        invalidProducts: [],
        isInstall: false,
        discount: {},
        handle_value: false

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


    componentDidMount() {
        this.pokercion = 0;
        let body = this.postParam();
        isWXAppInstalled(isInstall => {
            this.setState({
                isInstall: isInstall
            })
        });

        get_discount(discount => {
            this.setState({discount})
        }, err => {

        })

        getProductOrders(body, data => {


            const {invalid_items} = data;
            let carts = this.props.params;


            let invalidProducts = [];

            invalid_items.forEach(invalid => {
                invalidProducts = carts.filter(item => {
                    return invalid === item.variant.id;
                });
            });


            this.setState({
                orderData: data,
                invalidProducts
            })
        }, err => {
            Alert.alert(`${I18n.t('tint')}`, err, [
                {
                    text: `${I18n.t('certain')}`, onPress: () => {
                        global.router.pop()
                    }
                }])
        });

    }

    postParam = () => {
        const {params} = this.props;
        let adr = this.shipAddress.getAddress();
        let leaveMessage = this.leaveMessage.getLeaveMessage();

        let variants = [];
        if (!util.isEmpty(params))
            params.forEach(item => {
                let obj = {};
                obj.number = item.number;
                obj.id = item.variant.id;
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
        let memo = "";
        if (!util.isEmpty(leaveMessage)) {
            memo = leaveMessage
        }

        return {
            variants,
            shipping_info,
            memo,
            deduction: this.state.handle_value,
            deduction_numbers: this.pokercion
        };

    };


    submitBtn = () => {

        let adr = this.shipAddress.getAddress();
        const {invalid_items} = this.state.orderData;

        if (!util.isEmpty(this.state.order_number))
            return;
        if (util.isEmpty(adr)) {
            showToast(I18n.t('adr_empty'));
            return;
        }

        if (this.state.isExpired || util.isEmpty(invalid_items)) {
            let body = this.postParam();
            postMallOrder(body, data => {
                this.removeCarts();
                this.setState({
                    order_number: data
                });
                addTimeRecode(data.order_number);
                if (this.state.isInstall) {
                    postWxPay(data, ret => {
                        payWx(ret, () => {
                            getWxPaidResult(data, result => {

                                global.router.replaceMallOrderInfo(data)
                            }, err => {
                                showToast('支付成功，系统正在处理')
                            }, () => {
                            })

                        }, () => {
                            global.router.replaceMallOrderInfo(data)
                        })
                    }, err => {

                    });
                } else {
                    alertOrderChat(I18n.t('need_weChat'))
                }
            }, err => {
                showToast(err)
            });

        } else {
            this.setState({
                isExpired: !this.state.isExpired
            })
        }


    };

    removeCarts = () => {
        let carts = global.shoppingCarts.filter(item => !item.isSelect);

        deleteProductFromCart(carts)
    };

    discounted = (orderData) => {
        const {discount, handle_value} = this.state;
        const {total_price, total_product_price} = orderData;

        let available = total_product_price * discount.discount * 100
        if (available > discount.total_poker_coins) {
            available = discount.total_poker_coins
        }
        this.pokercion = available;

        let discount_num = total_price * 100 - available;

        return handle_value ? discount_num / 100 : total_price
    }

    render() {

        const {isExpired, invalidProducts, orderData, discount} = this.state;
        const {total_price, total_product_price, shipping_price, items} = orderData;

        return (
            <BaseComponent
                ref={ref => this.container = ref}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 17, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('confirm_order')}/>
                <ScrollView style={styleO.orderView}>

                    <Tips/>
                    <ShipAddress
                        ref={ref => this.shipAddress = ref}/>
                    {util.isEmpty(items) ? null : <MallInfo selectedData={items}/>}


                    <LeaveMessage
                        ref={ref => this.leaveMessage = ref}/>
                    <Discount
                        discount={discount}
                        handle_value={handle_value => {
                            this.setState({handle_value})
                        }}
                        count={total_product_price}/>
                    <OrderDetails
                        sumMoney={this.discounted(orderData)}
                        orderDetail={orderData}/>
                    <View style={{height: 80}}/>

                </ScrollView>
                <OrderBottom
                    submitBtn={this.submitBtn}
                    showExpiredInfo={this.showExpiredInfo}
                    sumMoney={this.discounted(orderData)}/>

                {isExpired ? <ExpiredOrder
                    submitBtn={this.submitBtn}
                    invalidProducts={invalidProducts}
                    orderData={this.state.orderData}
                    prop={this.props}
                    showExpiredInfo={this.showExpiredInfo}/> : null}
            </BaseComponent>

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