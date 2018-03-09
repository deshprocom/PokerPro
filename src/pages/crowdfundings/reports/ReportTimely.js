/**
 * Created by lorne on 2018/1/31
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, FlatList,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes/index';
import UltimateFlatList from '../../../components/ultimate/UltimateFlatList';
import I18n from 'react-native-i18n';
import {timely_match} from '../../../services/CrowdDao';
import {utcDate, convertDate, isEmptyObject} from '../../../utils/ComonHelper';
import _ from 'lodash';
import {MarkdownPlat} from '../../../components/index'

const styles = StyleSheet.create({
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

    },
    red_point: {
        height: 14, width: 14, borderRadius: 7,
        backgroundColor: Colors._F34, marginTop: 8,
        position: 'absolute'
    },
    timely_match: {
        fontSize: 14,
        color: '#444444',
        marginLeft: 5,
        fontWeight: 'bold'
    },
    itemTime: {
        fontSize: 12,
        color: '#AAAAAA'
    },
    txt_title: {
        fontSize: 12,
        color: Colors._666,
        marginTop: 3
    },
    txt_name: {
        fontSize: 12,
        color: '#4990E2'
    }
});

export default class ReportTimely extends PureComponent {


    race_time = (race) => {
        const {begin_date, end_date} = race;
        return convertDate(begin_date, 'YYYY.MM.DD') + '-' + convertDate(end_date, 'YYYY.MM.DD')
    };

    headerRace = () => {
        const {race} = this.props.crowd;
        return <View>
            <View style={{height: 5, backgroundColor: '#ECECEE'}}/>
            <View style={styles.race}>
                <Text style={styles.txtName}>{race.name}</Text>
                <Text style={styles.txtTime}>{this.race_time(race)}</Text>
                <Text style={styles.txtTime}>{race.location}</Text>
            </View>
            <View style={{height: 10, backgroundColor: Colors._ECE}}/>
            <View style={{
                flexDirection: 'row',
                paddingTop: 9,
                backgroundColor: 'white',
                marginLeft: 17,
                marginRight: 17,
                marginBottom: 10
            }}>
                <Image
                    style={{height: 16, width: 16, marginRight: 5}}
                    source={Images.black_fire}/>

                <Text style={styles.timely_match}>{I18n.t('timely_match')}</Text>
            </View>
        </View>
    };

    render() {
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

    blobData = (items) => {

        let objArr = {};
        let dynamics = [];
        _.forEach(items, item => {
            let date = utcDate(item.record_time, 'YYYY-MM-DD');

            if (!objArr[date]) {
                objArr[date] = [];
            }
            objArr[date].push(item);
        });

        _.forEach(objArr, (value, key) => {
            let dynamic = {
                date: key,
                items: value
            };
            dynamics.push(dynamic)
        });

        console.log("dynamics:", dynamics);

        return dynamics;

    };


    onFetch = (page = 1, postRefresh, abortFetch) => {
        const {crowd} = this.props;
        timely_match({crowdfunding_id: crowd.id, page: page, page_size: 20}, data => {

            postRefresh(this.blobData(data), 6);
        }, err => {
            abortFetch()
        })
    };

    renderItem = (item, index) => {
        const {race} = this.props.crowd;
        const {date, items} = item;
        return <View style={{flexDirection: 'row', paddingLeft: 17, paddingRight: 17}}>
            <View style={{width: 14, alignItems: 'center'}}>

                <View style={{backgroundColor: Colors._ECE, width: 1, flex: 1}}/>
                <View style={styles.red_point}/>
            </View>

            <View style={{marginLeft: 17, flex: 1}}>
                <Text style={{
                    fontSize: 14,
                    color: Colors._F34,
                    marginTop: 8
                }}>{isEmptyObject(items) ? race.name : items[0].name}</Text>
                <FlatList
                    data={items}
                    renderItem={this.renderChild}
                    keyExtractor={item => item.created_at}
                />
            </View>


        </View>
    };

    renderChild = ({item}) => {
        const {
            created_at, title, ante, level, big_blind, crowdfunding_player_name, description,
            crowdfunding_player_id, small_blind
        } = item;
        let level_blind_ante = `级别：${level}  盲注：${small_blind + '/' + big_blind}  前注：${ante}`;
        return <View>
            <Text style={[styles.itemTime, {marginTop: 7}]}>{utcDate(created_at, 'YYYY.MM.DD HH:mm')}</Text>

            <Text style={styles.txt_title}>{level_blind_ante}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 3}}>
                <Text style={[styles.txt_title, {color: Colors.txt_444, fontWeight: 'bold'}]}>{title}</Text>

                <Text
                    onPress={() => {
                        this.props.choise_player && this.props.choise_player({
                            cf_player_id: crowdfunding_player_id,
                            name: crowdfunding_player_name
                        })
                    }}
                    style={styles.txt_name}>{crowdfunding_player_name}</Text>

            </View>

            <MarkdownPlat
                markdownStr={description}
                markStyle={markdownStyles}/>

            <View style={{height: 1, width: '100%', backgroundColor: Colors._ECE}}/>

        </View>
    }
}

const markdownStyles = {

    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    mail_to: {
        color: 'orange',
    },
    text: {
        color: '#444444',
        fontSize: 15,
        lineHeight: 25,
        letterSpacing: 0.3
    },
    heading5: {
        alignSelf: 'center',
        fontSize: 15,
    }
};