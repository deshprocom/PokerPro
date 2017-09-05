/**
 * Created by lorne on 2017/9/5.
 */
import React, {PropTypes, Component}from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text, ScrollView, TouchableOpacity,
    InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';
import {convertDate, utcDate} from '../../utils/ComonHelper';
import {getActivities, getNotifications} from '../../services/AccountDao';

const icons = [
    require('../../../source/message/ic_order.png'),
    require('../../../source/message/ic_activity.png'),
    require('../../../source/message/ic_poker.png')
];

const titles = [
    '订单通知',
    '活动公告',
    'Poker Pro官方客服'
];

export default class MessageCenter extends Component {

    state = {
        activity: {},
        notice: {}
    };

    componentDidMount() {


        getActivities(data => {
            const {activities} = data;
            if (activities.length <= 0)
                return;

            this.setState({
                activity: activities[0]
            })
        }, err => {

        });

        getNotifications(data => {
            const {notifications} = data;
            if (notifications.length <= 0)
                return;
            this.setState({notice: notifications[0]})

        }, err => {

        })
    }

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={router}
                title={I18n.t('msg_center')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <ScrollView>
                {this._notice()}
                {this._activity()}

            </ScrollView>


        </View>)
    }


    _notice = () => {

        const {title, created_at} = this.state.notice;
        return (
            <TouchableOpacity
                onPress={() => {
                    router.toMessagePage()
                }}
                style={{backgroundColor: 'white'}}>
                <View style={styles.flatItem}>
                    <Image style={styles.msgIcon}
                           source={icons[0]}/>
                    <View style={styles.msgRed}/>
                    <View>
                        <Text style={styles.msgTitle}>{titles[0]}</Text>
                        <Text style={styles.msgDesc}>{title}</Text>
                    </View>

                    <Text style={styles.msgTime}>{utcDate(created_at, 'YYYY/MM/DD')}</Text>

                </View>
            </TouchableOpacity>)
    };

    _activity = () => {
        const {title, activity_time} = this.state.activity;
        return (
            <View style={{backgroundColor: 'white'}}>
                <View style={styles.msgLine}/>
                <View style={styles.flatItem}>
                    <Image style={styles.msgIcon}
                           source={icons[1]}/>
                    <View style={styles.msgRed}/>
                    <View>
                        <Text style={styles.msgTitle}>{titles[1]}</Text>
                        <Text style={styles.msgDesc}>{title}</Text>
                    </View>

                    <Text style={styles.msgTime}>{convertDate(activity_time, 'YYYY/MM/DD')}</Text>

                </View>
            </View>)
    };

    _poker = () => {

        return (
            <View style={{backgroundColor: 'white'}}>
                <View style={styles.msgLine}/>
                <View style={styles.flatItem}>
                    <Image style={styles.msgIcon}
                           source={icons[2]}/>
                    <View style={styles.msgRed}/>
                    <View>
                        <Text style={styles.msgTitle}>{titles[2]}</Text>
                        <Text style={styles.msgDesc}>深圳德尚</Text>
                    </View>

                    <Text style={styles.msgTime}>{convertDate('2017-09-04T00:00:00.000+08:00', 'YYYY/MM/DD')}</Text>

                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    flatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 22
    },
    msgIcon: {
        height: 54,
        width: 54,
        borderRadius: 27,
        backgroundColor: Colors._ECE,
        marginLeft: 18,
        marginRight: 22
    },
    msgTitle: {
        fontSize: 16,
        color: Colors._161
    },
    msgDesc: {
        fontSize: 14,
        color: Colors._888,
        marginTop: 10
    },
    msgTime: {
        fontSize: 12,
        color: Colors._AAA,
        position: 'absolute',
        top: 30,
        right: 10
    },
    msgLine: {
        height: 1,
        backgroundColor: Colors._ECE,
        marginLeft: 18,
    },
    msgRed: {
        height: 10,
        width: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        position: 'absolute',
        top: 25,
        left: 67
    }
});