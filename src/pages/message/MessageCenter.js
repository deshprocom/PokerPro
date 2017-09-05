/**
 * Created by lorne on 2017/9/5.
 */
import React, {PropTypes, PureComponent}from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text, FlatList, TouchableOpacity,
    InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';
import {convertDate} from '../../utils/ComonHelper';

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

export default class MessageCenter extends PureComponent {

    state = {
        items: [1, 2, 3]
    };

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={router}
                title={I18n.t('msg_center')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <FlatList
                data={this.state.items}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index}/>

        </View>)
    }


    _renderItem = ({item, index}) => {
        const {title, activity_time} = item;
        return (
            <View style={{backgroundColor: 'white'}}>
                {index === 0 ? null : <View style={styles.msgLine}/>}
                <View style={styles.flatItem}>
                    <Image style={styles.msgIcon}
                           source={icons[index]}/>
                    <View>
                        <Text style={styles.msgTitle}>{titles[index]}</Text>
                        <Text style={styles.msgDesc}>{title}</Text>
                    </View>

                    <Text style={styles.msgTime}>{convertDate(activity_time, 'YYYY/MM/DD')}</Text>

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
        color: Colors._AAA
    },
    msgLine: {
        height: 1,
        backgroundColor: Colors._ECE,
        marginLeft: 18,
    }
});