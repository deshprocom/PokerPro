/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,Platform,FlatList,
    StyleSheet, Image, Text,ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import PlayerItem from './PlayerItem';
import {NavigationBar} from '../../components';
import I18n from 'react-native-i18n';
import {convertDate} from '../../utils/ComonHelper';

export default class SubscriptionInfoPage extends PureComponent {
    state={
        data:{
            img:'https://cdn-upyun.deshpro.com/uploads/info/image/86/preview_44444.jpg',
            name:'马叉虫',
            join_race:'NCBP国家杯棋牌职业大师赛-Day2',
            promotion_result:'晋级失败',
            announce_time:'预计2017.08.09 17:50公布结果',
            prize_time:'预计2017.08.10 17:50',
            betting_information:'20%出让股份，划分100份',
            price_per:'每股单价',
            purchase_copies:'购买份数',
            payment:2182.8,
            rank:21,
            order_number:'34324232523',
            time:'2018-12-21   23:12'
        }
    };


    render() {
        const {img,name,join_race,promotion_result,announce_time,prize_time,betting_information
        ,price_per,purchase_copies,payment,rank,order_number} = this.state.data;
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
                        <View style={styles.result}>
                            <Text  style={styles.resultTxt}>{promotion_result}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text  style={styles.contentTxt}>{I18n.t('announce_time')}：{announce_time}</Text>
                    <Text style={[styles.contentTxt,{marginTop:5}]}>{I18n.t('prize_time')}：{prize_time}</Text>
                    <Text style={[styles.contentTxt,{marginTop:5}]}>{I18n.t('betting_information')}：{betting_information}</Text>
                </View>

                <View style={styles.orderMessage}>
                    <Text style={styles.messageTxt}>{I18n.t('order_detail')}</Text>
                    <View style={styles.order_number}>
                        <Text style={styles.numberTxt}>{I18n.t('order_num')}：{order_number}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styles.timeTxt}>{convertDate(time,'YYYY-MM-DD  mm:ss')}</Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    pageTop:{
        marginTop:1,
        paddingTop:14,
        paddingBottom:14,
        flexDirection:'row',
        backgroundColor:'white'
    },
    image:{
        width:95,
        height:120,
        marginLeft:17,
        alignItems:'flex-end',
        justifyContent:'flex-end'
    },
    imgRank:{
        width:95,
        paddingTop:2,
        paddingBottom:2,
        backgroundColor:'#000000',
        opacity:0.57,
        justifyContent:'center',
        alignItems:'center'
    },
    rankTxt:{
        fontSize:10,
        color:'#FFFFFF',
        fontWeight:'bold'
    },
    topRight:{
        flex:1,
        marginTop:2,
        marginLeft:15,
        marginRight:28,
        alignItems:'flex-start'
    },
    name:{
        fontSize:15,
        color:'#333333',
        fontWeight:'bold'
    },
    join_race:{
        fontSize:14,
        color:'#888888',
        lineHeight:18,
        marginTop:9
    },
    result:{
        width:72,
        height:24,
        marginTop:12,
        backgroundColor:'#D8D8D8',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    },
    resultTxt:{
        fontSize:14,
        color:'#FFFFFF'
    },
    content:{
        marginTop:5,
        paddingTop:16,
        paddingBottom:16,
        backgroundColor:'white'
    },
    contentTxt:{
        fontSize:14,
        color:'#333333',
        marginLeft:17,
        marginRight:17,
    },
    orderMessage:{
        marginTop:19
    },
    messageTxt:{
        fontSize:14,
        color:'#444444',
        marginLeft:17,
        marginRight:17,
        fontWeight:'bold'
    },
    order_number:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'white',
        flexDirection:'row'
    },
    numberTxt:{
        fontSize:14,
        color:'#444444'
    }




});