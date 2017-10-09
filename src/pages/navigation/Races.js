import React, {Component} from 'react';
import {
    View, Text, Button, Alert, DatePickIOS,
    Image, StyleSheet, ActivityIndicator,
    TouchableOpacity, ScrollView,Dimensions,
    ListView,Animated,Easing
}
    from 'react-native';
import {Images} from '../../Themes';
import {styles} from './Styles';

export default class Races extends Component{
    render(){
        return(
            <View style={{height:246,backgroundColor:'#fff',marginTop:10}}>
                <View style={{height:30,flexDirection:'row',alignItems:'center',marginTop:14}}>
                    <View style={[styles.races]}>
                        <Text style={styles.raceText1}>火热开赛</Text>
                        <Image style={{width:13,height:17,marginLeft:6}} source={Images.raceBegin}/>
                    </View>
                    <View style={styles.racesTwo}>
                        <Text style={[styles.raceText]}>更多</Text>
                        <Image style={{width:8,height:12,marginLeft:6}} source={Images.is}/>
                    </View>
                </View>
                <View style={{marginTop:30}}>

                </View>
            </View>
        );
    }
}