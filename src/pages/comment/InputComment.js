import React, {Component} from 'react';
import {
    View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal,
    KeyboardAvoidingView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {postComment, postRelaies, postRepliesReplies} from '../../services/CommentDao';
import {isEmptyObject, showToast, strNotNull} from "../../utils/ComonHelper";
import CommentBottom from "./CommentBottom";
import {WebAction} from "../../configs/Status";

export default class InputComment extends Component {

    state = {
        likeButton: false,
        comment: '',
        height: 0
    };


    inputComment = () => {
        return <View>
            <Modal
                onRequestClose={() => {

                }}
                transparent
                visible={this.props.visible}
                style={{flex: 1}}
            >
                <KeyboardAvoidingView
                    behavior={'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
                    style={{flex: 1}}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.props._showInput()
                        }}
                        style={styles.inputModal}>

                    </TouchableOpacity>

                    <View style={styles.bottom}>
                        <View style={{width: '80%', marginLeft: 5, borderWidth: 0, padding: 5}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={styles.inputComment}
                                autoGrow={true}
                                placeholder={this.txtPlaceholder()}
                                placeholderTextColor={Colors._CCC}
                                returnKeyType={'done'}
                                autoFocus={true}
                                onSubmitEditing={() => {
                                    this.releaseComment()
                                }}
                                multiline={true}
                                maxHeight={70}
                                onChangeText={comment => this.setState({
                                    comment
                                })}
                            />

                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                this.releaseComment()
                            }}
                            style={styles.release}>
                            <Text style={{color: Colors.txt_444, fontSize: 15}}>{this.txtCommentOrReplies()}</Text>
                        </TouchableOpacity>


                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>

    };

    txtCommentOrReplies = () => {
        const {topic_type} = this.props;
        return topic_type === CommentBottom.replies ||
        topic_type === CommentBottom.RepliesReplies ? I18n.t('release') : I18n.t('comment')
    };

    txtPlaceholder = () => {
        const {topic_type, repliesName} = this.props;
        return topic_type === CommentBottom.replies ||
        topic_type === CommentBottom.RepliesReplies ? `${I18n.t('reply')}` : I18n.t('write_comment')
    };

    releaseComment = () => {

        const {comment} = this.state;
        if (!strNotNull(comment)) {

            showToast(I18n.t('comment_not_empty'));
            return
        }

        const {topic_type, topic_id, repliesItem, sendMessageToWeb} = this.props;

        if (topic_type === CommentBottom.replies) {
            postRelaies({
                comment_id: topic_id,
                body: comment
            }, data => {
                this.props._showInput();
                this.props.refreshCommentInfo && this.props.refreshCommentInfo();
                showToast(I18n.t('reply_success'))
            }, err => {
                showToast(err)
            })
        } else if (topic_type === CommentBottom.RepliesReplies) {
            const {id, parent_comment} = repliesItem;
            let param = {
                comment_id: parent_comment.parent_comment_id,
                reply_id: id,
                body: comment
            };

            postRepliesReplies(param, data => {
                this.props._showInput();
                this.props.refreshCommentInfo && this.props.refreshCommentInfo();
                showToast(I18n.t('reply_success'))
            }, err => {
                showToast(err)
            })

        } else {
            let body = {
                topic_type, topic_id,
                body: comment
            };

            postComment(body, data => {
                this.props._showInput();
                showToast(I18n.t('comment_success'));

            }, err => {
                showToast(err)
            })

        }

        sendMessageToWeb && sendMessageToWeb({action: WebAction.REFRESH_COMMENT})

    };

    render() {
        return (
            this.inputComment()
        );
    }


}

const styles = StyleSheet.create({
    bottom: {
        minHeight: 48,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center'
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
    inputModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    release: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 40,
        justifyContent: 'center',
        marginRight: 17
    },
    inputComment: {
        backgroundColor: Colors._ECE,
        borderRadius: 15,
        paddingLeft: 20,
        fontSize: 14,
        minHeight: 30
    },

});