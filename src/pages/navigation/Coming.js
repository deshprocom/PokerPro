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
import I18n from 'react-native-i18n';
import {umengEvent} from '../../utils/UmengEvent';

export default class Coming extends Component {
    races_time = (raceInfo) => {
        if (isEmptyObject(raceInfo))
            return;
        let begin = convertDate(raceInfo.begin_date, YYYY_MM_DD);
        let end = convertDate(raceInfo.end_date, 'MM.DD');
        return begin + '-' + end;
    };

    _renderItem = ({item, index}) => {
        return (
            <View style={styles.moreTwos}>
                <View style={styles.moreTwo}>
                    <Image style={{width:101,height:143,borderRadius:3}} source={{uri: item.big_logo}}/>
                    <Text style={{fontSize:12,marginTop:8,color:'#333333'}}>{item.name}</Text>
                    <Text style={{fontSize:12,marginTop:9,color:'#888888'}}>{this.races_time(item)}</Text>
                    <Text style={{fontSize:12,marginTop:6,color:'#888888'}}>{item.location}</Text>
                </View>
            </View>
        )
    };

    render() {

        return (

            <View style={{backgroundColor:'#fff',marginTop:8}}>
                <View style={{height:20,flexDirection:'row',alignItems:'center',marginTop:14}}>
                    <View style={[styles.races]}>
                        <Text style={styles.raceText1}>{I18n.t('home_recent_races')}</Text>
                    </View>
                    <TouchableOpacity style={[styles.racesTwo,{marginLeft:245}]} onPress={() => {
                                   umengEvent('home_more');
                                router.toSearchRacesPage()
                                }}>
                        <Text style={[styles.raceText]}>{I18n.t('more')}</Text>
                        <Image style={{width:8,height:12,marginLeft:6}} source={Images.is}/>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row'}}>
                    <FlatList
                        horizontal
                        data={this.props.listRace}
                        renderItem={this._renderItem}
                        keyExtractor={(item,index)=>index}
                    />

                </View>
                <View style={{height:10}}/>
            </View>
        );
    }
}