import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ListView, Image} from 'react-native';
import I18n from 'react-native-i18n';
import {Metrics, Colors, Images} from '../../Themes';
import {PullListView, UltimateListView} from '../../components';
import {NoDataView, LoadErrorView} from '../../components/load';
import {getMainRank} from '../../services/RankDao';
import {strNotNull,moneyFormat} from '../../utils/ComonHelper';

export default class RankList extends Component {

    constructor(props) {
        super(props);
        this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.race_id !== r2.race_id
        });
        this.state = {
            dataSource: this._dataSource.cloneWithRows([]),
            rankData: [],
            rankListNextID: '0',
            error: false,
            page: 0
        };

        this.filterParam = {};
    }


    rankNum = (rowID) => {
        if (rowID == 1) {
            return (
                <Image source={Images.gold}
                       style={{width: 20, height: 28}}/>
            )
        } else if (rowID == 2) {
            return (
                <Image source={Images.silver}
                       style={{width: 20, height: 28}}/>
            )
        } else if (rowID == 3) {
            return (
                <Image source={Images.copper}
                       style={{width: 20, height: 28}}/>
            )
        } else {
            return (
                <Text>{rowID}</Text>
            )
        }
    };

    filterRank = (param) => {
        console.log(param)
        this.filterParam = param;

        this.listView.setRows([]);
        this.listView.refresh();
    };

    listRenderRow = (rowData, sectionID, rowID) => {
        const {avatar, country, dpi_total_earning, dpi_total_score, id, memo, name, rank} = rowData;
        return (<TouchableOpacity style={styles.row_view}
                                  onPress={() => router.toPokerRankPage(this.props, id)}>
            <View style={{flexDirection: 'row'}}>
                <View style={[{width: 53}, styles.list_row]}>
                    {this.rankNum(rank)}
                </View>
                <View style={styles.list_row}>
                    <Image defaultSource={Images.home_avatar}
                           source={strNotNull(avatar) ? {uri: avatar} : Images.home_avatar}
                           style={{width: 49.7, height: 49.7, marginLeft: 12, marginRight: 15.3, borderRadius: 24.85}}>
                        <Image/>
                    </Image>
                </View>
                <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', height: 69}}>
                    <Text style={{color: Colors._333, fontSize: 14, lineHeight: 20, fontWeight: 'bold'}}>{name}</Text>
                    <Text
                        style={{color: Colors._AAA, fontSize: 12, lineHeight: 17, fontWeight: 'bold'}}>{country}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', height: 69}}>
                    <Text
                        style={{
                            color: Colors._666,
                            fontSize: 15,
                            lineHeight: 21,
                            fontWeight: 'bold'
                        }}>¥{moneyFormat(dpi_total_earning)}</Text>
                    <Text
                        style={{
                            color: Colors._AAA,
                            fontSize: 12,
                            lineHeight: 17,
                            fontWeight: 'bold'
                        }}>{I18n.t('rank_prize')}</Text>
                </View>
                <View style={styles.list_row}>
                    <Image source={Images.set_more}
                           style={{width: 5.7, height: 11.6, marginLeft: 17.5, marginRight: 16.8}}/>
                </View>
            </View>
            <View style={{height: 1, backgroundColor: Colors.bg_f5, marginLeft: 16}}></View>
        </TouchableOpacity>)
    };

    render() {

        return (<View style={styles.rank_list}>
            <UltimateListView
                style={{paddingTop: 6}}
                key={this.state.layout}
                keyExtractor={(item, index) => `${this.state.layout} - ${item.race_id}`}
                ref={(ref) => this.listView = ref}
                onFetch={this.onFetch}
                legacyImplementation
                rowView={this.listRenderRow}
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


    onFetch = (page = 1, startFetch, abortFetch) => {
        try {

            console.log(page);
            if (page === 1) {
                this.refresh(startFetch, abortFetch);
                this.listView.scrollTo({x: 0, y: 0, animated: true})
            } else {
                console.log('loadmore')
                this.loadMore(startFetch, abortFetch);
            }
        } catch (err) {
            abortFetch();
        }
    };

    refresh = (startFetch, abortFetch) => {

        const {region, begin_year, end_year, page_index, page_size} = this.filterParam;
        const body = {
            page_size: page_size ? page_size : 100,
            page_index: page_index ? page_index : 0,
            region: region ? region : 'global',
            begin_year: begin_year ? begin_year : '',
            end_year: end_year ? end_year : '',
        };

        getMainRank(body, data => {
            this.setState({
                page: body.page_index + 1
            });
            startFetch(data, 10)
        }, err => {
            abortFetch();
            this.setState({
                error: true
            })
        })
    };

    loadMore = (startFetch, abortFetch, page) => {
        const {region, begin_year, end_year, page_index, page_size} = this.filterParam;
        const body = {
            page_size: page_size ? page_size : 100,
            page_index: this.state.page,
            region: region ? region : 'global',
            begin_year: begin_year ? begin_year : '',
            end_year: end_year ? end_year : '',
        };

        getMainRank(body, data => {
            startFetch(data, 10)
        }, err => {
            abortFetch();
            this.setState({
                error: true
            })
        })
    };

}


const styles = StyleSheet.create({
    rank_list: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        backgroundColor: Colors.bg_f5
    },
    row_view: {
        height: 70,
        backgroundColor: Colors.white,
        // marginTop: 6
    },
    list_row: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 69
    }

});