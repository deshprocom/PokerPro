import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import {Badge} from '../../components';
import {util, isEmptyObject,sharePage} from '../../utils/ComonHelper';
import ClickComment from './ClickComment';
import InputComment from './InputComment';

export default class CommentBottom extends Component {

    state = {
        showInput: false,
        repliesShow: false
    };

    componentDidMount() {
    };

    _showInput = () => {
        if (isEmptyObject(global.login_user)) {
            global.router.toLoginFirstPage()
        } else {
            this.setState({
                showInput: !this.state.showInput
            })
        }

    };

    repliesBtn = (repliesItem) => {
        if (isEmptyObject(global.login_user)) {
            global.router.toLoginFirstPage()
        } else {
            this.setState({
                repliesShow: !this.state.repliesShow,
                repliesItem: repliesItem
            })
        }
    };

    render() {
        const {info, topic_type,webRefesh} = this.props;

        return (
            <View style={styles.bottom}>

                <ClickComment _showInput={this._showInput}
                              info_id={info.id}
                              webRefesh={webRefesh}
                                info={info}
                              />
                <InputComment
                    topic_id={info.id}
                    topic_type={topic_type}
                    _showInput={this._showInput}
                    visible={this.state.showInput}/>

                {this.renderRelies()}
            </View>
        );
    }


    showReplies = ()=>{
        this.setState({
            repliesShow: !this.state.repliesShow
        })
    };

    renderRelies = () => {
        const {repliesShow, repliesItem} = this.state;
        if (repliesShow && !isEmptyObject(repliesItem)) {
            const {id,nick_name} = repliesItem;
            return <InputComment
                repliesName={nick_name}
                topic_id={id}
                topic_type={'replies'}
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
    badge: {
        position: 'absolute',
        top: -5,
        left: '60%'
    }

});