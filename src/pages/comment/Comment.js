import React,{Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {utcDate, util} from '../../utils/ComonHelper';

export default class Comment extends PureComponent {
    state:{

    };

    _renderItem=()=>{
        return(
            <View style={styles.content}>
                <Image style={styles.img} source={{uri:Images.empty_image}}/>
                <View style={styles.contentRight}>
                    <View style={styles.commentTop}>
                        <Text style={styles.name}>花花公子</Text>
                        <View style={{flex:1}}/>
                        <TouchableOpacity
                        styles={{alignItems:'center',justifyContent:'center',padding:'10,10,10,10'}}>
                            <Image style={styles.commentImg} source={Images.comment}/>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.time}>3小时前</Text>
                    <Text style={styles.messages}>已越来越多的德扑选手参加比赛</Text>
                    <TouchableOpacity
                        style={styles.moreMessagesView}>
                        <Text style={styles.moreMessages}>查看34条回复></Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    _separator = () => {
        return <View style={{height: 0.5, marginLeft: 68, marginRight: 17, backgroundColor: '#ECECEE'}}/>;
    };

    render(){
        let dataHosts =[1,2,3,4,5,6,7,8];
        return(
            <View style={styles.page}>
                <View style={styles.top}>
                    <Text style={styles.topTxt}>全部评论（555）</Text>
                </View>
                <FlatList
                    style={{paddingTop: 6}}
                    data={dataHosts}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `comment${index}`}
                />
            </View>
        )
    }
}

const styles= StyleSheet.create({
   page:{
       backgroundColor:'#ECECEE',
       marginTop:1
   },
    top:{
       height:37,
        backgroundColor:'#FFFFFF',
        justifyContent:'center'
    },
    topTxt:{
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft:16
    },
    content:{
       flexDirection:'row',
        alignItems:'center'
    },
    img:{
       width:38,
        height:38,
        borderRadius:19,
        marginLeft:17
    },
    contentRight:{
       alignItems:'center',

    },
    name:{
        fontSize: 14,
        color: '#666666',
    },
    commentImg:{
       width:20,
        height:18,
        marginRight:17
    },
    commentTop:{
       flexDirection:'row',
        alignItems:'center',
        marginLeft:11
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
       height:20,
        marginRight:17,
        backgroundColor:'#ECECEE',
        alignItems:'center',
        marginTop:10
    },
    moreMessages:{
        fontSize: 12,
        color: '#4990E2',
        marginLeft:11
    }

});