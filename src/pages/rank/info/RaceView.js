/**
 * Created by lorne on 2017/7/26.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {ImageLoad} from '../../../components';
import I18n from 'react-native-i18n';
import {convertDate, YYYY_MM_DD} from '../../../utils/ComonHelper';

export default class RaceView extends Component {


    _time = (begin, end) => {
        let beginDate = convertDate(begin, YYYY_MM_DD);
        let endDate = convertDate(end, YYYY_MM_DD);
        return beginDate + '-' + endDate;
    };

    render() {
        const {begin_date, end_date, logo, prize, ticket_price, location, name} = this.props.race;
        return (<View>
            {this._topView()}
            <View style={styles.page}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <ImageLoad
                        source={{uri: logo}}
                        style={styles.imgRace}/>

                    <View style={{marginLeft: 15, marginRight: 15, flex: 1}}>

                        <Text
                            numberOfLines={2}
                            style={styles.name}>{name}</Text>

                        <View style={{flex: 1}}/>
                        <View>

                            <View style={styles.viewTime}>
                                <Image
                                    source={Images.home_clock}
                                    style={{height: 11, width: 11, marginRight: 8}}/>

                                <Text style={styles.txtTime}>{this._time(begin_date, end_date)}</Text>
                            </View>
                            <View style={[styles.viewTime, {marginTop: 8}]}>
                                <Image
                                    source={Images.home_adr}
                                    style={{height: 12, width: 9, marginRight: 10}}/>

                                <Text
                                    numberOfLines={1}
                                    style={styles.txtTime}>{location}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.line}/>
                <View style={styles.viewInfo}>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_buyIn')}</Text>
                        <Text style={styles.txtTabValue}>{ticket_price}</Text>

                    </View>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_participate')}</Text>
                        <Text style={styles.txtTabValue}>$223422</Text>

                    </View>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_prize')}</Text>
                        <Text style={styles.txtTabValue}>{prize}</Text>

                    </View>

                </View>


            </View>

        </View>)
    }

    _topView = () => {
        return (<View style={styles.topBar}>

            <TouchableOpacity
                testID="btn_bar_left"
                onPress={() => router.pop()}
                style={styles.topBtn}
                activeOpacity={1}>
                <Image
                    source={Images.sign_return}
                    style={styles.topImgLeft}/>

            </TouchableOpacity>

            <TouchableOpacity
                testID="btn_bar_close"
                style={styles.topBtn}
                activeOpacity={1}>
                <Image
                    source={Images.sign_close}
                    style={styles.imgClose}/>
            </TouchableOpacity>

            <View style={{flex: 1}}/>

            <View style={styles.right}>
                <TouchableOpacity
                    testID="btn_bar_close"
                    style={styles.topBtn}
                    activeOpacity={1}>
                    <Image
                        source={Images.share}
                        style={styles.imgShare}/>
                </TouchableOpacity>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: Colors._161
    },
    topImgLeft: {
        height: 19,
        width: 11,
        marginLeft: 20,
        marginRight: 10
    },
    topBtn: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgClose: {
        height: 18,
        width: 18,
        marginLeft: 15,
        marginRight: 15
    },

    right: {
        width: 90,
        flexDirection: 'row-reverse'
    },
    imgShare: {
        height: 22,
        width: 22,
        marginRight: 20,
        marginLeft: 10
    },
    page: {
        height: 212,
        width: Metrics.screenWidth,
        backgroundColor: 'white'
    },
    imgRace: {
        height: 104,
        width: 80,
        marginLeft: 20,
        marginTop: 13
    },
    name: {
        color: Colors._333,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 17,
    },
    viewTime: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtTime: {
        color: Colors._AAA,
        fontSize: 13,
        marginRight: 17
    },
    line: {
        height: 1,
        backgroundColor: Colors._ECE,
        marginLeft: 20,
        marginRight: 17,
        marginTop: 13
    },
    viewInfo: {
        height: 80,
        width: Metrics.screenWidth,
        flexDirection: 'row'
    },
    viewItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtTabName: {
        color: Colors._AAA,
        fontSize: 12,
        fontWeight: 'bold'
    },
    txtTabValue: {
        color: Colors._888,
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 8
    },
});