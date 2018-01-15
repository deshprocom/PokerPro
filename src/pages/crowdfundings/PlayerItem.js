/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,Platform,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import { ProgressBar} from '../../components';

export default class PlayerItem extends PureComponent {


    render() {
        return (
            <View style={style.itemPage}>
                <Image style={styles.itemImg} source={Images.home_adr} alt=""/>
                <View style={styles.message}>
                    <Text style={styles.name}>刘家明</Text>
                    <View style={{marginTop:7,flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.priceTxt}>每份单价：</Text><Text style={styles.price}>100元</Text>
                    </View>
                    <Text style={styles.rankMessage}>出让20%股份，股份划分20份</Text>
                    <ProgressBar
                        backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                        style={{width: Metrics.screenWidth - 34,marginTop:42}}
                        initialProgress='20%'/>
                </View>
                <View style={{flex:1}}/>
                <View style={styles.itemRight}>
                    <Text style={styles.circlePer}>
                        13%
                    </Text>
                    <Text style={styles.circleInto}> 进圈率</Text>

                    <Text style={styles.finalsPer}> 12%</Text>
                    <Text style={styles.finalsInto}> 决赛率</Text>
                </View>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    itemPage:{
        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:15,
        paddingBottom:15
    },
    itemImg:{
        width:110,
        height:139,
        marginLeft:17
    },
    message:{
        flexDirection:'column',
        alignItems:'flex-start',
        marginLeft:16
    },
    name:{
        fontSize: 15,
        color: '#333333'
    },
    priceTxt:{
        fontSize: 14,
        color: '#444444'
    },
    price:{
        fontSize: 14,
        color: '#F34A4A'
    },
    rankMessage:{
        fontSize: 12,
        color: '#888888'
    },
    itemRight:{
        marginTop:16,
        marginRight:17,
        flexDirection:'column',
        alignItems:'flex-end',
    },
    circlePer:{
        fontSize: 18,
        color: '#4990E2',
        fontWeight:'bold'
    },
    circleInto:{
        fontSize: 12,
        color: '#4990E2'
    },
    finalsPer:{
        fontSize: 18,
        color: '#F34A4A',
        fontWeight:'bold',
        marginTop:36
    },
    finalsInto:{
        fontSize: 12,
        color: '#F34A4A'
    }


});