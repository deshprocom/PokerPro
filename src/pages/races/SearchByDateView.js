/**
 * Created by lorne on 2017/3/24.
 */
import React, { Component} from 'react';
import {
    TouchableOpacity, View,
    StyleSheet, Image, Text, ListView
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import {_renderFooter, _renderHeader} from '../../components/LoadingView';
import {fetchSearchByDate} from '../../actions/RacesAction';
import {isEmptyObject, strNotNull} from '../../utils/ComonHelper';
import {SEARCH_BY_DATE} from '../../actions/ActionTypes';
import {NoDataView, NoNetWorkView, LoadErrorView} from '../../components/load';
import RaceRowView from '../../components/listitem/RaceRowView';

class SearchByDateView extends Component {

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
        };
    };


    render() {
        return (<View
            testID="page_search_date"
            style={styles.modal}
        >

            {this.content()}
        </View>)
    }

    content = () => {
        const {actionType, error, hasData} = this.props;
        const {dataList} = this.state;

        if (actionType === SEARCH_BY_DATE && dataList.length <= 0)
            if (hasData) {
                return <NoDataView/>
            } else if (error)
                return <LoadErrorView
                    onPress={()=>this._onRefresh()}/>
        return <PullToRefreshListView
            ref={ (component) => this._pullToRefreshListView = component }
            viewType={PullToRefreshListView.constants.viewType.listView}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderHeader={(viewState)=>_renderHeader(viewState,headerStyle)}
            renderFooter={(viewState)=>_renderFooter(viewState,headerStyle)}
            onRefresh={this._onRefresh}
            onLoadMore={this._onLoadMore}
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false}
        />
    };

    componentWillReceiveProps(newProps) {
        const {hasData, listRaces, loading, actionType} = newProps;

        console.log(actionType)
        if (actionType === 'ClearSearch') {
            this.setState({
                next_id: '0'
            });

        }

        if (hasData && this.props.loading !== loading)
            if (actionType === SEARCH_BY_DATE) {
                console.log('next_id', this.state.next_id)
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
        const {next_id} = this.state;
        if (strNotNull(next_id)) {
            this.loadList(next_id);
        } else {
            this._pullToRefreshListView.endLoadMore(false)
        }
    };
    _onRefresh = () => {
        this.setState({
            next_id: '0'
        });
        this.loadList('0')
    };


    loadList = (next_id) => {

        const {date} = this.props;
        if (strNotNull(date)) {
            const body = {
                next_id: next_id,
                date: date
            };
            this.props._searchByDate(body);
        }


    };

    _renderRow = (rowData, sectionID, rowID, highlightRow) => {

        return (
            <RaceRowView
                rowID={rowID}
                rowData={rowData}/>
        )
    };


}

const headerStyle = {height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161718'};

const styles = StyleSheet.create({
    modal: {
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#161718',
        flex: 1
    }
});

const bindAction = dispatch => ({
    _searchByDate: (body) => dispatch(fetchSearchByDate(body))
});

const mapStateToProps = state => ({
    loading: state.RaceState.loading,
    error: state.RaceState.error,
    hasData: state.RaceState.hasData,
    actionType: state.RaceState.actionType,
    listRaces: state.RaceState.listRaces
});

export default connect(mapStateToProps, bindAction)(SearchByDateView);