import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import ReturnStatus from './ReturnStatus';
import RefundAmount from './RefundAmount';
import RefundInfo from './RefundInfo';
import ReturnBottom from './ReturnBottom';
import ProductItem from '../mallOrder/ProductItem';
import {showToast, util} from '../../../utils/ComonHelper';
import {getRefundInfo} from '../../../services/MallDao';
import {NavigationBar, BaseComponent} from '../../../components'

export default class ReturnSucceedPage extends PureComponent {

    state = {
        refundInfo: {}
    };

    componentDidMount() {
        const {refund_number} = this.props.params;
        console.log("refund_number:", refund_number)
        if (util.isEmpty(refund_number))
            return;
        this.contain.open();
        getRefundInfo({refund_number: refund_number}, data => {
            this.contain.close();
            console.log("refundInfo:", data);
            this.setState({
                refundInfo: data
            })
        }, err => {

        });

    }

    content = () => {
        const {refundInfo} = this.state;
        const {refund_number, refund_type, refund_price, memo, status, created_at, refund_order_items} = refundInfo;
        return (
            <ScrollView style={styleC.orderView}>

                <ReturnStatus refundInfo={refundInfo}/>

                <View style={styleC.priceView}>
                    <Text style={styleC.amountTxt}>{I18n.t('refund_amount')}：</Text>
                    <Text style={styleC.amount}>¥{refund_price}</Text>
                </View>

                <ProductItem lists={refund_order_items}/>

                <RefundInfo refundInfo={refundInfo}/>

                <View style={{height: 80}}/>
            </ScrollView>
        )

    }


    render() {
        const {refundInfo} = this.state;

        return (
            <BaseComponent
                ref={ref => this.contain = ref}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 17, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('apply_returned')}/>
                {util.isEmpty(refundInfo) ? null : this.content()}
                <ReturnBottom/>
            </BaseComponent>

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
    priceView: {
        height: 48,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
    },
    amountTxt: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17
    },
    amount: {
        fontSize: 14,
        color: '#F34A4A'
    }

})