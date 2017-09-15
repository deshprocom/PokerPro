/**
 * Created by lorne on 2017/3/24.
 */
import React, {PropTypes, Component} from 'react';
import {
    TouchableOpacity, View, Platform,
    StyleSheet, Image, Text, TextInput,
    ListView
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import {_renderFooter, _renderHeader} from '../../components/LoadingView';
import {fetchSearchByKeyword} from '../../actions/RacesAction';
import {isEmptyObject, strNotNull} from '../../utils/ComonHelper';
import {SEARCH_BY_KEYWORD} from '../../actions/ActionTypes';
import {NoDataView, NoNetWorkView, LoadErrorView} from '../../components/load';
import RaceRowView from '../../components/listitem/RaceRowView';


class SearchKeywordPage extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.initData();

    }


    initData = () => {
        let dataList = [];
        this.state = {
            dataList: dataList,
            dataSource: this.ds.cloneWithRows(dataList),
            next_id: '0',
            keyword: ''
        };
    };


    render() {
        return (<View
            testID="page_keyword_search"
            style={ApplicationStyles.bg_black}>
            <View style={styles.navBar}>
                <View style={styles.popBtn}/>

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
                            this.setState({
                                keyword: txt
                            });
                            this.loadList('0', txt)
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
        const {actionType, error, hasData} = this.props;
        const {dataList} = this.state;

        if (actionType === SEARCH_BY_KEYWORD && dataList.length <= 0)
            if (hasData) {
                return <NoDataView
                    pageStyle={{backgroundColor: Colors.bg_ec}}/>
            } else if (error)
                return <LoadErrorView
                    onPress={() => this._onRefresh()}/>
        return <PullToRefreshListView
            ref={ (component) => this._pullToRefreshListView = component }
            viewType={PullToRefreshListView.constants.viewType.listView}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderHeader={(viewState) => _renderHeader(viewState, headerStyle)}
            renderFooter={(viewState) => _renderFooter(viewState, headerStyle)}
            onRefresh={this._onRefresh}
            onLoadMore={this._onLoadMore}
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false}
        />
    };

    componentWillReceiveProps(newProps) {
        const {hasData, listRaces, loading, actionType} = newProps;

        if (hasData && this.props.loading !== loading)
            if (actionType === SEARCH_BY_KEYWORD) {

                console.log(this.state.next_id, this.state.dataList)
                if (this.state.next_id === '0') {
                    this.state.dataList.splice(0, this.state.dataList.length);
                    this._pullToRefreshListView.endRefresh()
                } else {
                    this._pullToRefreshListView.endLoadMore(false)
                }


                const {items, next_id} = listRaces;
                let newDataList = this.state.dataList.concat(items)

                this.setState({
                    dataList: newDataList,
                    dataSource: this.ds.cloneWithRows(newDataList),
                    next_id: next_id
                });
            }
    }

    _onLoadMore = () => {
        const {next_id, keyword} = this.state;
        if (strNotNull(next_id)) {
            this.loadList(next_id, keyword);
        } else {
            this._pullToRefreshListView.endLoadMore(false)
        }
    };
    _onRefresh = () => {
        if (strNotNull(this.state.keyword)) {
            this.setState({
                next_id: '0'
            });
            this.loadList('0', this.state.keyword)
        } else {
            this._pullToRefreshListView.endRefresh();
        }

    };


    loadList = (next_id, keyword) => {

        if (strNotNull(keyword)) {
            this.setState({
                next_id: next_id
            });
            const body = {
                next_id: next_id,
                keyword: keyword
            };
            this.props._searchByDate(body);

        }


    };

    _renderRow = (rowData, sectionID, rowID, highlightRow) => {

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
        height: 44,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBar: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#212325',
        borderRadius: 3,
        flex: 1
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