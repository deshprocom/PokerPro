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

export default class Information extends Component {

    races_time = (raceInfo) => {
        if (isEmptyObject(raceInfo))
            return;
        let begin = convertDate(raceInfo.begin_date, YYYY_MM_DD);
        let end = convertDate(raceInfo.end_date, YYYY_MM_DD);
        return begin + '-' + end;
    };
    _renderItem = ({item}) => {
        if(item.source_type==='info'){
            return (
                <View style={styles.information}>
                    <View style={styles.informationTwo}>
                        <Text style={[styles.raceText,{marginTop:10}]}>{item.info.title}</Text>
                        <View style={{flexDirection:'row',marginTop:14}}>
                            <Text style={styles.informationText}>#中扑网</Text>
                            <Text style={[styles.informationText,{marginLeft:15}]}>时间</Text>
                        </View>

                    </View>
                    <View style={{width:123,height:75,marginLeft:15}}>
                        <Image style={{width:123,height:75}} source={{uri:item.info.image_thumb}}/>
                    </View>
                </View>
            )
        }else if(item.source_type==='video'){
            return (
                <View style={{marginLeft:20,marginRight:23,marginTop:21}}>
                    <Text style={{fontSize:15,fontFamily:'PingFangSC-Regular',color:'#333333'}}>{item.video.name}</Text>
                    <View style={{width:342,height:207,marginTop:11,backgroundColor:'red'}}/>
                </View>

            )
        }

    };

    render() {
        console.log("hotinfo",this.props.hotInfos)
        return (
            <View style={{backgroundColor:'#fff',marginTop:8}}>
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
                        data={this.props.hotInfos}
                        renderItem={this._renderItem}
                        keyExtractor={(item,index)=>index}
                    />

                </View>
                <View style={{width:342,height:2,marginLeft:17,backgroundColor:'#ECECEE',marginTop:13}}/>

            </View>
        );
    }
}