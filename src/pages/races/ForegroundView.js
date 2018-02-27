/**
 * Created by lorne on 2017/3/9.
 */
import React, { Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {raceStatusConvert, ticketStatusConvert, moneyFormat} from '../../utils/ComonHelper'
import I18n from 'react-native-i18n';


export default class ForegroundView extends Component {


    render() {
        const {raceInfo} =  this.props;
        return (      <View style={{flex:1,flexDirection:'row',
                        alignItems:'center',marginTop:60}}>
            <Image style={{height:138,width:96,
                            marginLeft:20,marginRight:20}}
                   source={{uri:raceInfo.logo}}/>
            <View style={{flex:1}}>
                {/*标题*/}
                <Text
                    testID="txt_races_title"
                    style={{fontSize:17,
                                color:Colors._E5E5,marginRight:20,
                                lineHeight:23
                              }}
                    numberOfLines={2}>{raceInfo.name}</Text>
                {/*状态标签*/}
                {this.raceTag(raceInfo)}

                {/*奖池*/}
                <View style={{flexDirection:'row',marginTop:26,
                                alignItems:'center'}}>
                    <Text style={{fontSize:14,
                                    color:Colors.txt_E0C}}>{I18n.t('prize')}</Text>
                    <Text
                        testID="txt_races_prize"
                        style={{fontSize:19,
                                    color:Colors.txt_E0C}}>{raceInfo.prize}</Text>
                </View>

            </View>

        </View>)
    }

    raceTag = (raceInfo) => {
        if (raceInfo.ticket_sellable)
            return (<View style={{marginTop:15,flexDirection:'row',alignItems:'center'}}>
                <View style={{borderRadius:2,
                                    borderWidth:0.5,borderColor:Colors._BBBB,
                                    justifyContent:'center',
                                    height:20,width:50,
                                    alignItems:'center'}}>
                    <Text
                        testID="txt_races_status"
                        style={{fontSize:10,
                                        color:Colors._BBBB}}>{raceStatusConvert(raceInfo.status)}</Text>
                </View>

                <View style={{borderRadius:2,
                                    borderWidth:0.5,borderColor:Colors._BBBB,
                                    justifyContent:'center',
                                    height:20,width:50,
                                    alignItems:'center',
                                    marginLeft:10}}>
                    <Text
                        testID="txt_races_ticket"
                        style={{fontSize:10, color:Colors._BBBB}}>
                        {ticketStatusConvert(raceInfo.ticket_status)}
                    </Text>
                </View>

            </View>)

    }
}