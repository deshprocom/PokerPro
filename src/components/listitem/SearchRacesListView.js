/**
 * Created by lorne on 2017/3/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, ListView,
    TouchableOpacity, Image
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {
    strNotNull, moneyFormat, isEmptyObject, dataBlob,
    getCurrentMonth, arrayUnique
} from '../../utils/ComonHelper';
import {_renderFooter, _renderHeader} from '../../components/LoadingView';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import {fetchGetSearchRaces} from '../../actions/RacesAction';
import {GET_SEARCH_RACES} from '../../actions/ActionTypes';
import {NoDataView, NoNetWorkView, LoadErrorView} from '../load'
import RaceRowView from './RaceRowView';

const FUTURE = 'forward',
    HISTORY = 'backward',
    MONTH = 'month';


class SearchRacesListView extends Component {


    render() {
        return ( <View
            style={ {flex:1,backgroundColor:'#161718'}}>

            {this.content()}

            {this._currentDate()}

        </View>)
    }

    content = () => {
        const {actionType, error, hasData} = this.props;
        const {sourceData} = this.state;

        if (actionType === GET_SEARCH_RACES && sourceData.length <= 0)
            if (hasData) {
                return <NoDataView/>
            } else if (error)
                return <LoadErrorView
                    onPress={()=>this._onRefresh()}/>
        return <PullToRefreshListView
            ref={ (component) => this._pullToRefreshListView = component }
            viewType={PullToRefreshListView.constants.viewType.listView}
            dataSource={this.state.componentDataSource}
            renderSectionHeader={this._renderSectionHeader}
            renderRow={this._renderRow}
            renderHeader={(viewState)=>_renderHeader(viewState,headerStyle)}
            renderFooter={(viewState)=>_renderFooter(viewState,headerStyle)}
            onRefresh={this._onRefresh}
            onLoadMore={this._onLoadMore}
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false}
        />
    }


    _goCurrentMonth = () => {
        this.setState({
            sectionDataCollection: {},
            componentDataSource: this._dataSource.cloneWithRowsAndSections({}),
            sourceData: [],
            futureMonthNum: getCurrentMonth() + '-01',
            historyMonthNum: getCurrentMonth() + '-01'
        });

        const body = {
            seq_id: '',
            operator: FUTURE,
            begin_date: getCurrentMonth() + '-01'
        };


        this.setState({
            orientation: MONTH
        });
        this.props._searchRaces(body);
    }

    _currentDate = () => {
        return (<TouchableOpacity
            onPress={()=>{

           this._goCurrentMonth();

            }}
            activeOpacity={1}
            testID="btn_time_race"
            style={styles.currentDate}>
            <Image style={styles.currentImg} source={global.language === 'zh'?Images.month:Images.monthE}/>
        </TouchableOpacity>)
    }

    constructor(props) {
        super(props);
        this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
            sectionDataCollection: {},
            componentDataSource: this._dataSource.cloneWithRowsAndSections({}),
            sourceData: [],
            futureMonthNum: getCurrentMonth() + '-01',
            historyMonthNum: getCurrentMonth() + '-01',
            orientation: '',

        }

    }

    componentDidMount() {
        this._onLoadMore();
    }

    componentWillReceiveProps(newProps) {
        const {hasData, listRaces, loading, actionType} = newProps;
        const {orientation, sourceData} = this.state;
        const {next_id, items} = listRaces;

        if (hasData && this.props.loading !== loading)
            if (actionType === GET_SEARCH_RACES) {

                var newData;
                if (orientation === FUTURE ||
                    orientation === MONTH) {
                    newData = sourceData.concat(items);
                    if (strNotNull(next_id))
                        this.setState({
                            futureMonthNum: next_id
                        })
                } else if (orientation === HISTORY) {
                    items.forEach(function (e) {
                        sourceData.unshift(e)
                    });
                    newData = sourceData;
                    if (strNotNull(next_id))
                        this.setState({
                            historyMonthNum: next_id
                        })
                }
                let sortData = dataBlob(arrayUnique(newData));

                console.log(sortData)
                this.setState({
                    sectionDataCollection: sortData,
                    componentDataSource: this._dataSource.cloneWithRowsAndSections(sortData),
                    sourceData: newData
                });
                if (orientation === FUTURE && !isEmptyObject(this._pullToRefreshListView)) {
                    this._pullToRefreshListView.endLoadMore(false);

                } else if (orientation === HISTORY && !isEmptyObject(this._pullToRefreshListView)) {
                    this._pullToRefreshListView.endRefresh()
                } else if (orientation === MONTH && !isEmptyObject(this._pullToRefreshListView)) {
                    this._pullToRefreshListView.endRefresh()
                }


            }
    }


    _onLoadMore = () => {
        var {futureMonthNum} = this.state;

        const body = {
            seq_id: '',
            operator: FUTURE,
            begin_date: futureMonthNum
        };


        this.setState({
            orientation: FUTURE
        });
        this.props._searchRaces(body)
    };
    _onRefresh = () => {
        var {historyMonthNum} = this.state;
        const body = {
            seq_id: '',
            operator: HISTORY,
            begin_date: historyMonthNum
        };


        this.setState({
            orientation: HISTORY
        });
        this.props._searchRaces(body)
    };


    _renderSectionHeader = (sectionData, sectionID) => {


        return (
            <View style={{height:30,backgroundColor:'#202125',
            alignItems:'center',justifyContent:'center'}}>
                <Text style={[Fonts.H15,{color:'#68707D'}]}>{sectionID}</Text>
            </View>
        )
    }


    _renderRow = (rowData, sectionID, rowID, highlightRow) => {

        return (

            <RaceRowView
                rowID={rowID}
                router={router}
                rowData={rowData}/>
        )
    };
}

const headerStyle = {height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161718'};

const styles = StyleSheet.create({
    currentDate: {
        height: 24, width: 60, position: 'absolute', bottom: 22, left: (Metrics.screenWidth - 60) / 2,
        alignItems: 'center', backgroundColor: 'rgba(193,164,106,0.6)',
        borderRadius: 2, justifyContent: 'center'
    },
    currentText: {
        width:70,
        height:27
    },
    currentImg:{
        width:70,
        height:27
    }
})


const bindAction = dispatch => ({
    _searchRaces: (body) => dispatch(fetchGetSearchRaces(body))
});

const mapStateToProps = state => ({
    loading: state.RaceState.loading,
    error: state.RaceState.error,
    hasData: state.RaceState.hasData,
    actionType: state.RaceState.actionType,
    listRaces: state.RaceState.listRaces
});

export default connect(mapStateToProps, bindAction)(SearchRacesListView);