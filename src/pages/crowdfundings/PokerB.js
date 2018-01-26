/**
 * Created by lorne on 2018/1/17
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, FlatList,
    StyleSheet, Image, Text, Platform, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {poker_coins} from '../../services/CrowdDao';
import {isEmptyObject, convertDate} from '../../utils/ComonHelper';

const styles = StyleSheet.create({
    view1: {
        paddingTop: 30, paddingBottom: 20,
        backgroundColor: Colors.bg_09,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt_what: {fontSize: 12, color: Colors._CCC, marginTop: 26},
    txt_title: {fontSize: 32, color: Colors._FFE, marginRight: 5},
    view_item: {
        backgroundColor: 'white',
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 7,
        paddingBottom: 7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    view_item1: {
        justifyContent: 'space-between',
        alignItems: 'center', flexDirection: 'row',

    },
    txt_name: {
        fontSize: 14,
        color: Colors.txt_444
    },
    txt_time: {
        fontSize: 12,
        color: Colors._AAA
    },
    txt_account: {
        fontSize: 14,
        color: Colors._F34,
        marginTop: 5
    }
});

export default class PokerB extends PureComponent {
    state = {
        pokerB: {}
    }

    componentDidMount() {
        poker_coins({page: 1}, data => {
            console.log('pokerB:', data)
            this.setState({
                pokerB: data
            })
        }, err => {

        })
    }

    render() {
        const {total_poker_coins} = this.state.pokerB;
        var detail = [
            {'memo': '兑换商品', 'created_at': '1516936360', 'number': '1.555'},
            {'memo': '众筹成功', 'created_at': '1516936380', 'number': '-7777'},
            {'memo': '兑换商品', 'created_at': '1516953360', 'number': '0'}
        ];
        return <View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={'扑客币'}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <View style={styles.view1}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.txt_title}>{(total_poker_coins === '0.0' || total_poker_coins === '0') ? '0.00' : total_poker_coins}</Text>
                    <Image style={{height: 18, width: 18, marginTop: 10}} source={Images.poker_b}/>
                </View>
                <Text style={styles.txt_what}>什么是扑客币？</Text>
            </View>

            <FlatList
                data={detail}
                keyExtractor={(item, index) => `pokerB${index}`}
                renderItem={this.renderItem}
            />

        </View>
    }

    _coins = (number) => {
        console.log("number:",number)
        return number;
    };
    renderItem = (item) => {
        console.log(item)
        return <View style={styles.view_item}>
            <Text style={styles.txt_name}>{item.memo}</Text>
            <View style={{flex:1}}/>
            <View style={{alignItems:'flex-end'}}>
                <Text style={styles.txt_time}>{isEmptyObject(item) ? '' : convertDate(item.created_at)}</Text>
                <Text style={styles.txt_account}>{this._coins(item.number)}</Text>
            </View>
        </View>
    };

    _item = (leftStyle, left, rightStyle, right) => {
        return <View style={styles.view_item1}>
            <Text style={leftStyle}>{left}</Text>
            <Text style={rightStyle}>{right}</Text>
        </View>
    }
}