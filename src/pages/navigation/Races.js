import React, {Component} from 'react';
import {
    View, Text, Button, Alert, DatePickIOS,
    Image, StyleSheet, ActivityIndicator,
    TouchableOpacity, ScrollView, Dimensions,
    ListView, Animated, Easing, FlatList
}
    from 'react-native';
import {Images} from '../../Themes';
import {styles} from './Styles';
import {
    isEmptyObject, YYYY_MM_DD, convertDate,
} from '../../utils/ComonHelper';

export default class Races extends Component {

    races_time = (raceInfo) => {
        if (isEmptyObject(raceInfo))
            return;
        let begin = convertDate(raceInfo.begin_date, YYYY_MM_DD);
        let end = convertDate(raceInfo.end_date, YYYY_MM_DD);
        return begin + '-' + end;
    };

    _renderItem = ({item}) => {
        return (
            <Image style={styles.oval} source={Images.oval}>
                <View style={{width:115,height:155,backgroundColor:'yellow',marginLeft:3}}/>

                <View style={{marginLeft:20,marginTop:14}}>
                    <Text
                        numberOfLines={2}
                        style={{maxWidth:160}}>2017扑克王杯 - 澳门站澳门展</Text>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:19}}>
                        <Image style={{width:10,height:12,marginRight:7}} source={Images.location}/>
                        <Text style={styles.ovalText}>澳门威尼斯人</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:9}}>
                        <Image style={{width:11,height:11,marginRight:7}} source={Images.time}/>
                        <Text style={styles.ovalText}>2017</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:25}}>
                        <Text style={styles.ovalPrice}>￥20，000</Text>
                    </View>
                    <TouchableOpacity style={{position:'absolute',top:107,
                    left:90,right:16,bottom:16}}>
                        <Image
                            style={styles.button}
                            source={Images.button}
                        >
                            <Text style={{backgroundColor:'transparent',color:'#ffffff',fontSize:14,fontWeight:'bold',marginBottom:5}}>购票</Text>
                        </Image>

                    </TouchableOpacity>
                </View>
            </Image>
        )
    };

    render() {

        this.items = [1, 2, 3, 4];

        return (
            <View style={{height:246,backgroundColor:'#fff',marginTop:10}}>
                <View style={{height:20,flexDirection:'row',alignItems:'center',marginTop:14}}>
                    <View style={[styles.races]}>
                        <Text style={styles.raceText1}>火热开赛</Text>
                        <Image style={{width:13,height:17,marginLeft:6}} source={Images.raceBegin}/>
                    </View>
                    <View style={styles.racesTwo}>
                        <Text style={[styles.raceText]}>更多</Text>
                        <Image style={{width:8,height:12,marginLeft:6}} source={Images.is}/>
                    </View>
                </View>
                <View style={{marginTop:30,flexDirection:'row'}}>
                    <FlatList
                        horizontal
                        data={this.items}
                        renderItem={this._renderItem}
                        keyExtractor={(item,index)=>index}
                    />

                </View>
            </View>
        );
    }
}