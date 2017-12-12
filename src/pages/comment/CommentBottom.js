import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import {Badge} from '../../components';
import {util} from '../../utils/ComonHelper';

export default class CommentBottom extends Component {

    state={
        text:'',
        likeButton:false
    };

    componentDidMount() {

    };

    _carts = () => {
        return <Badge style={styles.badge}>{44}</Badge>
    };


    render() {

        const {likeButton} = this.state;
        return (
            <View style={styles.bottom}>
                <View
                    style={styles.search}>
                    <Image
                        style={styles.searchImg}
                        source={Images.pen}/>

                    <TextInput
                        numberOfLines={1}
                        onChangeText={(text) => {
                            this.setState({text});
                        }}
                        placeholder={I18n.t('write_comment')}
                        placeholderTextColor="#CCCCCC"
                        multiline={false}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        returnKeyLabel={I18n.t('certain')}
                        placeholderColor={Colors._BBBB}
                        returnKeyType={'go'}/>
                </View>

                <TouchableOpacity
                    style={styles.commentWhiteView}>
                    <Image style={styles.commentWhite} source={Images.commentWhite}/>
                    {this._carts()}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.likeView}
                    onPress={()=>{
                    this.setState({likeButton:!likeButton})
                }}>
                    <Image style={styles.like} source={likeButton?Images.likeRed:Images.like}/>
                </TouchableOpacity>
                <View style={{flex:1}}/>
                <TouchableOpacity
                    style={styles.forwardView}>
                    <Image style={styles.forward} source={Images.forward}/>
                </TouchableOpacity>

            </View>
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
        position:'absolute',
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
        width: 187,
        backgroundColor: Colors._ECE,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchImg: {
        height: 14,
        width: 14,
        marginLeft: 15,
        marginRight:30,
    },
    commentWhiteView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 27,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:5,
        paddingRight:5
    },
    commentWhite: {
        width: 22,
        height: 20
    },
    likeView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 31,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:5,
        paddingRight:5
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
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:5,
        paddingRight:5
    },
    forward: {
        width: 24,
        height: 24
    },
    badge: {
        position: 'absolute',
        top:-5,
        left: '60%'
    }

});