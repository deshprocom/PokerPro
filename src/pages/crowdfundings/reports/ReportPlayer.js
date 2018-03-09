/**
 * Created by lorne on 2018/2/1
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, FlatList,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {poker_list, player_match} from '../../../services/CrowdDao';
import UltimateFlatList from '../../../components/ultimate/UltimateFlatList';
import I18n from 'react-native-i18n';
import {MarkdownPlat} from '../../../components';
import _ from 'lodash';
import {isEmptyObject, utcDate, convertDate} from '../../../utils/ComonHelper';

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white'
    },
    player_img: {
        width: 61,
        height: 77,
        borderRadius: 2,
        backgroundColor: Colors._ECE
    },
    player_name: {
        fontSize: 12,
        color: Colors.txt_444
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

export default class ReportPlayer extends PureComponent {

    state = {
        crowdPlayer: {},
        player: {},
        players: []
    };

    componentDidMount() {
        const {crowd, player} = this.props;
        poker_list({id: crowd.id, page: 1, page_size: 100}, data => {

            this.setState({
                players: data.players,
                player: isEmptyObject(player) ? data.players[0] : player
            })
        }, err => {

        })
    }


    headPlayers = () => {
        const {players, player} = this.state;
        return <View>
            <View style={{height: 5, backgroundColor: '#ECECEE'}}/>
            <FlatList
                horizontal={true}
                data={players}
                renderItem={this.players}
                keyExtractor={(item, index) => `playerList${index}`}/>
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

                <Text style={styles.timely_match}>{`${player.name}赛报`}</Text>
            </View>
        </View>
    };


    render() {
        const {players, player} = this.state;
        return <View style={styles.list}>
            {isEmptyObject(player) ? null : <UltimateFlatList
                header={() => this.headPlayers()}
                ref={(ref) => this.listView = ref}
                onFetch={this.onFetch}
                keyExtractor={(item, index) => `crowd${index}`}
                item={this.renderItem}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
            />}


        </View>
    }

    players = ({item}) => {
        const {
            cf_player_id, name, nick_name, logo
        } = item;
        const {player} = this.state;
        let select = player.cf_player_id === cf_player_id;
        return <TouchableOpacity
            onPress={() => {
                this.setState({
                    player: item,
                    players: [...this.state.players]
                });

                setTimeout(() => {
                    this.listView && this.listView.refresh()
                }, 200)

            }}
            style={{
                alignItems: 'center', width: 62,
                marginTop: 16, marginBottom: 11,
                marginLeft: 17
            }}>
            <Image
                source={{uri: logo}}
                style={[styles.player_img, select ? {borderWidth: 1, borderColor: Colors._F34} : {}]}
            />

            <Text
                style={[styles.player_name, {marginTop: 6, color: select ? Colors._F34 : Colors.txt_444}]}>{name}</Text>

        </TouchableOpacity>
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
        const {id} = this.props.crowd;
        const {cf_player_id} = this.state.player;
        player_match({cf_id: id, cf_player_id, page: page, page_size: 20}, data => {

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
                <Text style={{fontSize: 14, color: Colors._F34, marginTop: 8}}>{race.name}</Text>
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
            created_at, title, ante, small_blind, big_blind,
            crowdfunding_player_name, description, level
        } = item;
        let level_blind_ante = `级别：${level}  盲注：${small_blind + '/' + big_blind} 前注：${ante}`;
        return <View>
            <Text style={[styles.itemTime, {marginTop: 7}]}>{utcDate(created_at, 'YYYY.MM.DD HH:mm')}</Text>
            <Text style={styles.txt_title}>{level_blind_ante}</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 3}}>
                <Text style={[styles.txt_title, {color: Colors.txt_444, fontWeight: 'bold'}]}>{title}</Text>

                <Text
                    onPress={() => {
                        const {crowd} = this.props;
                        global.router.toPokerInfo(crowd, this.state.player, crowd.race)
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