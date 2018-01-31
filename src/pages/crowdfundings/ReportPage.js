/**
 * Created by lorne on 2018/1/15
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import I18n from 'react-native-i18n';
import {timely_match} from '../../services/CrowdDao';
import moment from 'moment';

const styles = StyleSheet.create({
    btnLeft: {
        height: 44,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgLeft: {
        height: 23,
        width: 23
    },
    imgRight: {
        height: 20,
        width: 20
    },
    nav: {
        height: Metrics.navBarHeight,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingTop: Metrics.statusBarHeight,

    },
    selected: {

        paddingRight: 5,
        paddingLeft: 5,

        alignItems: 'center',
        marginLeft: 18
    },
    txtTitle: {
        fontSize: 14,
        color: Colors._F34
    },
    race: {
        width: '100%',
        padding: 17
    },
    txtName: {
        fontSize: 14,
        color: Colors._333,
        fontWeight: 'bold',
        marginBottom: 10
    },
    txtTime: {
        fontSize: 12,
        color: Colors._888,
        marginTop: 5
    },
    list: {
        backgroundColor: 'white',
        marginTop: 5,
    },
    red_point: {
        height: 14, width: 14, borderRadius: 7,
        backgroundColor: Colors._F34, marginTop: 8,
        position: 'absolute'
    }


});

export default class ReportPage extends PureComponent {

    state = {
        timely_match: {},
        matchShow: 0
    };

    componentDidMount() {

    }


    render() {
        return <View style={ApplicationStyles.bgContainer}>
            <View
                style={styles.nav}>
                <StatusBar barStyle={"dark-content"}/>
                {this.renderBtn(true, Images.mall_return, styles.imgLeft)}
                <View style={{
                    flex: 1, alignItems: 'center', height: 44, justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    {this.reportBtn(0, '及时赛报')}
                    {this.reportBtn(1, '牌手赛报')}
                </View>
                {this.renderBtn(false)}
            </View>

            {this.renderFlatList()}


        </View>
    }

    race_time = (race) => {
        const {begin_date, end_date} = race;
        return moment(begin_date).format('YYYY.MM.DD') + '-' + moment(end_date).format('YYYY.MM.DD')
    };

    headerRace = () => {
        const {race} = this.props.params.crowd;
        return <View>
            <View style={styles.race}>
                <Text style={styles.txtName}>{race.name}</Text>
                <Text style={styles.txtTime}>{this.race_time(race)}</Text>
                <Text style={styles.txtTime}>{race.location}</Text>
            </View>
            <View style={{height: 10, backgroundColor: Colors._ECE}}/>
        </View>
    };

    renderFlatList = () => {
        return <View style={styles.list}>
            <UltimateFlatList
                header={() => this.headerRace()}
                ref={(ref) => this.listView = ref}
                onFetch={this.onFetch}
                keyExtractor={(item, index) => `crowd${index}`}
                item={this.renderItem}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
            />
        </View>

    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        const {crowd} = this.props.params;
        console.log("crowd22:", crowd)
        timely_match({crowdfunding_id: crowd.id, page: page}, data => {
            console.log("timely_match:", data)
            this.setState({
                timely_match: data
            })
        }, err => {
            abortFetch()
        })
    };

    renderItem = (item, index) => {
        const {
            crowdfunding_id, crowdfunding_player_id, crowdfunding_player_name, record_time,
            name, title, small_blind, big_blind, ante, description, created_at
        } = item;
        return <View style={{flexDirection: 'row', paddingLeft: 17, paddingRight: 17}}>
            <View style={{width: 14, alignItems: 'center'}}>

                <View style={{backgroundColor: Colors._ECE, width: 1, flex: 1}}/>
                <View style={styles.red_point}/>
            </View>

            <View style={{marginLeft: 17}}>
                <Text style={{fontSize: 14, color: Colors._F34, marginTop: 8}}>{name}</Text>
                <View style={{height: 700}}/>
            </View>


        </View>
    };


    renderBtn = (isLeft, image, imgStyle) => {
        return <TouchableOpacity
            onPress={() => {
                isLeft && global.router.pop()
            }}
            style={styles.btnLeft}>
            <Image style={imgStyle} source={image}/>
        </TouchableOpacity>
    };

    reportBtn = (matchShow, title) => {
        let select = matchShow === this.state.matchShow;
        return <TouchableOpacity style={styles.selected}
                                 onPress={()=>{
            this.setState({
                matchShow
            })
        }}>
            <Text
                style={[styles.txtTitle, {color: select ? '#161718' : '#666666',fontSize:select ? 16 : 14}]}>{title}</Text>
            {select ? <View style={{backgroundColor:'#161718',width:50,height:3,marginTop:7}}/> : null}
        </TouchableOpacity>
    }


}