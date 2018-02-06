/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc: 选择牌手界面
 */

import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Platform, FlatList,
    StyleSheet, Image, Text, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import PlayerItem from './PlayerItem';
import {NavigationBar} from '../../components';
import I18n from 'react-native-i18n';
import {poker_list} from '../../services/CrowdDao';
import moment from 'moment';
import {isEmptyObject} from '../../utils/ComonHelper';

export default class SelectPlayerPage extends Component {

    state = {
        pokerList: {}
    };

    componentDidMount() {
        const {crowd} = this.props.params;
        poker_list({id: crowd.id, page: 1,page_size:100}, data => {

            this.setState({
                pokerList: data
            })
        }, err => {

        })
    }

    _renderItem = (player) => {
        const {cf_total_money, cf_offer_money, race} = this.props.params.crowd;
        const {order_stock_number, stock_number} = player.item;
        let percent = 0;
        if (stock_number !== 0) {
            percent = parseFloat(order_stock_number) / stock_number;
            if(isNaN(percent)){
                percent = 0;
            }
        }

        return <View>
            <PlayerItem player={player.item}
                        percent={percent}
                        crowd={this.props.params.crowd}
                        race={race}/>
        </View>
    };
    race_time = (race) => {
        const {begin_date, end_date} = race;
        return moment(begin_date).format('YYYY.MM.DD') +  '-'  + moment(end_date).format('MM.DD')
    };
    numToW = (str) => {
        if (str.length <= 0) {
            return '0万'
        }
        let num = str.replace(/[^0-9]+/g, '');

        return num / 10000 + '万';

    };

    render() {
        const {master_image, race, cf_total_money, cf_offer_money, cf_cond} = this.props.params.crowd;
        const {players} = this.state.pokerList;
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: Colors.white}}
                    title={I18n.t('select_player')}
                    titleStyle={{color: Colors._161}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <ScrollView>
                    <View style={styles.topBar}>
                        <View style={styles.barLeft}>
                            <Text style={styles.leftTheme}>{race.name}</Text>
                            <Text style={styles.leftTxt}>{I18n.t('admission')}：¥{cf_cond}</Text>
                            <Text style={styles.leftTxt2}>{this.race_time(race)}</Text>
                            <Text style={styles.leftTxt2}>{I18n.t('address')}：{race.location}</Text>
                        </View>
                        <View style={styles.line}/>
                        <View style={{flex: 0.25, alignItems: 'flex-end',marginRight:17}}>
                            <Text style={styles.RightReward}>{this.numToW(race.prize)}</Text>
                            <Text style={styles.RightTxt}>{I18n.t('reward_circle')}</Text>
                        </View>

                    </View>

                    <View style={styles.listView}>
                        {isEmptyObject(players) ? null :
                            <FlatList
                                data={players}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => `playerList${index}`}
                                ItemSeparatorComponent={() => <View style={{height: 5, width: '100%', backgroundColor: Colors._ECE}}/>}
                            />}

                    </View>
                </ScrollView>
            </View>


        );
    }
}


const styles = StyleSheet.create({

    topBar: {
        marginTop: 5,
        backgroundColor: '#FFFFFF',
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    barLeft: {
        flex: 0.8,
        marginLeft: 17,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    line: {
        width: 2,
        height: 42,
        marginLeft: 15,
        marginRight: 22,
        backgroundColor: '#ECECEE'
    },
    barRight: {
        flex: 0.2,
        marginRight: 17,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
    },
    leftTheme: {
        fontSize: 14,
        color: '#333333',
        fontWeight: 'bold',
        lineHeight: 20
    },
    leftTxt: {
        marginTop: 7,
        fontSize: 12,
        color: '#888888'
    },
    leftTxt2: {
        marginTop: 4,
        fontSize: 12,
        color: '#888888'
    },
    RightReward: {
        fontSize: 18,
        color: '#F34A4A'
    },
    RightTxt: {
        marginTop: 3,
        fontSize: 12,
        color: '#666666'
    },
    listView: {
        marginTop: 8,
        marginBottom: 30
    }
});