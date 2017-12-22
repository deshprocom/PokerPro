import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal, Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {Badge} from '../../components';
import {util} from '../../utils/ComonHelper';
import {NavigationBar, BaseComponent} from '../../components';
import UltimateFlatList from '../../components/ultimate';
import {getReceivedReply} from '../../services/CommentDao';
import {getDateDiff, isEmptyObject} from '../../utils/ComonHelper';
import DynamicEmpty from './DynamicEmpty';

export default class ReceivedReplyPage extends Component {
    state = {
        receivedReply: {}
    };

    componentDidMount() {

    };

    _separator = () => {
        return <View style={{height: 1, marginLeft: 14, marginRight: 17, backgroundColor: '#DDDDDD',marginBottom:16}}/>;
    };
    onFetch = (page, postRefresh, endFetch) => {
        if (page === 1) {
            let body = {user_id: global.login_user.user_id, page: 1};
            getReceivedReply(body, data => {
                console.log("receivedReply:", data);
                this.setState({
                    receivedReply: data.items
                });
                postRefresh(data.items, 3)
            }, err => {
            });

        } else {
            endFetch()
        }

    };
    official = () => {
        return (
            <View style={styles.officialView}>
                <Text style={styles.officialTxt}>{I18n.t('official')}</Text>
            </View>
        )
    };

    renderItem = (item, index) => {
        console.log("item:", item);
        const {reply_lists} = item;
        if (isEmptyObject(reply_lists)) {
            return <View/>
        }
        const {mine, other} = reply_lists[0];
        const {avatar, comment, nick_name, official, user_id, id} = other;
        return (
            <View style={styles.itemPage}>
                <Image style={styles.personImg} source={official?Images.poker_key:{uri:avatar}}/>
                <View style={styles.pageRight}>
                    <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
                        <Text style={styles.name}>{official ? I18n.t('Poker') : nick_name}</Text>
                        {official ? this.official() : null}
                        <View style={{flex:1}}/>
                        <Text style={styles.time}>2017-11-21 12:32</Text>
                    </View>
                    <View style={styles.topic}>
                        <Text style={styles.topicTxt}>{mine.comment}</Text>
                    </View>
                    <View style={styles.replyView}>
                        <Text style={styles.replyTxt1}>
                            {mine.typological_type === "reply" ? I18n.t('replied') : I18n.t('liked')}
                        </Text>
                        <Text style={styles.replyTxt2}>
                            {I18n.t('your_comment')}：
                        </Text>
                        <Text style={styles.replyTxt1}>
                            {comment}
                        </Text>
                    </View>
                </View>
            </View>
        )
    };

    render() {
        return (
            <BaseComponent style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: Colors.white}}
                    title={I18n.t('received_reply')}
                    titleStyle={{color: Colors._161}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <ScrollView style={{marginTop:7,backgroundColor:'#FFFFFF',flex:1}}>
                    <UltimateFlatList
                        arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                        ref={ref => this.ultimate = ref}
                        onFetch={this.onFetch}
                        keyExtractor={(item, index) => `replies${index}`}
                        item={this.renderItem}
                        refreshableTitlePull={I18n.t('pull_refresh')}
                        refreshableTitleRelease={I18n.t('release_refresh')}
                        dateTitle={I18n.t('last_refresh')}
                        allLoadedText={I18n.t('no_more')}
                        waitingSpinnerText={I18n.t('loading')}
                        separator={this._separator}
                    />

                </ScrollView>


            </BaseComponent>
        );
    }


}

const styles = StyleSheet.create({

    itemPage: {
        paddingTop: 13,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 15,
        marginRight: 17

    },
    personImg: {
        width: 38,
        height: 38,
        borderRadius: 19,
        marginLeft: 17
    },
    pageRight: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 11,
    },
    name: {
        fontSize: 14,
        color: '#666666'
    },
    time: {
        fontSize: 12,
        color: '#AAAAAA'
    },
    topic: {
        width: '100%',
        height: 32,
        backgroundColor: '#ECECEE',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 17
    },
    topicTxt: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 11
    },
    replyView: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    replyTxt1: {
        fontSize: 15,
        color: '#444444',
        lineHeight: 25

    },
    replyTxt2: {
        color: '#4990E2',
        fontSize: 15,
        lineHeight: 25
    },
    officialView: {
        width: 32,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#161718',
        borderRadius: 2
    },
    officialTxt: {
        fontSize: 10,
        color: '#FFE9AD',
    }
});