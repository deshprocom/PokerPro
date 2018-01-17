/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,Platform,FlatList,
    StyleSheet, Image, Text,ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import PlayerItem from './PlayerItem';
import {NavigationBar} from '../../components';
import I18n from 'react-native-i18n';

export default class SelectPlayerPage extends PureComponent {

    state = {
        data: {
            name: 'NCBP国家杯棋牌职业大师赛棋牌职业大师赛',
            reward:'800万',
            address:'北京香格里拉酒店',
            price:2000,
            begin_date:'2017.09.11',
            end_date:'2017.09.12'
        }
    };

    _renderItem=()=>{
        return <View>
            <PlayerItem/>
        </View>
    };

    render() {
        const {name,reward,address,price,begin_date,end_date} =this.state.data;
        let data = [1,2,3,4,5,6];
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
                            <Text style={styles.leftTheme}>{name}</Text>
                            <Text style={styles.leftTxt}>{I18n.t('admission')}：¥{price}</Text>
                            <Text style={styles.leftTxt2}>{begin_date}-{end_date}</Text>
                            <Text style={styles.leftTxt2}>{I18n.t('address')}：{address}</Text>
                        </View>
                        <View style={styles.line}/>
                        <View style={styles.barRight}>
                            <Text style={styles.RightReward}>{reward}</Text>
                            <Text style={styles.RightTxt}>{I18n.t('reward_circle')}</Text>
                        </View>
                    </View>

                    <View style={styles.listView}>
                        <FlatList
                            data={data}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => `playerList${index}`}
                            ItemSeparatorComponent={() => <View style={{height: 5, width: '100%', backgroundColor: Colors._ECE}}/>}
                        />
                    </View>
                </ScrollView>
            </View>


        );
    }
}


const styles = StyleSheet.create({

    topBar:{
        marginTop:5,
        backgroundColor:'#FFFFFF',
        paddingTop:15,
        paddingBottom:15,
        flexDirection:'row',
        alignItems:'flex-start'
    },
    barLeft:{
        flex: 0.8,
        marginLeft:17,
        flexDirection:'column',
        alignItems:'flex-start'
    },
    line:{
       width:2,
        height:42,
        marginLeft:15,
        marginRight:22,
        backgroundColor:'#ECECEE'
    },
    barRight:{
        flex: 0.2,
        marginRight:17,
        flexDirection:'column',
        alignItems:'flex-end',
        justifyContent:'flex-start'
    },
    leftTheme:{
        fontSize: 14,
        color: '#333333',
        fontWeight:'bold',
        lineHeight:20
    },
    leftTxt:{
        marginTop:7,
        fontSize: 12,
        color: '#888888'
    },
    leftTxt2:{
        marginTop:4,
        fontSize: 12,
        color: '#888888'
    },
    RightReward:{
        fontSize: 18,
        color: '#F34A4A'
    },
    RightTxt:{
        marginTop:3,
        fontSize: 12,
        color: '#666666'
    },
    listView:{
        marginTop:8,
        marginBottom:30
    }
});