import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {postComment, postRelaies} from '../../services/CommentDao';
import {isEmptyObject, showToast, strNotNull} from "../../utils/ComonHelper";

export default class InputComment extends Component {

    state = {
        likeButton: false,
        comment: ''
    };

    static propTypes = {
        _showInput: propTypes.func.isRequired
    };


    inputComment = () => {
        return <View>
            <Modal
                animationType={"slide"}
                transparent
                visible={this.props.visible}
                style={{flex: 1}}
            >
                <TouchableOpacity
                    onPress={() => {
                        this.props._showInput()
                    }}
                    style={styles.inputModal}>

                </TouchableOpacity>

                <View style={styles.bottom}>
                    <View style={{width: '80%', marginLeft: 5, borderWidth: 0}}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={styles.inputComment}
                            placeholder={this.txtPlaceholder()}
                            returnKeyType={'done'}
                            onChangeText={text => this.setState({
                                comment: text
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
            </Modal>
        </View>

    };

    txtCommentOrReplies = () => {
        const {topic_type} = this.props;
        return topic_type === 'replies' ? I18n.t('release') : I18n.t('comment')
    };

    txtPlaceholder = () => {
        const {topic_type, repliesName} = this.props;
        return topic_type === 'replies' ? `回复${repliesName}:` : '写下评论...'
    };

    releaseComment = () => {

        const {comment} = this.state;
        if (!strNotNull(comment)) {

            showToast('评论不能为空');
            return
        }

        const {topic_type, topic_id} = this.props;

        if (topic_type === 'replies') {
            postRelaies({
                comment_id: topic_id,
                body: comment
            }, data => {
                this.props._showInput();
                showToast('回复成功')
            }, err => {
                showToast('回复失败')
            })
        }
        let body = {
            topic_type, topic_id,
            body: comment
        };

        postComment(body, data => {
            this.props._showInput();
            showToast('评论成功');

        }, err => {
            showToast('评论失败')
        })

    };

    render() {
        return (
            this.inputComment()
        );
    }


}

const styles = StyleSheet.create({
    bottom: {
        height: 48,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0,
        zIndex: 99,
        position: 'absolute',
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
        height: 30,
        borderRadius: 15,
        paddingLeft: 20,
        fontSize: 14
    },

});