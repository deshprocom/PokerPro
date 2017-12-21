import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal, Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {Badge} from '../../components';
import {util} from '../../utils/ComonHelper';
import {NavigationBar, BaseComponent} from '../../components';
import UltimateFlatList from '../../components/ultimate';
import {getPersonDynamics} from '../../services/CommentDao';
import {getDateDiff, isEmptyObject} from '../../utils/ComonHelper';
import DynamicEmpty from './DynamicEmpty';

export default class ReceivedReply extends Component {
    state = {

    };

    componentDidMount() {

    };

    _separator = () => {
        return <View style={{height: 1, marginLeft: 14, marginRight: 17, backgroundColor: '#DDDDDD',marginBottom:16}}/>;
    };
    onFetch = (page, postRefresh, endFetch) => {
        if (page === 1) {
            postRefresh([1,2,3,4,5,6],3)
        } else {
            endFetch()
        }

    };

    renderItem = () => {
        return (
            <View style={styles.itemPage}>
                <Image style={styles.personImg} source={Images.business}/>
                <View style={styles.pageRight}>
                    <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
                        <Text style={styles.name}>花花公子</Text>
                        <View style={{flex:1}}/>
                        <Text style={styles.time}>2017-11-21 12:32</Text>
                    </View>
                    <View style={styles.topic}>
                        <Text style={styles.topicTxt}>请不要说脏话谢谢</Text>
                    </View>
                    <View style={styles.replyView}>
                        <Text style={styles.replyTxt1}>
                            回复了
                        </Text>
                        <Text style={styles.replyTxt2}>
                            你的评论：
                        </Text>
                        <Text style={styles.replyTxt1}>
                            已越来越多的德扑选手加比赛德尚发生的发生dhiayedhoyropdjq9rfj
                        </Text>
                    </View>
                </View>
            </View>
        )
    };

    render() {
        return (
            <BaseComponent style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: Colors.white}}
                    title={I18n.t('received_reply')}
                    titleStyle={{color: Colors._161}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <ScrollView style={{marginTop:7,backgroundColor:'#FFFFFF',flex:1}}>
                    <UltimateFlatList
                        arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                        ref={ref => this.ultimate = ref}
                        onFetch={this.onFetch}
                        keyExtractor={(item, index) => `replies${index}`}
                        item={this.renderItem}
                        refreshableTitlePull={I18n.t('pull_refresh')}
                        refreshableTitleRelease={I18n.t('release_refresh')}
                        dateTitle={I18n.t('last_refresh')}
                        allLoadedText={I18n.t('no_more')}
                        waitingSpinnerText={I18n.t('loading')}
                        separator={this._separator}
                    />

                </ScrollView>


            </BaseComponent>
        );
    }


}

const styles = StyleSheet.create({

    itemPage:{
        paddingTop:13,
        flexDirection:'row',
        alignItems:'flex-start',
        paddingBottom:15,
        marginRight:17

    },
    personImg:{
        width:38,
        height:38,
        borderRadius:19,
        marginLeft:17
    },
    pageRight:{
        flex:1,
        flexDirection:'column',
        alignItems:'flex-start',
        marginLeft:11,
    },
    name:{
        fontSize: 14,
        color: '#666666'
    },
    time:{
        fontSize: 12,
        color: '#AAAAAA'
    },
    topic:{
        width:'100%',
        height:32,
        backgroundColor:'#ECECEE',
        alignItems:'flex-start',
        justifyContent:'center',
        marginTop:17
    },
    topicTxt:{
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft:11
    },
    replyView:{
        marginTop:12,
        flexDirection:'row',
        alignItems:'flex-start',
        flexWrap:'wrap',
    },
    replyTxt1:{
        fontSize: 15,
        color: '#444444',
        lineHeight:25

    },
    replyTxt2:{
        color:'#4990E2',
        fontSize: 15,
        lineHeight:25
    }
});