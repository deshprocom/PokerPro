import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import PropTypes from 'prop-types';
import {getDateDiff, isEmptyObject, strNotNull} from '../../utils/ComonHelper';
import {ImageLoad} from '../../components';
import {postRepliesReplies} from '../../services/CommentDao';
import CommentBottom from "./CommentBottom";
import I18n from 'react-native-i18n';

export default class CommentItem extends PureComponent {
    state = {
        showMessage: true,
    };


    static propTypes = {
        commentType: PropTypes.string,
        item: PropTypes.object.isRequired,
        repliesReFunc: PropTypes.func
    };

    official = (nick_name) => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}}>
                <Text style={styles.name}>{nick_name}</Text>
                <View style={styles.officialView}>
                    <Text style={styles.officialTxt}>{I18n.t('official')}</Text>
                </View>
            </View>
        )
    };

    _avatar = (avatar) => {
        if (isEmptyObject(avatar))
            return Images.home_avatar;
        else if (strNotNull(avatar))
            return {uri: avatar};
        else
            return Images.home_avatar;
    };

    render() {

        const {item} = this.props;
        if (isEmptyObject(item)) {
            return <View/>
        }
        const {avatar, body, created_at, nick_name, id, official, recommended, total_count, typological, user_id} = item;

        return (
            <View style={styles.content}>
                <TouchableOpacity onPress={() => global.router.toPersonDynamic(item)}>
                    <ImageLoad style={styles.img} source={this._avatar(avatar)}/>
                </TouchableOpacity>
                <View style={styles.contentRight}>
                    <View style={styles.commentTop}>

                        {official ? this.official(nick_name) : <Text style={styles.name}>{nick_name}</Text>}

                        <View style={{flex: 1}}/>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.repliesReFunc && this.props.repliesReFunc(item, CommentBottom.RepliesReplies)
                            }}
                            style={styles.commentView}>
                            <Image style={styles.commentImg} source={Images.comment}/>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.time}>{getDateDiff(created_at)}</Text>

                    {this._repliesBody(item)}
                    {/*{this.moreMessage()}*/}
                </View>

            </View>
        )
    };


    _repliesBody = (item) => {
        const {body, parent_reply} = item;
        if (isEmptyObject(parent_reply)) {
            return <Text style={styles.messages}>{body}</Text>;
        } else {
            return <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.messages}>{I18n.t('reply')}</Text>
                <Text style={styles.nameId2}>{parent_reply.parent_reply_user}</Text>
                <Text>:{body}</Text>

            </View>
        }
    }


}
const styles = StyleSheet.create({
    content: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 6,
        paddingTop: 13
    },
    img: {
        width: 38,
        height: 38,
        borderRadius: 19,
        marginLeft: 17,
        top: -2
    },
    contentRight: {
        alignItems: 'flex-start',
        flex: 1,
        marginLeft: 11,
        marginRight: 17
    },
    name: {
        fontSize: 14,
        color: '#666666',
    },
    commentImg: {
        width: 20,
        height: 18
    },
    commentTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    time: {
        fontSize: 10,
        color: '#CCCCCC',
    },
    messages: {
        fontSize: 16,
        color: '#444444',
        marginTop: 6,
        marginBottom: 5
    },
    moreMessagesView: {
        width: '100%',
        height: 20,
        marginRight: 17,
        backgroundColor: '#ECECEE',
        alignItems: 'flex-start',
        marginTop: 10,
        justifyContent: 'center'
    },
    moreMessages: {
        fontSize: 12,
        color: '#4990E2',
        marginLeft: 11
    },
    commentView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    officialView: {
        width: 32,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#161718',
        borderRadius: 2,
        marginLeft: 5
    },
    officialBody: {
        marginTop: 6,
        marginBottom: 5
    },
    officialTxt: {
        fontSize: 10,
        color: '#FFE9AD'
    },
    nameId1: {
        fontSize: 16,
        color: '#444444',
    },
    nameId2: {
        fontSize: 16,
        color: '#4990E2',
        marginLeft: 7
    }
})