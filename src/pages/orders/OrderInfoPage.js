/**
 * Created by lorne on 2017/2/17.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Linking
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SecurityText} from '../../components';
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
import PayModal from '../buy/PayModal';
import {postOrderCancel, postPayOrder} from '../../services/OrderDao';

class OrderInfoPage extends React.Component {

    componentDidMount() {
        const {isPay} = this.props.params;
        if (isPay) {
            this._pay();
        }
        this._refreshPage();
        Linking.addEventListener('url', this._handleOpenURL);
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenURL);
    }

    _handleOpenURL = (event) => {
        console.log('scheme URL:', event.url);
        router.pop();
        this._refreshPage();
    };

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

        Alert.alert(I18n.t('tint'), I18n.t('is_cancel_order'), [{
            text: I18n.t('cancel'),
            onPress: () => {
            }
        },
            {
                text: I18n.t('confirm'),
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
                <View style={{height: 141, backgroundColor: Colors.white, paddingLeft: 17, marginTop: 10}}>
                    <View style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: Fonts.size.h16, color: Colors.txt_444}}>{I18n.t('order_detail')}</Text>
                    </View>

                    <View style={{height: 1, backgroundColor: Colors.bg_f5}}/>

                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text
                                    style={{fontSize: 14, color: Colors.txt_666, marginRight: 18}}>{I18n.t('order_num')}:</Text>
                                <Text
                                    testID="txt_ticket_type"
                                    style={{fontSize: 15, color: Colors._888}}>{order_info.order_id}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Text style={{
                                    fontSize: 14,
                                    color: Colors.txt_666,
                                    marginRight: 18
                                }}>{I18n.t('order_time')}:</Text>
                                <Text
                                    testID="txt_created_at"
                                    style={{fontSize: 15, color: Colors._888}}>
                                    {convertDate(order_info.created_at, DATA_SS)}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Text style={{
                                    fontSize: 14,
                                    color: Colors.txt_666,
                                    marginRight: 18
                                }}>{I18n.t('order_status')}:</Text>
                                <Text
                                    testID="txt_order_status"
                                    style={{fontSize: 15, color: Colors._DF1}}>{orderStatus(order_info.status)}</Text>
                            </View>
                        </View>

                    </View>


                </View>
                {/*地址 邮箱*/}
                <View style={{backgroundColor: Colors.white, paddingLeft: 17, marginTop: 5}}>
                    <View>
                        <View style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{fontSize: Fonts.size.h16, color: Colors.txt_444}}
                            >{I18n.t('order_ways')}-{this._txtTicketType(order_info.ticket_type)}</Text>
                        </View>
                        <View style={{height: 1, backgroundColor: Colors.bg_f5}}/>
                        {this._viewTicketType(order_info)}
                    </View>
                </View>
                {/*订单明细*/}
                <View style={{height: 121, backgroundColor: Colors.white, paddingLeft: 17, marginTop: 5}}>

                    <View style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: Fonts.size.h16, color: Colors.txt_444}}>{I18n.t('order_msg')}</Text>
                    </View>
                    <View style={{height: 1, backgroundColor: Colors.bg_f5}}/>


                    <View style={{flex: 1}}>
                        <View
                            style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 14}}>
                            <Text style={{fontSize: 14, color: Colors.txt_666}}>{I18n.t('order_price')}</Text>
                            <Text
                                testID="txt_original_price"
                                style={{
                                    fontSize: 14, color: Colors._AAA, marginRight: 18,
                                    textDecorationLine: 'line-through'
                                }}>{order_info.original_price}</Text>
                        </View>
                        <View
                            style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 16}}>
                            <Text style={{fontSize: 14, color: Colors.txt_666}}>{I18n.t('order_pay')}</Text>
                            <Text
                                testID="txt_price"
                                style={{fontSize: 14, color: '#DF1D0F', marginRight: 18}}>{order_info.price}</Text>
                        </View>
                    </View>

                </View>
            </View>)
    };


    _viewTicketType = (order_info) => {
        const {consignee, address, mobile} = order_info;
        if (order_info.ticket_type === 'e_ticket')
            return <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
                <Text style={[{marginRight: 18}, styles.txtAdr]}>{I18n.t('order_email')}:</Text>
                <Text
                    testID="txt_email"
                    style={styles.txtAdr}>{legalValue(order_info.email)}</Text>
            </View>;
        else
            return ( <View style={{paddingTop: 10, paddingBottom: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[{marginRight: 18}, styles.txtAdr]}>{consignee}</Text>
                    <SecurityText
                        testID="txt_phone_security"
                        securityOptions={{
                            isSecurity: true,
                            startIndex: 3,
                            endIndex: 7,
                        }}
                        style={styles.txtAdr}>
                        {mobile}
                    </SecurityText>
                </View>

                <Text
                    testID="txt_adr"
                    style={[styles.txtAdr, {marginTop: 11}]}>{address}</Text>
            </View>)
    };

    _txtTicketType = (ticket_type) => {
        if (ticket_type === "e_ticket")
            return I18n.t('order_email');
        else
            return I18n.t('receive_adr')
    };

    _bottomBar = (order_info) => {

        if (!isEmptyObject(order_info) &&
            (order_info.status === 'unpaid'
            || order_info.status === 'delivered'))
            return ( <View
                activeOpacity={1}
                testID="btn_buy"
                onPress={this.props.onPress}
                style={{
                    height: 62, width: Metrics.screenWidth,
                    backgroundColor: Colors.white, flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                }}>

                {this.btnBottom(order_info)}

            </View>)
    };


    btnBottom = (order_info) => {
        switch (order_info.status) {
            case 'unpaid':
                return this._unPaid(order_info);
            case 'delivered':
                return this._paidView(order_info);
        }
    };


    _paidView = (order_info) => {
        return (<View style={styles.row}>

            <View style={{flex: 1}}/>

            <TouchableOpacity
                onPress={this._hotLine}
                activeOpacity={1}
                testID="btn_order_cancel"
                style={[styles.btnCancel, {marginRight: 15}]}>

                <Text style={styles.txtCancel}>{I18n.t('contact_customer_service')}</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btnCancel}>

                <Text style={styles.txtCancel}>{I18n.t('order_logistics')}</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btnGet}>

                <Text style={styles.txtGet}>{I18n.t('order_receipt')}</Text>

            </TouchableOpacity>

        </View>)
    }

    _unPaid = (order_info) => {
        return (<View style={styles.row}>
            <View style={{flexDirection: 'row', marginLeft: 19, alignItems: 'flex-end'}}>
                <Text style={{fontSize: 14, color: Colors.txt_666, marginRight: 5}}>{I18n.t('order_total')}: </Text>

                <Text
                    testID="txt_total_price"
                    style={{fontSize: 18, color: Colors._DF1}}>
                    {isEmptyObject(order_info) ? '' : order_info.price}</Text>
            </View>
            <View style={{flex: 1}}/>

            <TouchableOpacity
                onPress={this._orderCancel}
                activeOpacity={1}
                testID="btn_order_cancel"
                style={styles.btnCancel}>

                <Text style={styles.txtCancel}>{I18n.t('order_cancel')}</Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={this._pay}
                activeOpacity={1}
                testID="btn_order_pay"
                style={styles.btnPay}>

                <Text style={styles.txtPay}>{I18n.t('pay')}</Text>

            </TouchableOpacity>
        </View>)
    };

    _pay = () => {
        const {order_id,price} = this.props.params;
        const body = {
            order_number: order_id
        };

        postPayOrder(body, data => {
            if (this.payModal) {
                data['order_number'] = order_id;
                data['price'] = price;
                this.payModal.setPayUrl(data);
                this.payModal.toggle();
            }
        })
    }

    _user_real_call_btn = () => {
        if (user_extra.status === Verified.FAILED)
            return (<TouchableOpacity
                testID="btn_user_real"
                onPress={this._goUserReal}
                activeOpacity={1}
                style={{
                    width: 130, height: 62, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: Colors.bg_09
                }}>
                <Text style={{fontSize: 18, color: Colors.txt_E0C}}>{I18n.t('edit_real_name')}</Text>
            </TouchableOpacity>)
        else
            return (<TouchableOpacity
                testID="btn_call"
                onPress={this._hotLine}
                activeOpacity={1}
                style={{
                    width: 130, height: 62, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: Colors.bg_09
                }}>
                <Text style={{fontSize: 18, color: Colors.txt_E0C}}>{I18n.t('service_pay')}</Text>
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
                textStyle={{color: Colors.txt_666, fontSize: 17}}
                style={{
                    justifyContent: 'center', backgroundColor: Colors.white,
                    height: 49, flex: 1, marginLeft: 17, marginRight: 17, marginBottom: 17
                }}
            >
                {I18n.t('contact_customer_service')}
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
                style={{
                    width: Metrics.screenWidth,
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F56666'
                }}>
                <Text style={[Fonts.H15, {
                    color: Colors.white,
                    marginLeft: 17
                }]}>{I18n.t('order_reason')}:{user_extra.memo}</Text>
            </View>)
    };


    render() {
        const {orderDetail} = this.props;
        const {race_info, order_info, ticket} = orderDetail;

        return (
            <View
                testID="page_order_info"
                style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={() => this._refreshPage()}
                    toolbarStyle={{backgroundColor: Colors.bg_09}}
                    router={this.props.router}
                    title={orderStatus(!isEmptyObject(order_info) ? order_info.status : I18n.t('order_info'))}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={this._exitOrder}/>
                {this._userRealFail()}
                <ScrollView style={this.scrollStyle(order_info)}>
                    <View style={{height: 7}}/>
                    {/*赛事简介*/}
                    <RaceInfoView
                        ticket={ticket}
                        orderInfo={order_info}
                        disabled={false}
                        raceInfo={race_info}
                        router={this.props.router}/>
                    {this._orderView(order_info)}

                    {/*购票须知*/}
                    <View style={{backgroundColor: Colors.white, paddingLeft: 17, marginTop: 10}}>
                        <View style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{
                                fontSize: Fonts.size.h16,
                                color: Colors.txt_444
                            }}>{I18n.t('ticket_prompt')}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14, color: Colors._888, textAlign: 'left',
                            marginRight: 17, paddingBottom: 30
                        }}>
                            {I18n.t('order_known')}
                        </Text>
                    </View>

                    <View style={{height: 30}}/>


                    {this._serviceBtn(order_info)}
                </ScrollView>

                {/*底部导航栏*/}
                {this._bottomBar(order_info)}
                <PayModal
                    ref={ref => this.payModal = ref}/>
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

connect(mapStateToProps, bindAction)(OrderInfoPage);


const styles = StyleSheet.create({
    txtAdr: {
        fontSize: 15,
        color: Colors._888
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnCancel: {
        borderColor: Colors._666, borderWidth: 1, borderRadius: 3,
        alignItems: 'center', justifyContent: 'center', marginRight: 30,
        minWidth: 80
    },
    txtCancel: {
        fontSize: 14, color: Colors._666,
        margin: 10
    },
    btnPay: {
        borderColor: Colors._DF1, borderWidth: 1, borderRadius: 3,
        alignItems: 'center', justifyContent: 'center', marginRight: 17,
        minWidth: 80
    },
    txtPay: {
        fontSize: 14, color: Colors._DF1,
        margin: 10
    },
    btnGet: {
        borderRadius: 3, backgroundColor: Colors._DF1,
        alignItems: 'center', justifyContent: 'center', marginRight: 15,
        minWidth: 80
    },
    txtGet: {
        fontSize: 14, color: Colors.white,
        margin: 10
    },

});