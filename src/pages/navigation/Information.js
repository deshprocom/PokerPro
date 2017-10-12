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
import {VideoPlayer} from '../../components';
import I18n from 'react-native-i18n';

export default class Information extends Component {

    races_time = (raceInfo) => {
        if (isEmptyObject(raceInfo))
            return;
        let begin = convertDate(raceInfo.begin_date, YYYY_MM_DD);
        let end = convertDate(raceInfo.end_date, YYYY_MM_DD);
        return begin + '-' + end;
    };
    _renderItem = ({item}) => {
        if (item.source_type == 'info') {
            return (
                <TouchableOpacity
                    onPress={() => router.toNewsInfoPage(this.props, item.info)}
                    style={styles.information}>
                    <View style={styles.informationTwo}>
                        <Text style={[styles.raceText, {marginTop: 10}]}>{item.info.title}</Text>
                        <View style={{flexDirection: 'row', marginTop: 14}}>
                            <Text style={styles.informationText}>#中扑网</Text>
                            <Text style={[styles.informationText, {marginLeft: 15}]}>时间</Text>
                        </View>

                    </View>
                    <View style={{width: 123, height: 75, marginLeft: 15}}>
                        <Image style={{width: 123, height: 75}} source={{uri: item.info.image_thumb}}/>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.source_type == 'video') {
            return (
                <View style={{marginLeft: 20, marginRight: 23, marginTop: 21}}>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'PingFangSC-Regular',
                        color: '#333333'
                    }}>{item.video.name}</Text>

                    <TouchableOpacity
                        onPress={() => router.toVideoInfoPage(this.props, item.video)}
                        style={{height: 207, marginTop: 11}}>
                        <Image style={{height: 207, alignItems: 'center', justifyContent: 'center'}}
                               source={{uri: item.video.cover_link.trim()}}>
                            <Image style={{width: 70, height: 70}} source={Images.begin}/>
                        </Image>
                    </TouchableOpacity>
                </View>

            )
        }

    };

    render() {
        console.log('hotInfos', this.props.hotInfos)
        return (
            <View style={{backgroundColor: '#fff', marginTop: 8}}>
                <View style={{height: 20, flexDirection: 'row', alignItems: 'center', marginTop: 14}}>
                    <View style={[styles.races]}>
                        <Text style={styles.raceText1}>{I18n.t('hot_infos')}</Text>
                    </View>
                    <View style={{flex:1}}/>
                    <View style={[styles.racesTwo, {marginRight:14}]}>
                        <Text style={[styles.raceText]}>{I18n.t('more')}</Text>
                        <Image style={{width: 8, height: 12, marginLeft: 6}} source={Images.is}/>
                    </View>
                </View>
                <View style={{width: "100%", height: 2, marginLeft: 17, backgroundColor: '#ECECEE', marginTop: 13}}/>
                <View style={{flexDirection: 'row'}}>
                    <FlatList
                        data={this.props.hotInfos}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index}
                    />

                </View>
                <View style={{width: 342, height: 2, marginLeft: 17, backgroundColor: '#ECECEE', marginTop: 13}}/>

            </View>
        );
    }
}