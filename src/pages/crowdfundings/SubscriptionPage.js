/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput, Platform,
    StyleSheet, Image, Text
} from 'react-native';
import {NavigationBar} from '../../components';
import {Colors, Images, ApplicationStyles} from '../../Themes';
import {showToast} from '../../utils/ComonHelper';
import I18n from 'react-native-i18n';
import SubscriptionBottom from './SubscriptionBottom';
import {crowd_order} from '../../services/CrowdDao';
import {isEmptyObject} from '../../utils/ComonHelper';

export default class SubscriptionPage extends PureComponent {
    state = {
        number: 1
    };


    buyQuantity = (player) => {
        let {limit_buy, stock_number} = player;
        let {number} = this.state;
        const styleCutDisable = {
            backgroundColor: '#FBFAFA'
        };
        const styleCut = {
            backgroundColor: '#F6F5F5'
        };


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

                        if (number < limit_buy && number >= 1) {
                            this.setState({
                                number: ++number
                            })
                        } else {
                            showToast(`限购${limit_buy}份`)
                        }

                    }}>
                    <Image style={styles.buyImgAdd} source={Images.add}/>
                </TouchableOpacity>
            </View>
        )
    };

    render() {
        const {player, race, verified} = this.props.params;
        const {sell_stock, name, logo, stock_unit_price, limit_buy, cf_player_id} = player;

        let order = {
            number: this.state.number, cf_player_id: cf_player_id, stock_unit_price: stock_unit_price,
            race_name: race.name
        };
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

                <View style={styles.itemPage}>
                    <Image style={{width: 95, height: 120, marginLeft: 19}}
                           source={{uri: isEmptyObject(logo) ? '' : logo}}/>
                    <View style={styles.pageRight}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.content}>{I18n.t('join_race')}：{race.name}</Text>
                        <View style={{flex: 1}}/>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                            <Text style={styles.priceTxt}>{I18n.t('part_price')}：</Text>
                            <Text style={styles.price}>{stock_unit_price}元</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.buyView}>
                    <Text style={styles.txt1}>{I18n.t('purchase_copies')}（{I18n.t('limit_buy')}</Text><Text
                    style={styles.txt2}>{limit_buy}</Text><Text style={styles.txt1}>{I18n.t('parts')}）</Text>
                    <View style={{flex: 1}}/>
                    {this.buyQuantity(player)}
                </View>


                <SubscriptionBottom
                    order={order}
                    verified={verified}
                />
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