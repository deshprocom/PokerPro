import React, {Component} from 'react';
import {
    View, Text, Button, Alert, DatePickIOS,
    Image, StyleSheet, ActivityIndicator,
    TouchableOpacity, ScrollView, Dimensions,
    ListView, Animated, Easing, FlatList
}
    from 'react-native';
import {Images} from '../../Themes';
import {
    isEmptyObject, YYYY_MM_DD, convertDate,
} from '../../utils/ComonHelper';
import I18n from 'react-native-i18n';
import {umengEvent} from '../../utils/UmengEvent';
import {RaceStatus} from "../../configs/Status"

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
            <TouchableOpacity
                onPress={() => global.router.toRacesInfoPage(this.props, item.race_id, false)}
                activeOpacity={1}
                style={styles.moreTwos}>
                <View style={styles.moreTwo}>

                    <Image style={styles.moreTwoImg} source={{uri: item.big_logo}}>
                        {(item.status === RaceStatus.go_ahead) ?
                            <Image style={styles.comingImg} source={Images.coming}/> : null}
                    </Image>

                    <Text numberOfLines={1} style={[styles.moreTwoText,{color:'#333333'}]}>{item.name}</Text>
                    <Text style={[styles.moreTwoText,{color:'#888888'}]}>{this.races_time(item)}</Text>
                    <Text style={[styles.moreTwoTextLocation,{color:'#888888'}]}>{item.location}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {

        return (

            <View style={styles.coming}>
                <View style={styles.comingInner}>
                    <View style={[styles.races]}>
                        <Text style={styles.raceText1}>{I18n.t('home_recent_races')}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={[styles.racesTwo, {marginRight: 14}]} onPress={() => {
                        umengEvent('home_more');
                        router.toSearchRacesPage()
                    }}>
                        <Text style={[styles.raceText]}>{I18n.t('more')}</Text>
                        <Image style={{width: 8, height: 12, marginLeft: 6}} source={Images.is}/>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 7}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={this.props.listRace}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index+"item"}
                    />

                </View>
                <View style={{height: 10}}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    moreTwoImg: {
        width: 101, height: 143, borderRadius: 3
    },

    moreTwoText:{
        fontSize:12,marginTop:7
    },
    moreTwoTextLocation:{
        fontSize:12,marginTop:2
    },
    coming: {
        backgroundColor: '#fff', marginTop: 8
    },
    comingInner: {
        height: 20, flexDirection: 'row', alignItems: 'center', marginTop: 14
    },
    races: {
        flexDirection: 'row',
        marginLeft: 17,
        alignItems: 'center'
    },
    raceText1: {
        fontSize: 14,
        color: '#333333',
        fontWeight: 'bold'
    },
    raceText: {
        fontSize: 14,
        color: '#333333'
    },
    racesTwo: {
        flexDirection: 'row',
        marginRight: 14,
        alignItems: 'center',
        height: 40,
        paddingLeft: 30
    },
    racesTwoRight: {
        flexDirection: 'column',
        marginLeft: 20,
        alignItems: 'center'
    },
    moreTwos: {
        marginTop: 16,
        marginLeft: 10
    },
    moreTwo: {
        width: 101,
    },
    comingImg: {
        width: 42.5,
        height: 41
    }
})