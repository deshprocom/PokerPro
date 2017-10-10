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

export default class Races extends Component {


    _renderItem = ({item}) => {
        return (
            <View style={{width:317,height:160,backgroundColor:'red',marginLeft:20,flexDirection:'row'}}>
                <View style={{width:117,height:160,backgroundColor:'yellow'}}/>
                <View style={{marginLeft:20,marginRight:36}}>
                    <Text>2017扑克王杯 - 澳门站澳门展</Text>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:10,height:12}} source={Images.location}/>
                        <Text>澳门威尼斯人</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:11,height:11}} source={Images.time}/>
                        <Text>2017</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>￥20，000</Text>
                        <Text>购票</Text>
                    </View>
                </View>
            </View>
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