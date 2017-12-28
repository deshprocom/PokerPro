import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal, Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {Badge} from '../../components';
import {NavigationBar, BaseComponent} from '../../components';
import UltimateFlatList from '../../components/ultimate';
import {getReceivedReply} from '../../services/CommentDao';
import {getDateDiff, isEmptyObject, strNotNull, utcDate} from '../../utils/ComonHelper';
import DynamicEmpty from './DynamicEmpty';

export default class ReceivedReplyPage extends Component {


    componentDidMount() {

    };

    _separator = () => {
        return <View style={{height: 1, marginLeft: 14, marginRight: 17, backgroundColor: '#DDDDDD',marginBottom:16}}/>;
    };
    onFetch = (page, postRefresh, endFetch) => {
        let body = {user_id: global.login_user.user_id, page: page, page_size: 10};
        getReceivedReply(body, data => {
            console.log("receivedReply:", data);
            postRefresh(data.items, 9);

        }, err => {
            endFetch();
        });

    };
    official = () => {
        return (
            <View style={styles.officialView}>
                <Text style={styles.officialTxt}>{I18n.t('official')}</Text>
            </View>
        )
    };

    deleteItem = (item) => {
        const {typological_type, my_comment, created_at} = item;
        return (
            <View style={styles.itemPage}>
                <Image style={styles.personImg} source={Images.poker_key}/>
                <View style={styles.pageRight}>
                    <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
                        <Text style={styles.name}>{I18n.t('Poker')}</Text>
                        <View style={{flex:1}}/>
                        <Text style={styles.time}>{utcDate(created_at, 'YYYY-MM-DD HH:mm')}</Text>
                    </View>
                    <Text style={styles.topicTxt}>{I18n.t('bad_message')}</Text>
                    <View style={styles.replyView}>
                        <Text style={styles.replyTxt1}>
                            {I18n.t('already_delete')}
                        </Text>
                        <Text style={styles.replyTxt2}>
                            {I18n.t('your_comment')}：
                        </Text>
                        <Text style={styles.replyTxt1}>
                            {my_comment}
                        </Text>
                    </View>
                </View>
            </View>
        )
    };
    _avatar = (avatar) => {
        if (isEmptyObject(avatar))
            return Images.home_avatar;
        else if (strNotNull(avatar))
            return {uri: avatar}
        else
            return Images.home_avatar;
    };

    reply = (item) => {
        const {mine, other} = item;
        const {avatar, comment, nick_name, official, user_id, id} = other;
        return (
            <View style={styles.itemPage}>
                <Image style={styles.personImg} source={official?Images.set_poker:this._avatar(avatar)}/>
                <View style={styles.pageRight}>
                    <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
                        <Text style={styles.name}>{official ? I18n.t('Poker') : nick_name}</Text>
                        {official ? this.official() : null}
                        <View style={{flex:1}}/>
                        <Text style={styles.time}>{utcDate(mine.created_at, 'YYYY-MM-DD HH:mm')}</Text>
                    </View>
                    <View style={styles.topic}>
                        <Text style={styles.topicTxt}>{mine.comment}</Text>
                    </View>
                    <View style={styles.replyView}>
                        <Text style={styles.replyTxt1}>
                            {item.type === "reply" ? I18n.t('replied') : I18n.t('liked')}
                        </Text>
                        <Text style={styles.replyTxt2}>
                            {I18n.t('your_comment')}：
                        </Text>
                        <Text singleLine={true} style={styles.replyTxt1}>
                            {comment}
                        </Text>
                    </View>
                </View>
            </View>
        )
    };

    renderItem = (item, index) => {
        const {type} = item;
        if (type === "delete") {

            return this.deleteItem(item);

        } else if (type === "reply") {
            return this.reply(item);

        } else {
            return this.reply(item);
        }

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
                    leftImageStyle={{height: 23, width: 23, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <View style={{backgroundColor:'#FFFFFF',flex:1}}>
                    <UltimateFlatList
                        header={()=><View style={{height:7,width:'100%',backgroundColor:'#ECECEE'}}/>}
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
                        emptyView={() => <DynamicEmpty/>}
                    />

                </View>


            </BaseComponent>
        );
    }


}

const styles = StyleSheet.create({

    itemPage: {
        paddingTop: 13,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 30,
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
        minHeight: 32,
        backgroundColor: '#ECECEE',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 17,
        paddingTop: 5,
        paddingBottom: 5

    },
    topicTxt: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 11,
        marginRight: 8
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
        lineHeight: 20

    },
    replyTxt2: {
        color: '#4990E2',
        fontSize: 15,
        lineHeight: 20
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