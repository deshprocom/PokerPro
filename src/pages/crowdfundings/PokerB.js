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
        flexDirection:'row',
        alignItems:'center'
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
        marginTop:5
    }
});

export default class PokerB extends PureComponent {

    render() {
        return <View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={'扑客币'}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <View style={styles.view1}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.txt_title}>24232.23</Text>
                    <Image style={{height: 18, width: 18, marginTop: 10}} source={Images.poker_b}/>
                </View>
                <Text style={styles.txt_what}>什么是扑客币？</Text>
            </View>

            {this.renderItem()}

        </View>
    }

    renderItem = () => {
        return <View style={styles.view_item}>
            <Text style={styles.txt_name}>兑换商品</Text>
            <View style={{flex:1}}/>
            <View style={{alignItems:'flex-end'}}>
                <Text style={styles.txt_time}>2018-1-23  23:34</Text>
                <Text style={styles.txt_account}>-1000.0</Text>
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