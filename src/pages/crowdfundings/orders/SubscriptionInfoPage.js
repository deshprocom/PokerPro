/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput, Platform, FlatList,
    StyleSheet, Image, Text, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar, SecurityText} from '../../../components';
import I18n from 'react-native-i18n';
import {utcDate, isEmptyObject, convertDate, strNotNull, getLoginUser} from '../../../utils/ComonHelper';
import {get_crowd_info} from '../../../services/CrowdDao';
import {CrowdStatus} from '../../../configs/Status';
import {LoadingView} from '../../../components/load'

export default class SubscriptionInfoPage extends PureComponent {
    state = {
        crowd_info: {}
    };

    componentDidMount() {

        get_crowd_info(this.props.params, data => {
            this.setState({
                crowd_info: data
            })
        }, err => {

        })
    }

    result = (record_status) => {

        if (record_status === CrowdStatus.FAILED) {
            return (
                <View style={styles.result}>
                    <Text style={styles.resultTxt}>晋级失败</Text>
                </View>
            )
        } else if (record_status === CrowdStatus.UNPUBLISHED) {
            return <Text style={styles.resultTxt1}>待公布</Text>
        } else {
            return (
                <View style={styles.result2}>
                    <Text
                        style={styles.resultTxt2}>晋级成功!{'\n'}获得扑客币{this.state.crowd_info.order_info.poker_coins}</Text>


                    <TouchableOpacity style={styles.look}
                                      onPress={() => {
                                          global.router.toPokerB()
                                      }}>
                        <Text style={styles.lookTxt}>{I18n.t('look_detail')}</Text>
                    </TouchableOpacity>
                </View>
            )

        }
    };

    render() {
        const {
            crowdfunding_player
        } = this.state.crowd_info;

        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: Colors.white}}
                    title={I18n.t('subscription_info')}
                    titleStyle={{color: Colors._161}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                {isEmptyObject(crowdfunding_player) ? <LoadingView/> : this.content()}


            </View>
        );
    }


    total_pay = () => {
        const {order_info} = this.state.crowd_info;
        const {
            total_money,
            final_price, deduction_result
        } = order_info;
        return deduction_result === 'success' ? final_price : total_money
    }

    content = () => {
        const {
            crowdfunding, crowdfunding_player, order_info, race,
            user_extra
        } = this.state.crowd_info;
        const {name, logo, sell_stock, stock_number, ranking} = crowdfunding_player;
        const {publish_date, award_date} = crowdfunding;
        const {
            record_status, order_number, created_at,
            order_stock_money, order_stock_number, total_money,
            final_price, deduction_price, deduction_result
        } = order_info;

        return <ScrollView>
            <View style={styles.pageTop}>
                <View style={styles.img_viwe}>
                    <Image source={{uri: logo}} style={styles.image}/>

                    {strNotNull(ranking) ? <View style={styles.imgRank}>
                            <Text style={styles.rankTxt}>{ranking}名</Text>
                        </View> : null}


                </View>

                <View style={styles.topRight}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.join_race}>{I18n.t('join_race')}：{race.name}</Text>
                    {this.result(record_status)}

                </View>
            </View>

            <View style={styles.content}>
                <Text
                    style={styles.contentTxt}>{I18n.t('announce_time')}：预计{convertDate(publish_date, 'YYYY.MM.DD')}公布结果</Text>
                <Text
                    style={[styles.contentTxt, {marginTop: 5}]}>{I18n.t('prize_time')}：预计{convertDate(award_date, 'YYYY.MM.DD')}</Text>
                <Text
                    style={[styles.contentTxt, {marginTop: 5}]}>{`${I18n.t('betting_information')}：${sell_stock}%出让股份，划分${stock_number}份`}</Text>
            </View>

            <View style={styles.orderMessage}>
                <Text style={styles.messageTxt}>{I18n.t('order_detail')}</Text>
                <View style={styles.order_number}>
                    <Text style={styles.numberTxt}>{I18n.t('order_num')}：{order_number}</Text>
                    <View style={{flex: 1}}/>
                    <Text style={styles.timeTxt}>{utcDate(created_at, 'YYYY-MM-DD  HH:mm')}</Text>
                </View>
            </View>

            <View style={styles.orderView}>
                <View style={styles.view1}>
                    <Text style={styles.price_per}>{I18n.t('part_price')}</Text>
                    <View style={{flex: 1}}/>
                    <Text style={styles.price}>¥{order_stock_money}</Text>
                </View>
                <View style={[styles.view1, {marginTop: 6}]}>
                    <Text style={styles.price_per}>{I18n.t('purchase_copies')}</Text>
                    <View style={{flex: 1}}/>
                    <Text style={styles.price_per}>{order_stock_number}</Text>
                </View>
                {deduction_result === 'success' ? <View style={[styles.view1, {marginTop: 6}]}>
                    <Text style={styles.price_per}>{I18n.t('poker_discount')}</Text>
                    <View style={{flex: 1}}/>
                    <Text style={styles.price}>-¥{deduction_price}</Text>
                </View> : null}

            </View>

            <View style={styles.totalPrice}>
                <Text style={styles.payment}>¥{this.total_pay()}</Text>
                <Text style={styles.price_per}>{I18n.t('payment')}</Text>
            </View>


            {isEmptyObject(user_extra) ? null : <View style={{marginLeft: 17, marginRight: 17, marginTop: 17}}>
                    <Text style={styles.readTxt1}>我是投资人本人<Text
                        style={{textDecorationLine: 'underline'}}>{user_extra.real_name}</Text>，身份证号码<SecurityText
                        securityOptions={{
                        isSecurity: true,
                        startIndex: 4,
                        endIndex: 15,
                    }}>
                        {user_extra.cert_no}
                    </SecurityText>，我已认真阅读并同意
                        <Text style={{color: '#438EE6'}}
                              onPress={() => {
                              global.router.toRiskWarningPage()
                          }}>《风险提示》</Text>
                    及其他相关条款和协议，自愿认购"{race.name}"赛事众筹项目，并支付众筹款项
                    <Text style={{color: Colors._F34}}>{this.total_pay()}元</Text>。</Text>


                </View>}

        </ScrollView>
    }


}


const styles = StyleSheet.create({
    pageTop: {
        marginTop: 1,
        paddingTop: 14,
        paddingBottom: 14,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    image: {
        width: 95,
        height: 120,
        position: 'absolute'
    },
    img_viwe: {
        width: 95,
        height: 120,
        marginLeft: 17,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    imgRank: {
        width: 95,
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: '#000000',
        opacity: 0.57,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rankTxt: {
        fontSize: 10,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    topRight: {
        flex: 1,
        marginTop: 2,
        marginLeft: 15,
        marginRight: 17,
        alignItems: 'flex-start'
    },
    name: {
        fontSize: 15,
        color: '#333333',
        fontWeight: 'bold'
    },
    join_race: {
        fontSize: 14,
        color: '#888888',
        lineHeight: 18,
        marginTop: 9
    },
    result: {
        width: 72,
        height: 24,
        marginTop: 12,
        backgroundColor: '#D8D8D8',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultTxt: {
        fontSize: 14,
        color: '#FFFFFF'
    },
    content: {
        marginTop: 5,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: 'white'
    },
    contentTxt: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17,
        marginRight: 17,
    },
    orderMessage: {
        marginTop: 19
    },
    messageTxt: {
        fontSize: 14,
        color: '#444444',
        marginLeft: 17,
        marginRight: 17,
        fontWeight: 'bold'
    },
    order_number: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    numberTxt: {
        fontSize: 14,
        color: '#444444',
        marginLeft: 17
    },
    timeTxt: {
        fontSize: 12,
        color: '#AAAAAA',
        marginRight: 17
    },
    orderView: {
        marginTop: 1,
        paddingTop: 15,
        paddingBottom: 13,
        backgroundColor: 'white'
    },
    view1: {
        flexDirection: 'row',
        marginLeft: 17,
        marginRight: 17
    },
    price_per: {
        fontSize: 14,
        color: '#333333',

    },
    price: {
        fontSize: 16,
        color: '#F34A4A'
    },
    totalPrice: {
        marginTop: 1,
        paddingTop: 11,
        paddingBottom: 9,
        flexDirection: 'row-reverse',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    payment: {
        fontSize: 18,
        color: '#F34A4A',
        fontWeight: 'bold',
        marginRight: 17
    },
    readTxt1: {
        fontSize: 14,
        color: '#444444',
        lineHeight: 20
    },
    resultTxt1: {
        fontSize: 14,
        color: '#4990E2',
        marginTop: 10
    },
    result2: {
        marginTop: 10,
        justifyContent: 'space-around',
        width: '100%'
    },
    resultTxt2: {
        fontSize: 14,
        color: '#F34A4A',
        marginRight: 11,
        lineHeight: 20
    },
    look: {
        width: 58,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#979797',
        borderStyle: 'solid',
        marginTop: 5
    },
    lookTxt: {
        fontSize: 14,
        color: '#444444',
    }

});