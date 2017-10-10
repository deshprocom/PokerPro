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

export default class Coming extends Component {


    _renderItem = ({item}) => {
        return (
            <View style={styles.moreTwos}>
                <View style={styles.moreTwo}>
                    <View style={{width:101,height:143,backgroundColor:'red'}}/>
                    {/*<Image source={Images.icon_spot}/>*/}
                    <Text style={{fontSize:12,marginTop:8,color:'#333333'}}>如果你无法简洁的表达你...</Text>
                    <Text style={{fontSize:12,marginTop:9,color:'#888888'}}>时间</Text>
                    <Text style={{fontSize:12,marginTop:6,color:'#888888'}}>地点</Text>
                </View>
            </View>
        )
    };

    render() {

        this.items = [1, 2, 3, 4];

        return (

            <View style={{height:274,backgroundColor:'#fff',marginTop:8}}>
                <View style={{height:20,flexDirection:'row',alignItems:'center',marginTop:14}}>
                    <View style={[styles.races]}>
                        <Text style={styles.raceText1}>即将到来</Text>
                    </View>
                    <View style={[styles.racesTwo,{marginLeft:245}]}>
                        <Text style={[styles.raceText]}>更多</Text>
                        <Image style={{width:8,height:12,marginLeft:6}} source={Images.is}/>
                    </View>
                </View>

                <View style={{flexDirection:'row'}}>
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