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
    txt_title: {fontSize: 32, color: Colors._FFE, marginRight: 5}
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

        </View>
    }
}