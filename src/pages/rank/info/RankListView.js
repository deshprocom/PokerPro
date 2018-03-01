/**
 * Created by lorne on 2017/7/26.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {UltimateListView} from '../../../components';
import {NoDataView, LoadErrorView} from '../../../components/load';

export default class RankListView extends Component {
    render() {
        return (
            <View style={{flex: 1}}>

                <View style={styles.tableHead}>
                    <Text style={styles.tableTitle}>{I18n.t('rank_no')}</Text>
                    <Text style={styles.tableTitle}>{I18n.t('contestant')}</Text>
                    <Text style={styles.tableTitle}>{I18n.t('rank_prize')}</Text>
                    <Text style={styles.tableTitle}>{I18n.t('rank_number')}</Text>
                </View>

                <UltimateListView
                    refreshable={false}
                    pagination={false}
                    ref={(ref) => this.listView = ref}
                    onFetch={this.onFetch}
                    item={this._itemNewsView}
                    refreshableTitlePull={I18n.t('pull_refresh')}
                    refreshableTitleRelease={I18n.t('release_refresh')}
                    dateTitle={I18n.t('last_refresh')}
                    allLoadedText={I18n.t('no_more')}
                    waitingSpinnerText={I18n.t('loading')}
                />
            </View>)
    }

    _itemNewsView = (rowData, sectionID, rowID) => {

        const {earning, player, ranking, score} = rowData;
        return (<TouchableOpacity
            onPress={
                () => {
                    router.toPokerRankPage(player.player_id)
                }}
            activeOpacity={1}
            style={[styles.item, {backgroundColor: rowID % 2 === 0 ? 'white' : '#F5F5F5'}]}>
            <View style={styles.viewAlign}>
                <Text style={styles.txtItem}>{ranking}</Text>
            </View>
            <View style={styles.viewAlign}>
                <Text style={styles.txtPoker}>{player.name}</Text>
            </View>
            <View style={styles.viewAlign}>
                <Text style={styles.txtItem}>{earning}</Text>
            </View>
            <View style={styles.viewAlign}>
                <Text style={styles.txtItem}>{score}</Text>
            </View>
        </TouchableOpacity>)

    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        if (page === 1)
            startFetch(this.props.ranks, 10);
        else
            abortFetch()
    }
}


const styles = StyleSheet.create({
    tableHead: {
        height: 32,
        backgroundColor: '#CECDBB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 6
    },
    tableTitle: {
        color: 'white',
        fontSize: 14,

    },
    item: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtItem: {
        color: Colors._666,
        fontSize: 14,

    },
    txtPoker: {
        color: '#3F9FFF',
        fontSize: 14,
    },
    viewAlign: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }


});