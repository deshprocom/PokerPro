/**
 * Created by lorne on 2017/7/25.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {UltimateListView} from '../../../components';
import {NoDataView, LoadErrorView} from '../../../components/load';
import {getPokerRanks} from '../../../services/RankDao';
import {convertDate, YYYY_MM_DD} from '../../../utils/ComonHelper';

export default class RaceListView extends Component {


    render() {
        return (<UltimateListView
            refreshable={false}
            pagination={false}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            legacyImplementation
            rowView={this._itemNewsView}
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            waitingSpinnerText={I18n.t('loading')}
            emptyView={() => {
                return this.state.error ? <LoadErrorView
                    onPress={() => {
                        this.listView.refresh()
                    }}/> : <NoDataView/>;
            }}
        />)
    }

    _time = (begin, end) => {
        let beginDate = convertDate(begin, YYYY_MM_DD);
        let endDate = convertDate(end, YYYY_MM_DD);
        return beginDate + '-' + endDate;
    };

    _itemNewsView = (rowData, sectionID, rowID) => {

        const {race, rank} = rowData;
        const {begin_date, end_date, location, name, participants, ticket_price, race_id} = race;
        const {earning, ranking, score} = rank;
        return (<TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                router.toPokerRacePage(this.props, race_id);
            }}>

            <View style={{height: 6}}/>

            <View style={{backgroundColor: 'white'}}>
                <View style={styles.viewTop}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={{flex: 1}}/>

                    <View style={styles.viewRank}>
                        <Text style={styles.rank}>第{ranking}名</Text>
                    </View>

                </View>

                <View style={styles.viewInfo}>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_buyIn')}</Text>
                        <Text style={styles.txtTabValue}>{ticket_price}</Text>

                    </View>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_participate')}</Text>
                        <Text style={styles.txtTabValue}>{participants}</Text>

                    </View>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_prize')}</Text>
                        <Text style={styles.txtTabValue}>{earning}</Text>

                    </View>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_number')}</Text>
                        <Text style={styles.txtTabValue}>{score}</Text>

                    </View>

                </View>

                <View style={styles.line}/>

                <View style={styles.viewBottom}>

                    <View style={[styles.viewTime, {marginTop: 12}]}>
                        <Image
                            source={Images.home_clock}
                            style={{height: 11, width: 11, marginRight: 8}}/>

                        <Text style={styles.txtTime}>{this._time(begin_date, end_date)}</Text>
                    </View>
                    <View style={[styles.viewTime, {marginTop: 8}]}>
                        <Image
                            source={Images.home_adr}
                            style={{height: 12, width: 9, marginRight: 10}}/>

                        <Text
                            numberOfLines={1}
                            style={styles.txtTime}>{location}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>)
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        if (page === 1) {
            const body = {
                player_id: '4bbd9cc2'
            };
            getPokerRanks(body, data => {
                startFetch(data, 10)
            }, err => {
                abortFetch()
            })
        }

    }
}


const styles = StyleSheet.create({
    viewTop: {
        height: 35,
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors._333,
        marginLeft: 20
    },
    viewRank: {
        height: 23,
        width: 58,
        backgroundColor: '#F34A4A',
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 17
    },
    rank: {
        fontSize: 13,
        color: 'white'
    },
    viewInfo: {
        height: 80,
        width: Metrics.screenWidth,
        flexDirection: 'row'
    },
    viewItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtTabName: {
        color: Colors._AAA,
        fontSize: 12,
        fontWeight: 'bold'
    },
    txtTabValue: {
        color: Colors._888,
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 8
    },
    line: {
        height: 1,
        backgroundColor: Colors._ECE,
        marginLeft: 20,
        marginRight: 17

    },
    txtTime: {
        fontSize: 13,
        color: Colors._666
    },
    viewTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    viewBottom: {
        height: 70
    }
});