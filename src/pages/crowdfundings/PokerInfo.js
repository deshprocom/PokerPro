/**
 * Created by lorne on 2018/1/16
 * Function:
 * Desc:
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, FlatList,
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
        paddingBottom: 20,
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
            total: 20,
            headers: [
                'https://cdn-upyun.deshpro.com/uploads/player/avatar/1251/thumb_%E9%92%B1%E5%BF%97%E5%BC%BA.jpg?suffix=1499683689',
                'https://cdn-upyun.deshpro.com/uploads/player/avatar/807/thumb_%E9%99%88%E7%81%BF%E6%9E%97.png?suffix=1499399181',
                'https://cdn-upyun.deshpro.com/uploads/player/avatar/445/thumb_149032602884767500.jpg?suffix=1498635527',
                'https://cdn-upyun.deshpro.com/uploads/player/avatar/2594/thumb_%E8%B7%AF%E8%BF%AA.jpg?suffix=1501058772',
                'https://cdn-upyun.deshpro.com/uploads/player/avatar/1495/thumb_%E8%8E%AB%E5%92%8F%E8%96%87.jpg?suffix=1499681132',
                'https://cdn-upyun.deshpro.com/uploads/player/avatar/275/thumb_%E5%94%90%E5%A4%A9%E5%85%83.jpg?suffix=1498565296'

            ]

        }
    };

    render() {
        const {
            img, name, price, entry_percent, final_percent, slogan,
            buy_percent, concede_percent, share_divided, total, headers
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
                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: 12,
                    marginBottom: 8
                }}>
                    <Text style={styles.lb_slogan}>口号：</Text>
                    <Text style={styles.txt_slogan}>{slogan}</Text>
                </View>

                <ProgressBar
                    backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                    style={{width: Metrics.screenWidth - 34}}
                    initialProgress={buy_percent}/>

                <View style={styles.view_percent}>
                    {this.renderItem(concede_percent, '让出股份')}
                    {this.renderItem(share_divided, '股份划分')}
                    {this.renderItem(total, '众筹总额')}
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

        </View>
    }


    renderItem = (percent, type) => {
        return <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: Colors._F34}}>{percent}</Text>
            <Text style={{fontSize: 12, color: Colors._888, marginTop: 5}}>{type}</Text>
        </View>
    }
}


