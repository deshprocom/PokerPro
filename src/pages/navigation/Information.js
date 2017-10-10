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

export default class Information extends Component {


    _renderItem = ({item}) => {
        return (
            <View style={styles.information}>
                <View style={styles.informationTwo}>
                    <Text style={[styles.raceText,{marginTop:10}]}>单桌多桌德州扑克比赛的技巧心得—MTT技巧心得</Text>
                    <View style={{flexDirection:'row',marginTop:14}}>
                        <Text style={styles.informationText}>#中扑网</Text>
                        <Text style={[styles.informationText,{marginLeft:15}]}>时间</Text>
                    </View>

                </View>
                <View style={{width:123,height:75,backgroundColor:'red',marginLeft:15}}/>
                {/*<Image style={styles.informationImg} source={Images.icon_spot}/>*/}
            </View>
        )
    };

    render() {

        this.items = [1, 2];
        this.items2 = [1];
        return (
            <View style={{backgroundColor:'#fff',marginTop:10}}>
                <View style={{height:20,flexDirection:'row',alignItems:'center',marginTop:14}}>
                    <View style={[styles.races]}>
                        <Text style={styles.raceText1}>热门资讯</Text>
                    </View>
                    <View style={[styles.racesTwo,{marginLeft:245}]}>
                        <Text style={[styles.raceText]}>更多</Text>
                        <Image style={{width:8,height:12,marginLeft:6}} source={Images.is}/>
                    </View>
                </View>
                <View style={{width:342,height:2,marginLeft:17,backgroundColor:'#ECECEE',marginTop:13}}/>
                <View style={{flexDirection:'row'}}>
                    <FlatList

                        data={this.items}
                        renderItem={this._renderItem}
                        keyExtractor={(item,index)=>index}
                    />

                </View>
                <View style={{width:342,height:2,marginLeft:17,backgroundColor:'#ECECEE',marginTop:13}}/>
                <View style={{marginLeft:20,marginRight:23,marginTop:21}}>
                   <Text style={{fontSize:15,fontFamily:'PingFangSC-Regular',color:'#333333'}}>2017年4月在北京德扑俱乐部举行APL比赛2017年4月在北京德扑俱乐部举行APL比赛</Text>
                    <View style={{width:342,height:207,marginTop:11,backgroundColor:'red'}}/>
                </View>
                <View style={{width:342,height:2,marginLeft:17,backgroundColor:'#ECECEE',marginTop:13}}/>
                <View style={{flexDirection:'row'}}>
                    <FlatList

                        data={this.items2}
                        renderItem={this._renderItem}
                        keyExtractor={(item,index)=>index}
                    />

                </View>
            </View>
        );
    }
}