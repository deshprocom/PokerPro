import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class PokerRecord extends PureComponent {

    messageItem = (type,percent) => {
        return <View style={styles.message1}>
            <Text style={styles.txt1}>{type}</Text>
            <Text style={styles.txt2}>{percent}</Text>
        </View>
    };

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
                    {this.messageItem('买入', '¥34,344')}
                    {this.messageItem('参赛人数', 2800)}
                    {this.messageItem('奖金', '¥824,344')}
                </View>

                <View style={styles.bottomItem}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={styles.timeImg} source={Images.camera} alt=""/>
                        <Text style={styles.timeTxt}>2017.04.23-2017.05.12</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
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
        paddingTop:11,
        paddingBottom:19,
        paddingLeft:12,
        paddingRight:12,
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
        marginTop:16
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
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginTop:20,
        justifyContent:'space-around'
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
        fontWeight:'bold',
        marginTop:6
    },
    bottomItem:{
        width:'100%',
        marginTop:17,
        paddingTop:11,
        borderTopWidth:2,
        borderColor:'#ECECEE',
        borderStyle:'solid',
        flexDirection:'column',
        alignItems:'flex-start'
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