/**
 * Created by lorne on 2018/1/16
 * Function:
 * Desc:
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, FlatList,
    StyleSheet, Image, Text, Platform, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, ImageLoad, ProgressBar} from '../../components';
import IntroRecord from './IntroRecord';
import {footer} from './CrowdDetail';
import {poker_info} from '../../services/CrowdDao';

const styles = StyleSheet.create({
    img_poker: {
        height: 200,
        width: 'auto'
    },
    view_info: {
        padding: 17,
        paddingTop: 11,
        backgroundColor: 'white'

    },
    view_info1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txt_name: {
        fontSize: 15,
        color: Colors.txt_444,
        marginBottom: 5
    },
    lb_price: {
        fontSize: 14,
        color: Colors._888
    },
    txt_price: {
        fontSize: 14,
        color: Colors._F34
    },
    view_info2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt_entry: {
        fontSize: 20,
        color: '#4990E2'
    },
    lb_entry: {
        fontSize: 12,
        color: '#4990E2',
        marginTop: 5
    },
    txt_final: {
        fontSize: 20,
        color: Colors._F34
    },
    lb_final: {
        fontSize: 12,
        color: Colors._F34,
        marginTop: 5
    },
    lb_slogan: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.txt_444
    },
    txt_slogan: {
        fontSize: 14,
        color: Colors.txt_444
    },
    view_percent: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 15
    },
    view_head: {
        backgroundColor: 'white',
        paddingTop: 14,
        marginTop: 7,
        paddingBottom: 30,
        paddingLeft: 17
    },
    img_head: {
        height: 44,
        width: 44,
        borderRadius: 22,
        marginRight: 10

    }
});

export default class PokerInfo extends PureComponent {

    state = {
        poker: {}
    };

    componentDidMount() {
        const {id} = this.props.crowd;
        poker_info({id: id, page: 1}, data => {
            this.setState({
                poker: data
            })
        }, err => {

        })
    }

    render() {
        const {
            race_info, players
        } = this.state.poker;
        const {race_name, cf_cond, prize, begin_date, end_date} = race_info;
        const {name, nick_name, logo, logo_sm, join_slogan, sell_stock, stock_number, stock_unit_price, cf_money, lairage_rate, final_rate} = players;

        return <View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                toolbarStyle={{backgroundColor: Colors.white}}
                title={name}
                titleStyle={{color: Colors._161}}
                leftBtnIcon={Images.mall_return}
                leftImageStyle={{height: 23, width: 23, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => global.router.pop()}/>
            <ScrollView>
                <ImageLoad style={styles.img_poker}
                           source={{uri: logo}}/>

                <View style={styles.view_info}>
                    <View style={styles.view_info1}>
                        <View>
                            <Text style={styles.txt_name}>赞助牌手：{name}</Text>
                            <Text style={styles.lb_price}>每份单价：<Text style={styles.txt_price}>{stock_unit_price}</Text></Text>
                        </View>

                        <View style={styles.view_info2}>
                            <View style={{textAlign: 'center', marginRight: 10}}>
                                <Text style={styles.txt_entry}>{lairage_rate}</Text>
                                <Text style={styles.lb_entry}>进圈率</Text>
                            </View>
                            <View style={{textAlign: 'center'}}>
                                <Text style={styles.txt_final}>{final_rate}</Text>
                                <Text style={styles.lb_final}>进圈率</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', marginTop: 12,
                        marginBottom: 8
                    }}>
                        <Text style={styles.lb_slogan}>口号：</Text>
                        <Text style={styles.txt_slogan}>{join_slogan}</Text>
                    </View>

                    <ProgressBar
                        backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                        style={{width: Metrics.screenWidth - 34}}
                        initialProgress={buy_percent}/>

                    <View style={styles.view_percent}>
                        {this.renderItem(concede_percent, '让出股份')}
                        {this.renderItem(share_divided, '股份划分')}
                        {this.renderItem(cf_money, '众筹总额')}
                    </View>
                </View>

                <View style={styles.view_head}>
                    <Text style={[styles.txt_slogan, {marginBottom: 14, alignSelf: 'center'}]}
                    >目前已有<Text style={{color: Colors._F34}}>4</Text>人认购</Text>

                    <FlatList
                        horizontal={true}
                        data={headers}
                        renderItem={({item}) => <ImageLoad style={styles.img_head} source={{uri: item}}/>}
                        keyExtractor={(item, index) => `buy_person${index}`}/>
                </View>

                <IntroRecord/>
            </ScrollView>

            {footer()}
        </View>
    }


    renderItem = (percent, type) => {
        return <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: Colors._F34}}>{percent}</Text>
            <Text style={{fontSize: 12, color: Colors._888, marginTop: 5}}>{type}</Text>
        </View>
    }
}


