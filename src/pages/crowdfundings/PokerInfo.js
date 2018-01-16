/**
 * Created by lorne on 2018/1/16
 * Function:
 * Desc:
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, ImageLoad, ProgressBar} from '../../components';

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
        color: Colors.txt_444,
        marginTop: 12,
        marginBottom: 8
    },
    txt_slogan: {
        fontSize: 14,
        color: Colors.txt_444
    }
});

export default class PokerInfo extends PureComponent {

    state = {
        poker: {
            img: 'https://cdn-upyun.deshpro.com/uploads/player/avatar/7/thumb_ee03c12f507b1314176cd8deca6b260e.jpg?suffix=1496305626',
            name: '李思晓',
            price: '100',
            entry_percent: '13%',
            final_percent: '12%',
            slogan: '大师赛的冠军我拿定了',
            buy_percent: 0.12,
            concede_percent: 20,
            share_divided: 200,
            total: 20

        }
    };

    render() {
        const {
            img, name, price, entry_percent, final_percent, slogan,
            buy_percent, concede_percent, share_divided, total
        } = this.state.poker;

        return <View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                toolbarStyle={{backgroundColor: Colors.white}}
                title={'李思晓'}
                titleStyle={{color: Colors._161}}
                leftBtnIcon={Images.mall_return}
                leftImageStyle={{height: 23, width: 23, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => global.router.pop()}/>
            <ImageLoad style={styles.img_poker}
                       source={{uri: img}}/>

            <View style={styles.view_info}>
                <View style={styles.view_info1}>
                    <View>
                        <Text style={styles.txt_name}>赞助牌手：{name}</Text>
                        <Text style={styles.lb_price}>每份单价：<Text style={styles.txt_price}>{price}</Text></Text>
                    </View>

                    <View style={styles.view_info2}>
                        <View style={{textAlign: 'center', marginRight: 10}}>
                            <Text style={styles.txt_entry}>{entry_percent}</Text>
                            <Text style={styles.lb_entry}>进圈率</Text>
                        </View>
                        <View style={{textAlign: 'center'}}>
                            <Text style={styles.txt_final}>{final_percent}</Text>
                            <Text style={styles.lb_final}>进圈率</Text>
                        </View>
                    </View>

                </View>
                <Text style={styles.lb_slogan}>口号：<Text style={styles.txt_slogan}>{slogan}</Text></Text>

                <ProgressBar
                    backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                    style={{width: Metrics.screenWidth - 34}}
                    initialProgress={buy_percent}/>

                <View>

                </View>
            </View>


        </View>
    }
}


