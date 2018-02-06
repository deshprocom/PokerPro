/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, ScrollView, Platform,
    StyleSheet, Image, Text
} from 'react-native';
import {NavigationBar} from '../../components';
import {Colors, Images, ApplicationStyles} from '../../Themes';
import {showToast} from '../../utils/ComonHelper';
import I18n from 'react-native-i18n';
import SubscriptionConfirmPage from './SubscriptionConfirmPage';
import {user_crowd_count} from '../../services/CrowdDao';
import {isEmptyObject} from '../../utils/ComonHelper';
import OrderBottom from '../malls/order/OrderBottom';

export default class SubscriptionPage extends PureComponent {
    state = {
        number: 1,
        order_count: 0
    };

    componentDidMount() {
        const {player, crowd} = this.props.params;

        user_crowd_count({crowdfunding_id: crowd.id, crowdfunding_player_id: player.cf_player_id},
            data => {
                this.setState(data)
            }, err => {
            })
    }


    buyQuantity = (player) => {
        let {limit_buy, stock_number} = player;
        let {number, order_count} = this.state;
        const styleCutDisable = {
            backgroundColor: '#FBFAFA'
        };
        const styleCut = {
            backgroundColor: '#F6F5F5'
        };
        let limit = limit_buy - order_count;

        return (
            <View style={styles.quantity}>
                <TouchableOpacity
                    style={[styles.buyTouch, number === 1 ? styleCutDisable : styleCut]}
                    onPress={() => {
                        if (number > 1) {
                            this.setState({number: --number})
                        }

                    }}>
                    <Image style={styles.buyImgCut} source={Images.cut}/>
                </TouchableOpacity>

                <View style={styles.buyInput}>
                    <Text>{number}</Text>
                </View>

                <TouchableOpacity
                    style={styles.buyTouch}
                    onPress={() => {

                        if (number < limit && number >= 1) {
                            this.setState({
                                number: ++number
                            })
                        } else {
                            if (limit > 0)
                                showToast(`限购${limit}份`);
                            else
                                showToast('超出限购份额')
                        }

                    }}>
                    <Image style={styles.buyImgAdd} source={Images.add}/>
                </TouchableOpacity>
            </View>
        )
    };


    total_prize = (number, stock_unit_price) => {
        if (isNaN(number) || isNaN(stock_unit_price)) {
            return 0
        }
        return number * stock_unit_price;
    };

    render() {
        const {player, crowd, verified} = this.props.params;

        const {name, logo, stock_unit_price, limit_buy, cf_player_id} = player;

        let order = {
            number: this.state.number, cf_player_id: cf_player_id, stock_unit_price: stock_unit_price,
            race_name: isEmptyObject(crowd.race) ? '' : crowd.race.name
        };

        let limit = limit_buy - this.state.order_count;
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: Colors.white}}
                    title={I18n.t('subscription')}
                    titleStyle={{color: Colors._161}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <ScrollView>

                    <View style={{flex: 1}}>

                        <View style={styles.itemPage}>
                            <Image style={{width: 95, height: 120, marginLeft: 19}}
                                   source={{uri: isEmptyObject(logo) ? '' : logo}}/>
                            <View style={styles.pageRight}>
                                <Text style={styles.name}>{name}</Text>
                                <Text style={styles.content}>{I18n.t('join_race')}：{order.race_name}</Text>
                                <View style={{flex: 1}}/>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                    <Text style={styles.priceTxt}>{I18n.t('part_price')}：</Text>
                                    <Text style={styles.price}>{stock_unit_price}元</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.buyView}>
                            <Text style={styles.txt1}>{I18n.t('purchase_copies')}（{I18n.t('limit_buy')}</Text><Text
                            style={styles.txt2}>{limit}</Text><Text style={styles.txt1}>{I18n.t('parts')}）</Text>
                            <View style={{flex: 1}}/>
                            {this.buyQuantity(player)}
                        </View>

                        <SubscriptionConfirmPage
                            order_info={order}
                            ref={ref => this.confirm = ref}
                        />

                        <View style={{height: 100}}/>
                    </View>


                </ScrollView>

                <OrderBottom
                    submitBtn={() => {
                        this.confirm && this.confirm.submitBtn()
                    }}
                    sumMoney={this.total_prize(this.state.number, stock_unit_price)}/>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    itemPage: {
        marginTop: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    pageRight: {
        flex: 1,
        marginLeft: 15,
        marginRight: 28,
        marginTop: 5
    },
    name: {
        fontSize: 15,
        color: '#333333',
        fontWeight: 'bold'
    },
    content: {
        fontSize: 14,
        color: '#888888',
        marginTop: 11

    },
    priceTxt: {
        fontSize: 14,
        color: '#444444'
    },
    price: {
        fontSize: 14,
        color: '#F34A4A'
    },
    buyView: {
        marginTop: 9,
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 17,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    txt1: {
        fontSize: 15,
        color: '#333333'
    },
    txt2: {
        fontSize: 15,
        color: '#F34A4A'
    },
    quantity: {
        marginRight: 17,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    buyTouch: {
        width: 33,
        height: 30,
        backgroundColor: '#F6F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyInput: {
        width: 38,
        height: 30,
        borderRadius: 1,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#F6F5F5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buyImgCut: {
        width: 12,
        height: 2
    },
    buyImgAdd: {
        width: 12,
        height: 12,
    },
    intro: {
        marginTop: 21,
        marginLeft: 17,
        marginRight: 17,
        paddingBottom: 80,
        alignItems: 'flex-start'
    },
    txt: {
        fontSize: 14,
        color: '#888888',
        lineHeight: 20
    }
});