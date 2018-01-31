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
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {ProgressBar} from '../../components';
import I18n from 'react-native-i18n';

export default class PlayerItem extends PureComponent {
    state = {

    };

    render() {
        const {player,crowd,race} = this.props;
        const {cf_player_id,name, nick_name, logo, logo_sm, join_slogan,stock_number,
            stock_unit_price, cf_money, lairage_rate, final_rate} = player;

        return (
            <TouchableOpacity style={styles.itemPage}
                              onPress={()=>{
                global.router.toPokerInfo(crowd,player,race)
            }}>
                <Image style={styles.itemImg} source={{uri:logo}}/>

                <View style={{flex:1,marginLeft:16,marginRight:17,alignItems:'center',marginTop:3}}>
                    <View style={styles.content}>
                        <View style={styles.message}>
                            <Text style={styles.name}>{name}</Text>
                            <View style={{marginTop:7,flexDirection:'row',alignItems:'center'}}>
                                <Text style={styles.priceTxt}>{I18n.t('each_price')}：</Text><Text style={styles.price}>{stock_unit_price}元</Text>
                            </View>
                            <Text style={styles.rankMessage}>出让{final_rate}股份，股份划分{stock_number}份</Text>
                        </View>

                        <View style={{flex:1}}/>
                        <View style={styles.message2}>
                            <Text style={styles.circlePer}>{lairage_rate}</Text>
                            <Text style={styles.circleInto}>{I18n.t('into_ring_rate')}</Text>
                        </View>
                    </View>

                    <View style={[styles.content,{marginTop:25}]}>
                        <ProgressBar
                            backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                            style={{width:Metrics.screenWidth - 220,marginTop:2}}
                            initialProgress={this.props.percent}/>
                        <View style={{flex:1}}/>
                        <View style={styles.message2}>
                            <Text style={styles.finalsPer}>{final_rate}</Text>
                            <Text style={styles.finalsInto}>{I18n.t('race_rate')}</Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>


        );
    }
}


const styles = StyleSheet.create({
    itemPage: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingBottom: 15
    },
    itemImg: {
        width: 110,
        height: 139,
        marginLeft: 17
    },
    message: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    message2: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    name: {
        fontSize: 15,
        color: '#333333',
        fontWeight: 'bold'
    },
    priceTxt: {
        fontSize: 14,
        color: '#444444',
        lineHeight: 20
    },
    price: {
        fontSize: 14,
        color: '#F34A4A'
    },
    rankMessage: {
        fontSize: 12,
        color: '#888888',
        lineHeight: 20
    },
    itemRight: {
        marginTop: 16,
        marginRight: 17,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    circlePer: {
        fontSize: 18,
        color: '#4990E2',
        fontWeight: 'bold'
    },
    circleInto: {
        fontSize: 12,
        color: '#4990E2'
    },
    finalsPer: {
        fontSize: 18,
        color: '#F34A4A',
        fontWeight: 'bold',

    },
    finalsInto: {
        fontSize: 12,
        color: '#F34A4A'
    },
    content: {
        flexDirection: 'row'
    }


});