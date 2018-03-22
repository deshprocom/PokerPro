import React, {Component} from 'react';
import {
    View, Text, Button, Alert, DatePickIOS,
    Image, StyleSheet, ActivityIndicator,
    TouchableOpacity, ScrollView, Dimensions,
    ListView, Animated, Easing, FlatList, Platform
}
    from 'react-native';
import {Images} from '../../Themes';
import {styles} from './Styles';
import {
    isEmptyObject, YYYY_MM_DD, convertDate,
} from '../../utils/ComonHelper';
import I18n from 'react-native-i18n';
import {umengEvent} from '../../utils/UmengEvent';

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

            <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => global.router.toRacesInfoPage(this.props, item.race_id, false)}
                activeOpacity={1}>
                <View style={{height: 1, width: 17}}/>
                <View>
                    <Image style={styles.oval}
                           source={Images.oval}/>
                    <View style={{
                        flexDirection: 'row',
                        position: 'absolute'
                    }}>
                        <Image style={styleB.ovalImg} source={{uri: item.big_logo}}/>

                        <View style={{marginLeft: 17, marginTop: 14}}>
                            <Text
                                numberOfLines={2}
                                style={{maxWidth: 160, height: 35}}>{item.name}</Text>
                            <View style={[styleB.ovalInner, {marginTop: 19}]}>
                                <Image style={{width: 10, height: 12, marginRight: 7}} source={Images.location}/>
                                <Text style={styles.ovalText}>{item.location}</Text>
                            </View>
                            <View style={[styleB.ovalInner, {marginTop: 9}]}>
                                <Image style={{width: 11, height: 11, marginRight: 7}} source={Images.time}/>
                                <Text style={styles.ovalText}>{this.races_time(item)}</Text>
                            </View>
                            <View style={[styleB.ovalInner, {marginTop: 15}]}>
                                <Text style={styles.ovalPrice}>￥{item.min_price}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => router.toChoiseTicketPage(this.props, item.race_id)}
                                activeOpacity={1}
                                style={Platform.OS == 'ios' ? styleB.buyButtonPosition : styleB.buyButtonPosition2}>

                                <Image
                                    style={styles.button}
                                    source={Images.button}
                                />
                                <Text
                                    style={styleB.buyText}>{I18n.t('home_buy')}</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            </TouchableOpacity>
        )
    };

    render() {
        if (isEmptyObject(this.props.raceTickets)) {
            return <View/>
        }
        return (
            <View style={{backgroundColor: '#fff', marginTop: 10}}>
                <View style={styleB.ovalRace}>
                    <View style={[styles.races]}>
                        <Text style={styles.raceText1}>{I18n.t('hot_races')}</Text>
                        <Image style={{width: 13, height: 17, marginLeft: 6}} source={Images.raceBegin}/>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.racesTwo} onPress={() => {
                        umengEvent('home_ticket');
                        router.toTicketPage()
                    }}>
                        <Text style={[styles.raceText]}>{I18n.t('more')}</Text>
                        <Image style={{width: 8, height: 12, marginLeft: 6}} source={Images.is}/>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 16, flexDirection: 'row'}}>
                    {this.props.raceTickets.length > 0 ? <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={this.props.raceTickets}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index+"item"}
                    /> : null}


                </View>
                <View style={{height: 16}}/>
            </View>
        );
    }
}

const styleB = StyleSheet.create({
    ovalRace: {
        height: 20, flexDirection: 'row', alignItems: 'center', marginTop: 14
    },
    buyButtonPosition: {
        position: 'absolute', top: 105,
        left: 80, right: 16, bottom: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buyButtonPosition2: {
        position: 'absolute', top: 107,
        left: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buyText: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        position: 'absolute'
    },
    ovalImg: {
        width: 116, height: 158, marginTop: 1
    },
    ovalInner: {
        flexDirection: 'row', alignItems: 'center'
    }
})