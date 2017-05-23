/**
 * Created by lorne on 2017/2/17.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import RaceInfoView from '../buy/RaceInfoView';
import {GET_ORDER_DETAIL, POST_ORDER_CANCEL} from '../../actions/ActionTypes';
import {fetchOrderDetail, fetchOrderCancel} from '../../actions/OrderAction'
import Communications from 'react-native-communications';
import {
    ticketType, legalValue,
    DATA_SS, orderStatus, moneyFormat, isEmptyObject,
    convertDate, getLoginUser, strNotNull
} from '../../utils/ComonHelper';
import Button from 'react-native-smart-button';
import {fetchGetRecentRaces, fetchRacesInfo} from '../../actions/RacesAction';
import {Verified} from '../../configs/Status';

class OrderInfoPage extends React.Component {

    componentDidMount() {
        this._refreshPage();
    }

    state = {
        user_id: ''
    };

    componentWillReceiveProps(newProps) {
        console.log(newProps.actionType, newProps.loading, newProps.hasData)
        if (newProps.actionType === POST_ORDER_CANCEL
            && this.props.loading !== newProps.loading
            && newProps.hasData) {

            this._refreshPage();
            const recentRaces = {
                user_id: this.state.user_id,
                number: 5
            };
            this.props._getRecentRaces(recentRaces);

            const {orderDetail} = this.props;
            const {race_info} = orderDetail;
            const body = {
                user_id: this.state.user_id,
                race_id: race_info.race_id
            };
            this.props._getRacesInfo(body);
        }

    }

    _refreshPage = () => {

        console.log('orderE', getLoginUser())
        const {user_id} = getLoginUser();
        if (strNotNull(user_id)) {
            this.setState({
                user_id: user_id
            });
            const body = {
                user_id: user_id,
                order_id: this.props.params.order_id
            };
            this.props._getOrderDetail(body);
        }

    }

    _orderCancel = () => {

        Alert.alert("提示", "您是否要取消订单", [{
            text: "取消",
            onPress: () => {
            }
        },
            {
                text: " 确认",
                onPress: () => this._cancelOrder()
            }]);

    }

    _cancelOrder = () => {
        const body = {
            user_id: this.state.user_id,
            order_id: this.props.params.order_id
        };
        this.props._postOrderCancel(body)
    };

    _hotLine = () => {

        const {status} = user_extra;
        if (status === Verified.PENDING) {
            Alert.alert(I18n.t('tint'), I18n.t('user_real_pending'),
                [{
                    text: I18n.t('cancel'), onPress: () => {
                    }
                },
                    {
                        text: I18n.t('contact_customer_service'), onPress: () => {
                        Communications.phonecall(I18n.t('hot_phone'), false)
                    }
                    }])
        } else
            Alert.alert(I18n.t('hot_line'), I18n.t('hot_phone') + '\n' + I18n.t('work_time'),
                [{
                    text: I18n.t('cancel'), onPress: () => {
                    }
                },
                    {
                        text: I18n.t('call'), onPress: () => {
                        Communications.phonecall(I18n.t('hot_phone'), false)
                    }
                    }])
    }


    _orderView = (order_info) => {
        if (!isEmptyObject(order_info))
            return (<View>
                {/*订单信息*/}
                <View style={{height:141,backgroundColor:Colors.white,paddingLeft:17,marginTop:10}}>
                    <View style={{height:40,alignItems:'center',flexDirection:'row'}}>
                        <Text style={{fontSize:Fonts.size.h16,color:Colors.txt_444}}>订单信息</Text>
                    </View>

                    <View style={{height:1,backgroundColor:Colors.bg_f5}}/>

                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontSize:14,color:Colors.txt_666,marginRight:18}}>订单编号:</Text>
                                <Text
                                    testID="txt_ticket_type"
                                    style={{fontSize:15,color:Colors._888}}>{order_info.order_id}</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                <Text style={{fontSize:14,color:Colors.txt_666,marginRight:18}}>下单时间:</Text>
                                <Text
                                    testID="txt_created_at"
                                    style={{fontSize:15,color:Colors._888}}>
                                    {convertDate(order_info.created_at, DATA_SS)}</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                <Text style={{fontSize:14,color:Colors.txt_666,marginRight:18}}>订单状态:</Text>
                                <Text
                                    testID="txt_order_status"
                                    style={{fontSize:15,color:Colors._888}}>{orderStatus(order_info.status)}</Text>
                            </View>
                        </View>

                    </View>


                </View>
                {/*地址 邮箱*/}
                <View style={{height:81,backgroundColor:Colors.white,paddingLeft:17,marginTop:5}}>
                    <View>
                        <View style={{height:40,alignItems:'center',flexDirection:'row'}}>
                            <Text style={{fontSize:Fonts.size.h16,color:Colors.txt_444}}>收票方式-电子邮件</Text>
                        </View>
                        <View style={{height:1,backgroundColor:Colors.bg_f5}}/>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Text style={{fontSize:14,color:Colors.txt_666,marginRight:18}}>电子邮件:</Text>
                            <Text
                                testID="txt_email"
                                style={{fontSize:14,color:Colors._888}}>{legalValue(order_info.email)}</Text>
                        </View>
                    </View>
                </View>
                {/*订单明细*/}
                <View style={{height:121,backgroundColor:Colors.white,paddingLeft:17,marginTop:5}}>

                    <View style={{height:40,alignItems:'center',flexDirection:'row'}}>
                        <Text style={{fontSize:Fonts.size.h16,color:Colors.txt_444}}>订单明细</Text>
                    </View>
                    <View style={{height:1,backgroundColor:Colors.bg_f5}}/>


                    <View style={{flex:1}}>
                        <View
                            style={{justifyContent:'space-between',flexDirection:'row',marginTop:14}}>
                            <Text style={{fontSize:14,color:Colors.txt_666}}>商品金额</Text>
                            <Text
                                testID="txt_original_price"
                                style={{fontSize:14,color:Colors.txt_E48,marginRight:18}}>
                                {moneyFormat(legalValue(order_info.original_price))}元</Text>
                        </View>
                        <View
                            style={{justifyContent:'space-between',flexDirection:'row',marginTop:16}}>
                            <Text style={{fontSize:14,color:Colors.txt_666}}>应付金额</Text>
                            <Text
                                testID="txt_price"
                                style={{fontSize:14,color:Colors.txt_E48,marginRight:18}}>
                                {moneyFormat(legalValue(order_info.price))}元</Text>
                        </View>
                    </View>

                </View>
            </View>)
    }

    _bottomBar = (order_info) => {

        if (!isEmptyObject(order_info) &&
            order_info.status === 'unpaid')
            return ( <View
                activeOpacity={1}
                testID="btn_buy"
                onPress={this.props.onPress}
                style={{height:62,width:Metrics.screenWidth,
                        backgroundColor:Colors.white,flexDirection:'row',
                        alignItems:'center',
                        position:'absolute',bottom: 0,left: 0,right: 0,}}>


                <View style={{flexDirection:'row',marginLeft:19,alignItems:'flex-end'}}>
                    <Text style={{fontSize:14,color:Colors.txt_666}}>合计:</Text>
                    <Text style={{fontSize:12,color:Colors.txt_FF9,marginLeft:10}}>¥</Text>
                    <Text
                        testID="txt_total_price"
                        style={{fontSize:18,color:Colors.txt_FF9}}>
                        {isEmptyObject(order_info) ? '' : order_info.price}</Text>
                </View>

                <TouchableOpacity
                    onPress={this._orderCancel}
                    activeOpacity={1}
                    testID="btn_order_cancel"
                    style={{flex:1,alignItems:'flex-end'}}>
                    <View
                        style={{borderColor:Colors._AAA,borderWidth:1,borderRadius:5,
                    height:32,width:68,alignItems:'center',justifyContent:'center',marginRight:15}}>
                        <Text style={{fontSize:12,color:Colors.txt_666}}>取消订单</Text>
                    </View>
                </TouchableOpacity>
                {this._user_real_call_btn()}

            </View>)
    }

    _user_real_call_btn = () => {
        if (user_extra.status === Verified.FAILED)
            return (<TouchableOpacity
                testID="btn_user_real"
                onPress={this._goUserReal}
                activeOpacity={1}
                style={{width:130,height:62,alignItems:'center',justifyContent:'center',
                    backgroundColor:Colors.bg_09}}>
                <Text style={{fontSize:18,color:Colors.txt_E0C}}>{I18n.t('edit_real_name')}</Text>
            </TouchableOpacity>)
        else
            return (<TouchableOpacity
                testID="btn_call"
                onPress={this._hotLine}
                activeOpacity={1}
                style={{width:130,height:62,alignItems:'center',justifyContent:'center',
                    backgroundColor:Colors.bg_09}}>
                <Text style={{fontSize:18,color:Colors.txt_E0C}}>{I18n.t('service_pay')}</Text>
            </TouchableOpacity>)
    }

    _goUserReal = () => {
        this.props.router.toCertificationPage();
    }


    scrollStyle = (order_info) => {
        if (!isEmptyObject(order_info) &&
            order_info.status === 'unpaid')
            return {marginBottom: 62}
        else
            return {}
    }

    _serviceBtn = (order_info) => {
        if (!isEmptyObject(order_info) &&
            order_info.status !== 'unpaid')
            return (<Button
                onPress={this._hotLine}
                touchableType={Button.constants.touchableTypes.fadeContent}
                testID="btn_refresh"
                textStyle={{color:Colors.txt_666,fontSize:17}}
                style={{justifyContent:'center',backgroundColor:Colors.white,
                    height:49,flex:1,marginLeft:17,marginRight:17,marginBottom:17
                    }}
            >
                联系客服
            </Button>)
    };

    _exitOrder = () => {
        this.props.router.pop();
        if (this.props.params.onRefresh !== undefined)
            this.props.params.onRefresh()
    }

    _userRealFail = () => {
        if (user_extra.status === Verified.FAILED)
            return (<View
                style={{width:Metrics.screenWidth,height:40,flexDirection:'row',alignItems:'center',backgroundColor:'#F56666'}}>
                <Text style={[Fonts.H15,{color:Colors.white,marginLeft:17}]}>实名审核失败，原因:{user_extra.memo}</Text>
            </View>)
    }


    render() {
        const {orderDetail} = this.props;
        const {race_info, order_info} = orderDetail;

        return (
            <View
                testID="page_order_info"
                style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={()=>this._refreshPage()}
                    toolbarStyle={{backgroundColor:Colors.bg_09}}
                    router={this.props.router}
                    title={orderStatus(!isEmptyObject(order_info)?order_info.status:I18n.t('order_info'))}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                    leftBtnPress={this._exitOrder}/>
                {this._userRealFail()}
                <ScrollView style={this.scrollStyle(order_info)}>
                    <View style={{height:7}}/>
                    {/*赛事简介*/}
                    <RaceInfoView
                        orderInfo={order_info}
                        disabled={false}
                        raceInfo={race_info}
                        router={this.props.router}/>
                    {this._orderView(order_info)}

                    {/*购票须知*/}
                    <View style={{backgroundColor:Colors.white,paddingLeft:17,marginTop:10}}>
                        <View style={{height:40,alignItems:'center',flexDirection:'row'}}>
                            <Text style={{fontSize:Fonts.size.h16,color:Colors.txt_444}}>购票须知</Text>
                        </View>
                        <Text style={{fontSize:14,color:Colors._888,textAlign:'left',
                        marginRight:17,paddingBottom:30}}>
                            1.购买赛事票，赛事当天凭需购票人身份证件登记入场，请务必正确填写参赛的身份证件。
                            {'\n\n'}
                            2.本赛事所有票务暂支持线下付款，订单成功后我们将在及时与您取得联系，请您耐心等待！
                            {'\n\n'}
                            3.本赛事暂不支持在线选座，购票后将随机配票。
                            {'\n\n'}
                            4.本赛事所有订单付款成功后不支持调整和退换，请付款前确保订单地址、身份信息、邮件地址正确，感谢您对扑客的支持！
                            {'\n\n'}
                            5.实体票支付成功后我们将在1-5个工作日内陆续为您配送，请您耐心等待！
                            {'\n\n'}
                            6.电子票支付成功后，我们将赛票信息发送到您预留的邮箱，请及时查收。如若邮箱收不到信息，请及时与客服人员取得联系！
                            {'\n\n'}
                            7.客服服务热线：XXXXXXXXXXX；服务时间：10：30-19:30
                        </Text>
                    </View>

                    <View style={{height:30}}/>


                    {this._serviceBtn(order_info)}
                </ScrollView>

                {/*底部导航栏*/}
                {this._bottomBar(order_info)}

            </View>)
    }
}

const
    bindAction = dispatch => ({
        _getOrderDetail: (body) => dispatch(fetchOrderDetail(body)),
        _postOrderCancel: (body) => dispatch(fetchOrderCancel(body)),
        _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
        _getRacesInfo: (body) => dispatch(fetchRacesInfo(body))
    });

const
    mapStateToProps = state => ({
        loading: state.OrderState.loading,
        error: state.OrderState.error,
        hasData: state.OrderState.hasData,
        actionType: state.OrderState.actionType,
        orderDetail: state.OrderState.orderDetail
    });

export
default

connect(mapStateToProps, bindAction)

(
    OrderInfoPage
)
;