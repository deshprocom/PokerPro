/**
 * Created by lorne on 2017/7/26.
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

export default class RankListView extends Component {
    render() {
        return (
            <View>

                <View style={styles.tableHead}>
                    <Text style={styles.tableTitle}>{I18n.t('rank_no')}</Text>
                    <Text style={styles.tableTitle}>{I18n.t('contestant')}</Text>
                    <Text style={styles.tableTitle}>{I18n.t('rank_prize')}</Text>
                    <Text style={styles.tableTitle}>{I18n.t('rank_number')}</Text>
                </View>

                <UltimateListView
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
                />
            </View>)
    }

    _itemNewsView = (rowData, sectionID, rowID) => {

        return (<View style={[styles.item, {backgroundColor: rowID % 2 === 0 ? 'white' : '#F5F5F5'}]}>
            <Text style={styles.txtItem}>{I18n.t('rank_no')}</Text>
            <Text style={styles.txtPoker}>{I18n.t('contestant')}</Text>
            <Text style={styles.txtItem}>{I18n.t('rank_prize')}</Text>
            <Text style={styles.txtItem}>{I18n.t('rank_number')}</Text>
        </View>)

    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        if (page === 1)
            startFetch([1, 2, 3, 4], 5)
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
        justifyContent: 'space-around',
    },
    txtItem: {
        color: Colors._666,
        fontSize: 14,
    },
    txtPoker: {
        color: '#3F9FFF',
        fontSize: 14,
    }


});