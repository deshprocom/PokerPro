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

export default class RaceListView extends Component {
    render() {
        return (<UltimateListView
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

    _itemNewsView = (rowData, sectionID, rowID) => {

        return (<View>

            <View style={{height: 6}}/>

            <View style={{backgroundColor: 'white'}}>
                <View style={styles.viewTop}>
                    <Text style={styles.name}>2017年扑克王杯</Text>
                    <View style={{flex: 1}}/>

                    <View style={styles.viewRank}>
                        <Text style={styles.rank}>第12名</Text>
                    </View>

                </View>

                <View style={styles.viewInfo}>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_buyIn')}</Text>
                        <Text style={styles.txtTabValue}>$223422</Text>

                    </View>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_participate')}</Text>
                        <Text style={styles.txtTabValue}>$223422</Text>

                    </View>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_prize')}</Text>
                        <Text style={styles.txtTabValue}>$223422</Text>

                    </View>
                    <View style={styles.viewItem}>
                        <Text style={styles.txtTabName}>{I18n.t('rank_number')}</Text>
                        <Text style={styles.txtTabValue}>$223422</Text>

                    </View>

                </View>

                <View style={styles.line}/>

                <View style={styles.viewBottom}>

                    <View style={[styles.viewTime, {marginTop: 12}]}>
                        <Image
                            source={Images.home_clock}
                            style={{height: 11, width: 11, marginRight: 8}}/>

                        <Text style={styles.txtTime}>2017.04.23-2017.05.12</Text>
                    </View>
                    <View style={[styles.viewTime, {marginTop: 8}]}>
                        <Image
                            source={Images.home_adr}
                            style={{height: 12, width: 9, marginRight: 8}}/>

                        <Text
                            numberOfLines={1}
                            style={styles.txtTime}>澳大利亚墨尔本皇冠娱乐场澳大是寿...</Text>
                    </View>
                </View>

            </View>
        </View>)
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        if (page === 1)
            startFetch([1, 2, 3, 4], 5)
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
        marginTop:8
    },
    line: {
        height: 1,
        backgroundColor: Colors._ECE,
        marginLeft: 20,
        marginRight: 17,
        flex: 1

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