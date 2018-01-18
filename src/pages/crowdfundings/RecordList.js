/**
 * Created by lorne on 2018/1/17
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import I18n from 'react-native-i18n';
import UltimateFlatList from '../../components/ultimate';

const styles = StyleSheet.create({
    view1: {
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 17,
        paddingRight: 17,
        backgroundColor: 'white'
    },
    txt_order: {
        fontSize: 14,
        color: Colors._333
    },
    view2: {
        flexDirection: 'row', paddingTop: 14, paddingBottom: 14,
        backgroundColor: Colors._ECE,
        paddingLeft: 17,
        paddingRight: 17,
    },
    avatar: {height: 120, width: 95, marginRight: 15},
    txt_name: {
        fontSize: 15,
        color: Colors._333
    },
    view3: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
    view4: {
        height: 44, flexDirection: 'row-reverse', alignItems: 'center',
        paddingLeft: 17,
        paddingRight: 17,
        backgroundColor: 'white'
    }
});

export default class RecordList extends PureComponent {

    state = {
        menu: [
            '全部', '待公布', '成功', '未公布'
        ],
        info: {
            order_no: '21345345311',
            status: 'waiting',
            name: '马叉虫（马永春）',
            avatar: 'https://wx2.sinaimg.cn/mw690/006Ey6KAly1fnk0j69gm8j30qo0qowj6.jpg',
            race_name: 'NCBP国家杯棋牌职业大师赛-Day2',
            price: '¥100／份',
            copies: 2,
            total: 1184.0

        }
    };


    render() {
        const {menu} = this.state;
        return <View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                barStyle={'dark-content'}
                toolbarStyle={{backgroundColor: 'white'}}
                leftBtnIcon={Images.mall_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 17, marginRight: 20}}
                leftBtnPress={() => router.pop()}
                titleStyle={{color: Colors._161}}
                title={'赞助记录'}/>

            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar
                    backgroundColor={Colors.white}
                    activeTextColor="#F34A4A"
                    inactiveTextColor={Colors._AAA}
                    textStyle={{fontSize: 15}}
                    tabStyle={{paddingBottom: 0}}
                    style={{borderColor: Colors._EEE, marginTop: 1, height: 44, alignItems: 'center'}}
                    underlineStyle={{backgroundColor: '#F34A4A', width: '12%', height: 2, marginLeft: '4.6%'}}/>}>
                {menu.map((item, index) => <View
                    key={index}
                    tabLabel={item}>
                    {this.renderFlat(item)}
                </View>)}


            </ScrollableTabView>

        </View>
    }

    renderFlat = (result) => {
        return <UltimateFlatList
            arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
            ref={ref => this.ultimate = ref}
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `${result}${index}`}
            item={this.renderItem}
            separator={() => <View style={{height: 5, backgroundColor: Colors._ECE}}/>}
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            waitingSpinnerText={I18n.t('loading')}
        />
    };

    onFetch = (page, postRefresh, endFetch) => {
        postRefresh([1, 2, 3, 4, 5, 6], 9)
    };

    renderItem = (item, index) => {
        const {
            order_no, status, name, avatar,
            race_name, price, copies, total
        } = this.state.info;

        return <TouchableOpacity
            onPress={() => global.router.toSubscriptionInfoPage()}>
            <View style={styles.view1}>
                <Text style={styles.txt_order}>{`订单编号：${order_no}`}</Text>
                <Text style={[styles.txt_order, this.orderStyle(status)]}>待公布</Text>
            </View>
            <View style={styles.view2}>
                <Image style={styles.avatar}
                       source={{uri: avatar}}/>
                <View style={{flex: 1}}>
                    <Text style={styles.txt_name}>{name}</Text>
                    <Text style={[styles.txt_order,
                        {color: Colors._888, marginTop: 11}]}>{`参与赛事：${race_name}`}</Text>

                    <View style={{flex: 1}}/>
                    <View style={styles.view3}>
                        <Text style={[styles.txt_name, {color: Colors._F34}]}>{price}</Text>
                        <Text style={[styles.txt_name, {color: Colors.txt_444}]}>X{copies}</Text>
                    </View>

                </View>
            </View>

            <View style={styles.view4}>
                <Text style={styles.txt_order}>合计：
                    <Text style={{fontSize: 18}}>{total}</Text></Text>
            </View>

        </TouchableOpacity>

    };

    orderStyle = (status) => {
        return {color: '#4990E2'}
    }
}