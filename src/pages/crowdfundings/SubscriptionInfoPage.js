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
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import PlayerItem from './PlayerItem';
import {NavigationBar} from '../../components';
import I18n from 'react-native-i18n';
import {convertDate} from '../../utils/ComonHelper';

export default class SubscriptionInfoPage extends PureComponent {
    state = {
        data: {
            img: 'https://cdn-upyun.deshpro.com/uploads/info/image/86/preview_44444.jpg',
            name: '马叉虫',
            join_race: 'NCBP国家杯棋牌职业大师赛-Day2',
            promotion_result: '晋级失败',
            announce_time: '预计2017.08.09 17:50公布结果',
            prize_time: '预计2017.08.10 17:50',
            betting_information: '20%出让股份，划分100份',
            price_per: '2182.8',
            purchase_copies: 'X2',
            payment: 2182.8,
            rank: 21,
            order_number: '34324232523',
            order_time: '2018-12-21   23:12',
            resultN: 1
        }
    };

    result = () => {
        const {resultN, promotion_result} = this.state.data;
        if (resultN === 0) {
            return (
                <View style={styles.result}>
                    <Text style={styles.resultTxt}>{promotion_result}</Text>
                </View>
            )
        } else if (resultN === 1) {
            return <Text style={styles.resultTxt1}>待公布</Text>
        } else {
            return (
                <View style={styles.result2}>
                    <Text style={styles.resultTxt2}>晋级成功，获得扑客币20,000</Text>

                    <View style={styles.look}>
                        <Text style={styles.lookTxt}>{I18n.t('look_detail')}</Text>
                    </View>
                </View>
            )

        }
    };

    render() {
        const {
            img, name, join_race, promotion_result, announce_time, prize_time, betting_information
            , price_per, purchase_copies, payment, rank, order_number, order_time
        } = this.state.data;
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
                <View style={styles.pageTop}>
                    <Image source={{uri:img}} style={styles.image}>
                        <View style={styles.imgRank}>
                            <Text style={styles.rankTxt}>{rank}名</Text>
                        </View>
                    </Image>
                    <View style={styles.topRight}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.join_race}>{I18n.t('join_race')}：{join_race}</Text>
                        {this.result()}

                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentTxt}>{I18n.t('announce_time')}：{announce_time}</Text>
                    <Text style={[styles.contentTxt,{marginTop:5}]}>{I18n.t('prize_time')}：{prize_time}</Text>
                    <Text
                        style={[styles.contentTxt,{marginTop:5}]}>{I18n.t('betting_information')}：{betting_information}</Text>
                </View>

                <View style={styles.orderMessage}>
                    <Text style={styles.messageTxt}>{I18n.t('order_detail')}</Text>
                    <View style={styles.order_number}>
                        <Text style={styles.numberTxt}>{I18n.t('order_num')}：{order_number}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styles.timeTxt}>{convertDate(order_time, 'YYYY-MM-DD  mm:ss')}</Text>
                    </View>
                </View>

                <View style={styles.orderView}>
                    <View style={styles.view1}>
                        <Text style={styles.price_per}>{I18n.t('part_price')}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styles.price}>¥{price_per}</Text>
                    </View>
                    <View style={[styles.view1,{marginTop:6}]}>
                        <Text style={styles.price_per}>{I18n.t('purchase_copies')}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styles.price_per}>{purchase_copies}</Text>
                    </View>
                </View>

                <View style={styles.totalPrice}>
                    <Text style={styles.payment}>¥{payment}</Text>
                    <Text style={styles.price_per}>{I18n.t('payment')}</Text>
                </View>

                <View style={{marginLeft: 17, marginRight: 17,marginTop:17}}>
                    <Text style={styles.readTxt1}>我是投资人本人xxx，身份证号码xxxxxxxxxxxx，我已认真阅读并同意
                        <Text style={{color:'#438EE6'}}
                              onPress={()=>{
                                global.router.toRiskWarningPage()
                            }}>《风险提示》</Text>
                        及其他相关条款和协议，自愿认购xxxxxx赛事众筹项目，并支付众筹款项
                        <Text style={{color:Colors._F34}}>200.00元</Text>。</Text>

                </View>

            </View>
        );
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
        marginRight: 11
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