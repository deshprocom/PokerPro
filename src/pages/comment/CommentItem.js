import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import PropTypes from 'prop-types';

export default class CommentItem extends PureComponent {
    state={
        showMessage:true,
    };

    static propTypes = {
        releaseInfo: PropTypes.func.isRequired
    };

    moreMessage=()=>{
        if(this.state.showMessage){
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

    render() {
        return (
            <View style={styles.content}>
                <TouchableOpacity onPress={()=>{
                    this.props.releaseInfo();
                }}>
                    <Image style={styles.img} source={Images.empty_image}/>
                </TouchableOpacity>
                <View style={styles.contentRight}>
                    <View style={styles.commentTop}>
                        <Text style={styles.name}>花花公子</Text>
                        <View style={{flex:1}}/>
                        <TouchableOpacity
                            style={styles.commentView}>
                            <Image style={styles.commentImg} source={Images.comment}/>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.time}>3小时前</Text>
                    <Text style={styles.messages}>已越来越多的德扑选手参加比赛</Text>
                    {this.moreMessage()}
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    content:{
        width:'100%',
        flexDirection:'row',
        alignItems:'flex-start',
        paddingBottom:6,
        paddingTop:13
    },
    img:{
        width:38,
        height:38,
        borderRadius:19,
        marginLeft:17,
        top:-2
    },
    contentRight:{
        alignItems:'flex-start',
        flex:1,
        marginLeft:11,
        marginRight:17
    },
    name:{
        fontSize: 14,
        color: '#666666',
    },
    commentImg:{
        width:20,
        height:18
    },
    commentTop:{
        flexDirection:'row',
        alignItems:'flex-start',

    },
    time:{
        fontSize: 10,
        color: '#CCCCCC',
    },
    messages:{
        fontSize: 16,
        color: '#444444',
        marginTop:6
    },
    moreMessagesView:{
        width:'100%',
        height:20,
        marginRight:17,
        backgroundColor:'#ECECEE',
        alignItems:'flex-start',
        marginTop:10,
        justifyContent:'center'
    },
    moreMessages:{
        fontSize: 12,
        color: '#4990E2',
        marginLeft:11
    },
    commentView:{
        alignItems:'center',
        justifyContent:'center'
    }
})