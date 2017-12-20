import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import PropTypes from 'prop-types';
import {getDateDiff, isEmptyObject} from '../../utils/ComonHelper';
import {ImageLoad} from '../../components';

export default class CommentItem extends PureComponent {
    state = {
        showMessage: true,
    };


    moreMessage = () => {
        if (this.state.showMessage) {
            return (
                <TouchableOpacity
                    style={styles.moreMessagesView}
                    onPress={()=>{
                        global.router.toCommentInfoPage();
                    }}>
                    <Text style={styles.moreMessages}>查看34条回复></Text>
                </TouchableOpacity>
            )
        }

    };
    official = () => {
        return (
            <View style={{flexDirection:'row',alignItems:'center',marginLeft:5}}>
                <Text style={styles.name}>{I18n.t('Poker')}</Text>
                <View style={styles.officialView}>
                    <Text style={styles.officialTxt}>官方</Text>
                </View>
            </View>
        )
    };
    officialBody = () => {
        return (
            <View style={styles.officialBody}>
                <Text style={styles.nameId1}>{I18n.t('reply')}</Text>
                <Text style={styles.nameId2}>花花</Text>
                <Text style={styles.nameId1}>：{body}</Text>
            </View>
        )
    };

    render() {
        console.log(this.props.item)
        if (isEmptyObject(this.props.item)) {
            return <View/>
        }
        const {avatar, body, created_at, nick_name, id, official, recommended, total_count, typological, user_id} = this.props.item;

        return (
            <View style={styles.content}>
                <TouchableOpacity >
                    <ImageLoad style={styles.img} source={{uri:avatar}}/>
                </TouchableOpacity>
                <View style={styles.contentRight}>
                    <View style={styles.commentTop}>

                        {official ? this.official() : <Text style={styles.name}>{nick_name}</Text>}

                        <View style={{flex:1}}/>
                        <TouchableOpacity
                            style={styles.commentView}>
                            <Image style={styles.commentImg} source={Images.comment}/>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.time}>{getDateDiff(created_at)}</Text>

                    {official ? this.officialBody() : <Text style={styles.messages}>{body}</Text>}

                    {/*{this.moreMessage()}*/}
                </View>

            </View>
        )
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
        borderRadius: 2
    },
    officialBody: {
        marginTop: 6,
        marginBottom: 5
    },
    officialTxt: {
        fontSize: 10,
        color: '#FFE9AD',
    },
    nameId1:{
        fontSize: 16,
        color: '#444444',
    },
    nameId2:{
        fontSize: 16,
        color: '#4990E2',
        marginLeft:7
    }
})