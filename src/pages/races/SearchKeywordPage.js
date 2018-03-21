/**
 * Created by lorne on 2017/3/24.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, Platform,
    StyleSheet, Image, Text, TextInput,
    ListView
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {ImageLoad, UltimateListView} from '../../components';
import {_renderFooter, _renderHeader} from '../../components/LoadingView';
import {searchRaceKeyword} from '../../services/RacesDao';
import {isEmptyObject, strNotNull} from '../../utils/ComonHelper';

import {NoDataView, NoNetWorkView, LoadErrorView} from '../../components/load';
import RaceRowView from '../../components/listitem/RaceRowView';


class SearchKeywordPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            next_id: '0',
            error: false
        };
        this.keyword = '';
    }


    render() {
        return (<View
            testID="page_keyword_search"
            style={ApplicationStyles.bg_black}>
            <View style={styles.navBar}>
                <View style={{width: 20}}/>

                <View style={styles.searchBar}>
                    <Image style={styles.imgSearch}
                           source={Images.search_gray}/>
                    <TextInput
                        placeholderTextColor="#6A6B6B"
                        placeholder={I18n.t('serachMore')}
                        testID="input_keyword"
                        underlineColorAndroid='transparent'
                        style={styles.inputSearch}
                        onChangeText={txt => {
                            this.keyword = txt;
                            if (strNotNull(txt))
                                this.listView.onRefresh()
                        }}/>

                </View>


                <TouchableOpacity
                    testID="btn_bar_right"
                    style={styles.popBtn}
                    onPress={() => router.pop()}>
                    <Text style={styles.txtCancel}>{I18n.t('cancel')}</Text>
                </TouchableOpacity>

            </View>

            {this.content()}
        </View>)
    }

    content = () => {
        return <UltimateListView
            keyExtractor={(item, index) => index+"item"}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            item={this._renderRow}
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
    };


    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            if (page === 1) {
                this._onRefresh(startFetch, abortFetch)
            } else {
                this._onLoadMore(startFetch, abortFetch);
            }
        } catch (err) {
            abortFetch();
        }
    };

    _onLoadMore = (startFetch, abortFetch) => {
        const {next_id} = this.state;
        const body = {
            next_id: next_id,
            keyword: this.keyword
        };
        searchRaceKeyword(body, data => {
            const {items, last_id} = data;
            this.setState({
                next_id: last_id
            });
            startFetch(items, 6)
        }, err => {
            abortFetch()
        })
    };
    _onRefresh = (startFetch, abortFetch) => {
        const {next_id} = this.state;
        const body = {
            next_id: next_id,
            keyword: this.keyword
        };

        searchRaceKeyword(body, data => {
            const {items, last_id} = data;
            this.setState({
                next_id: last_id
            });
            startFetch(items, 6)
        }, err => {
            abortFetch()
        })

    };


    _renderRow = (rowData, sectionID, rowID) => {

        return (
            <RaceRowView
                isMoreRace={true}
                rowID={rowID}
                rowData={rowData}/>
        )
    };


}

const styles = StyleSheet.create({
    navBar: {
        height: Platform.OS === 'android' ? 44 : 64,
        flexDirection: 'row',
        paddingTop: Platform.OS === 'android' ? 0 : 20,
        backgroundColor: Colors.bg_09,
        alignItems: 'center'
    },
    popBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBar: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#212325',
        borderRadius: 3,
        width: 270
    },
    imgSearch: {
        height: 18,
        width: 18,
        marginRight: 11,
        marginLeft: 8
    },
    inputSearch: {
        height: Platform.OS === 'android' ? 40 : 30,
        flex: 1,
        color: Colors.white,
        fontSize: 15
    },
    btnCancel: {
        height: 44,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtCancel: {
        color: '#E4D57F',
        fontSize: 15
    },


})

const headerStyle = {height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bg_ec};

const bindAction = dispatch => ({
    _searchByDate: (body) => dispatch(fetchSearchByKeyword(body))
});

const mapStateToProps = state => ({
    loading: state.RaceState.loading,
    error: state.RaceState.error,
    hasData: state.RaceState.hasData,
    actionType: state.RaceState.actionType,
    listRaces: state.RaceState.listRaces
});

export default connect(mapStateToProps, bindAction)(SearchKeywordPage);