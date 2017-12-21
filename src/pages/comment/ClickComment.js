import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {Badge} from '../../components';
import {util} from '../../utils/ComonHelper';
import {postNewLikes} from '../../services/CommentDao';
import {sharePage} from '../../utils/ComonHelper';

export default class ClickComment extends Component {

    state = {
        text: ''
    };
    static propTypes = {
        _showInput: propTypes.func.isRequired,
        comment_count: propTypes.number
    };


    _carts = () => {
        const {comment_count} = this.props;
        if (comment_count && comment_count > 0)
            return <Badge style={styles.badge}>{comment_count}</Badge>
    };

    likeChang = () => {
        postNewLikes({info_id: this.props.info_id}, data => {

            this.props.webRefesh && this.props.webRefesh();
            console.log("newsLikes")
        }, err => {
        });
        // this.props.webRefesh();

    };

    likeShare = () => {
        const {current_user_like} = this.props;
        return (
            <View style={{flexDirection: 'row', flex: 1, marginRight: 17}}>
                <TouchableOpacity
                    style={styles.search}
                    onPress={() => {
                        this.props._showInput()
                    }}>
                    <Image
                        style={styles.searchImg}
                        source={Images.pen}/>
                    <Text style={styles.input}>{I18n.t('write_comment')}</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.commentWhiteView}>
                    <Image style={styles.commentWhite} source={Images.commentWhite}/>
                    {this._carts()}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.likeView}
                    onPress={()=>{
                    this.likeChang()
                }}>
                    <Image style={styles.like} source={current_user_like?Images.likeRed:Images.like}/>

                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    style={styles.forwardView}
                    onPress={()=>{
                    const{title,date,image_thumb,id} = this.props.info;
                    sharePage(title,date,image_thumb,"news/" + id)
                }}>
                    <Image style={styles.forward} source={Images.forward}/>
                </TouchableOpacity>
            </View>
        )
    };

    render() {
        return (
            this.likeShare()
        );
    }


}

const styles = StyleSheet.create({

    input: {
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
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
        marginRight: 10,
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