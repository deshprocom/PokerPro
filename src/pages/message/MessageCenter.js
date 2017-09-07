/**
 * Created by lorne on 2017/9/5.
 */
import React, {PropTypes, Component} from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text, ScrollView, TouchableOpacity,
    InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';
import {isEmptyObject, utcDate} from '../../utils/ComonHelper';
import {getActivities, getMsgUnRead} from '../../services/AccountDao';

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
        notice: {},
        activities: [],
        msgUnRead: 0
    };

    componentDidMount() {


        getActivities(data => {
            const {activities} = data;
            if (activities.length <= 0)
                return;

            this.setState({
                activity: activities[0],
                activities: activities
            })
        }, err => {

        });

        getMsgUnRead(data => {
            const {recent_notification, unread_count} = data;
            if (isEmptyObject(recent_notification))
                return;
            this.setState({
                notice: recent_notification,
                msgUnRead: unread_count
            })

        }, err => {

        })
    }

    render() {

        const {activity, notice, msgUnRead} = this.state;
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={router}
                title={I18n.t('msg_center')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <ScrollView>
                {this.readerItem(0, notice.title, notice.created_at, msgUnRead)}
                {this.readerItem(1, activity.title, activity.activity_time, 0)}

            </ScrollView>


        </View>)
    }


    readerItem = (index, desc, time, msgUnRead) => {


        return (
            <TouchableOpacity
                onPress={() => {
                    if (index === 0)
                        router.toMessagePage();
                    else if (index === 1)
                        router.toActivityCenter(this.props, this.state.activities)

                }}
                style={{backgroundColor: 'white'}}>
                {index !== 0 ? <View style={styles.msgLine}/> : null}
                <View style={styles.flatItem}>
                    <Image style={styles.msgIcon}
                           source={icons[index]}/>
                    {msgUnRead <= 0 ? null : <View style={styles.msgRed}/>}
                    <View>
                        <Text style={styles.msgTitle}>{titles[index]}</Text>
                        <Text style={styles.msgDesc}>{desc}</Text>
                    </View>

                    <Text style={styles.msgTime}>{utcDate(time, 'YYYY/MM/DD')}</Text>

                </View>
            </TouchableOpacity>)
    };


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
        backgroundColor: '#D0011B',
        borderRadius: 5,
        position: 'absolute',
        top: 25,
        left: 67
    }
});