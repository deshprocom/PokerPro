/**
 * Created by lorne on 2018/1/25
 * Function:
 * Desc:
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import UltimateFlatList from '../../../components/ultimate/index';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes/index';
import {user_crowd_orders} from '../../../services/CrowdDao';
import {CrowdStatus} from '../../../configs/Status'

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
        backgroundColor: '#FBFAFA',
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

export default class CrowdList extends PureComponent {


    render() {
        return (
            <UltimateFlatList
                arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                ref={ref => this.ultimate = ref}
                onFetch={this.onFetch}
                keyExtractor={(item, index) => `${this.props.status}${index}`}
                item={this.renderItem}
                separator={() => <View style={{height: 5, backgroundColor: Colors._ECE}}/>}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
                emptyView={() => <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>无赞助记录</Text>
                </View>}
            />
        )
    }

    onFetch = (page, postRefresh, endFetch) => {
        user_crowd_orders({page: page, page_size: 20, status: this.props.status}, data => {

            postRefresh(data, 5);

        }, err => {
            endFetch();
        });
    };

    renderItem = (item, index) => {
        const {
            crowdfunding_player,
            order_info,
            race
        } = item;
        const {order_number, record_status, order_stock_money, order_stock_number, total_money, final_price} = order_info;
        const {
            logo, name, nick_name,
        } = crowdfunding_player;

        return <TouchableOpacity
            onPress={() => global.router.toSubscriptionInfoPage(order_number)}>
            <View style={styles.view1}>
                <Text style={styles.txt_order}>{`订单编号：${order_number}`}</Text>
                <Text
                    style={[styles.txt_order, this.orderStyle(record_status)]}>{I18n.t(this._tabLabel(record_status))}</Text>
            </View>
            <View style={styles.view2}>
                <Image style={styles.avatar}
                       source={{uri: logo}}/>

                <View style={{flex: 1}}>
                    <Text style={styles.txt_name}>{`${name} (${nick_name})`}</Text>
                    <Text style={[styles.txt_order,
                        {color: Colors._888, marginTop: 11}]}>{`参与赛事：${race.name}`}</Text>

                    <View style={{flex: 1}}/>
                    <View style={styles.view3}>
                        <Text style={[styles.txt_name, {color: Colors._F34}]}>{`¥${order_stock_money}/份`}</Text>
                        <Text style={[styles.txt_name, {color: Colors.txt_444}]}>X{order_stock_number}</Text>
                    </View>

                </View>
            </View>

            <View style={styles.view4}>
                <Text style={styles.txt_order}>合计：
                    <Text style={{fontSize: 18}}>{this.total_pay(order_info)}</Text></Text>
            </View>

        </TouchableOpacity>

    };

    total_pay = (order_info) => {

        const {
            total_money,
            final_price, deduction_result
        } = order_info;
        return deduction_result === 'success' ? final_price : total_money
    }

    _tabLabel = (status) => {
        switch (status) {
            case  CrowdStatus.ALL:
                return 'all'
            case CrowdStatus.UNPUBLISHED:
                return 'unpublish'
            case CrowdStatus.SUCCESS:
                return 'success'
            case CrowdStatus.FAILED:
                return 'unsuccess'
        }
    }

    orderStyle = (record_status) => {
        switch (record_status) {
            case CrowdStatus.UNPUBLISHED:
                return {color: '#4990E2'}
            case CrowdStatus.SUCCESS:
                return {color: Colors._F34}
            case CrowdStatus.FAILED:
                return {color: Colors._666}
        }

    }


}