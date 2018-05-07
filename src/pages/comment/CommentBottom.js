import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import {Badge} from '../../components';
import {util, isEmptyObject} from '../../utils/ComonHelper';
import ClickComment from './ClickComment';
import InputComment from './InputComment';

export default class CommentBottom extends Component {

    static replies = 'replies';
    static RepliesReplies = 'RepliesReplies';


    state = {
        showInput: false,
        repliesShow: false,
        repliesType: '',
        comment_count: 0,
        news_info: {},
    };

    static props = {
        shareInfo:null,
    };

    _showInput = () => {

        console.log('显示输入框')
        if (isEmptyObject(global.login_user)) {
            global.router.toLoginFirstPage()
        } else {
            this.setState({
                showInput: !this.state.showInput
            })
        }

    };

    setNewsInfo = (news_info) => {
        this.setState({news_info})
    };


    userLike = (current_user_like) => {
        this.clickComment && this.clickComment.setUserLike(current_user_like)
    };


    commentTotal = (comment_count) => {
        this.setState({comment_count})
    };

    repliesBtn = (repliesItem, repliesType) => {
        if (isEmptyObject(global.login_user)) {
            global.router.toLoginFirstPage()
        } else {
            this.setState({
                repliesShow: !this.state.repliesShow,
                repliesItem: repliesItem,
                repliesType: repliesType
            })
        }
    };
    /*发送到Web数据*/
    sendMessageToWeb = (msg) => {
        this.props.sendMessage && this.props.sendMessage(msg)
    };

    render() {
        const {topic_type, url} = this.props;
        const {news_info} = this.state;

        return (
            <View style={styles.bottom}>

                <ClickComment
                    onlyComment={this.props.onlyComment}
                    topic_type={topic_type}
                    ref={ref => this.clickComment = ref}
                    _showInput={this._showInput}
                    comment_count={this.state.comment_count}
                    info_id={news_info.id}
                    sendMessageToWeb={this.sendMessageToWeb}
                    info={news_info}
                    url={url}
                    shareInfo={(shareInfo) => {
                        if (this.props.shareInfo === null)return;
                        this.props.shareInfo(shareInfo);
                    }}
                />

                {this.state.showInput ? <InputComment
                    refreshCommentInfo={this.refreshCommentInfo}
                    sendMessageToWeb={this.sendMessageToWeb}
                    topic_id={news_info.id}
                    topic_type={topic_type}
                    _showInput={this._showInput}
                    visible={this.state.showInput}/> : null}


                {this.renderRelies()}

            </View>
        );
    }


    showReplies = () => {
        this.setState({
            repliesShow: !this.state.repliesShow
        })
    };

    refreshCommentInfo = () => {
        this.props.refreshList && this.props.refreshList();
    };

    renderRelies = () => {
        const {repliesShow, repliesItem, repliesType} = this.state;
        if (repliesShow && !isEmptyObject(repliesItem)) {
            const {id, nick_name} = repliesItem;
            return <InputComment
                refreshCommentInfo={this.refreshCommentInfo}
                sendMessageToWeb={this.sendMessageToWeb}
                repliesItem={repliesItem}
                repliesName={nick_name}
                topic_id={id}
                topic_type={repliesType}
                _showInput={this.showReplies}
                visible={this.state.repliesShow}/>
        }

    }


}

const styles = StyleSheet.create({
    bottom: {
        height: 48,
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0,
        zIndex: 99,
        position: 'absolute',
        borderTopWidth: 1,
        borderTopColor: Colors._ECE
    },
    input: {
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        backgroundColor: '#ECECEE',
        borderRadius: 40,
        fontSize: 14,
        color: '#CCCCCC'
    },
    search: {
        marginLeft: 17,
        height: 30,
        width: '48%',
        backgroundColor: Colors._ECE,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchImg: {
        height: 14,
        width: 14,
        marginLeft: 15,
        marginRight: 30,
    },
    commentWhiteView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    commentWhite: {
        width: 22,
        height: 20
    },
    likeView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 31,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    like: {
        width: 20,
        height: 19
    },
    forwardView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 31,
        marginRight: 17,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    forward: {
        width: 20,
        height: 20
    },
    badge: {
        position: 'absolute',
        top: -5,
        left: '60%'
    }

});