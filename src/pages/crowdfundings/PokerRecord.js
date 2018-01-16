import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class PokerRecord extends PureComponent {

    render(){
        return(
            <View style={styles.itemView}>
                <View style={styles.itemRank}>
                    <Text style={styles.rankName}>2017年扑克王杯</Text>
                    <View style={{flex:1}}/>
                    <View style={styles.rank}>
                        <Text style={styles.rankTxt}>第12名</Text>
                    </View>
                </View>

                <View style={styles.message}>
                    <View style={styles.message1}>
                        <Text style={styles.txt1}>买入</Text>
                        <Text style={styles.txt2}>¥34,344</Text>
                    </View>
                    <View style={styles.message1}>
                        <Text style={styles.txt1}>参赛人数</Text>
                        <Text style={styles.txt2}>2800</Text>
                    </View>
                    <View style={styles.message1}>
                        <Text style={styles.txt1}>奖金</Text>
                        <Text style={styles.txt2}>¥824,344</Text>
                    </View>
                </View>

                <View style={styles.bottom}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={styles.timeImg} source={Images.camera} alt=""/>
                        <Text style={styles.timeTxt}>2017.04.23-2017.05.12</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={styles.locImg} source={Images.camera} alt=""/>
                        <Text style={styles.timeTxt}>澳大利亚墨尔本皇冠娱乐场澳大是寿...</Text>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemView:{
        width:'100%',
        height:194,
        marginLeft:7,
        marginRight:7,
        borderWidth:1,
        borderRadius:4,
        borderColor:'#ECECEE',
        borderStyle:'solid',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    },
    itemRank:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:16,
        marginLeft:12,
        marginRight:12
    },
    rankName:{
        fontSize:15,
        fontWeight:'bold',
        color:'#333333'
    },
    rank:{
        width:58,
        height:23,
        backgroundColor:'#F34A4A',
        borderRadius:32,
        justifyContent:'center',
        alignItems:'center'
    },
    rankTxt:{
        fontSize:13,
        color:'#FFFFFF'
    },
    message:{
        marginLeft:12,
        marginRight:12,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:20
    },
    message1:{
        flexDirection:'column',
        alignItems:'center'
    },
    txt1:{
        fontSize:12,
        color:'#AAAAAA'
    },
    txt2:{
        fontSize:15,
        color:'#666666',
        fontWeight:'bold'
    },
    bottom:{
        marginTop:17,
        marginLeft:12,
        marginRight:12,
        borderTopWidth:3,
        borderColor:'#ECECEE',
        borderStyle:'solid',
        paddingTop:11,
        paddingBottom:19,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    timeImg:{
        width:8,
        height:11
    },
    locImg:{
        width:10,
        height:10
    },
    timeTxt:{
        fontSize:13,
        color:'#666666',
        marginLeft:8
    }

})