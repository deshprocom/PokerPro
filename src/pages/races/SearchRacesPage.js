/**
 * Created by lorne on 2017/3/3.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, InteractionManager,
    StyleSheet, Image, Text, ListView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {PullListView} from '../../components';
import CalendarModal from './CalendarModal';
import {strNotNull, isEmptyObject, arrayUnique, dataBlob} from '../../utils/ComonHelper';
import {fetchSearchByDate, fetchRaceHost, fetchGetSearchRaces} from '../../actions/RacesAction';
import TestRouter from '../../components/TestRouter';
import RaceTypeView from './RaceTypeView';
import {RACE_HOSTS, GET_SEARCH_RACES} from '../../actions/ActionTypes';
import RaceRowView from '../../components/listitem/RaceRowView';
import {_renderFooter, _renderHeader} from '../../components/LoadingView';
import TimerMixin from 'react-timer-mixin';

const Forward = 'forward',
    Backward = 'backward';

class SearchRacesPage extends Component {


    constructor(props) {
        super(props);
        this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.race_id !== r2.race_id,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });


        this.operator = '';
        this.selectHosts = [];
        this.calendar = '';
        this.state = {
            showCalender: false,
            showRaceType: false,
            selectAll: false,
            dataHosts: [],
            dataRaces: [],
            first_id: 0,
            last_id: 0,
            componentDataSource: this._dataSource.cloneWithRowsAndSections({}),
        };


    }


    render() {

        return (
            <View style={styles.flatBg}
                  testID="page_more_races">

                {this.topBar()}

                {this.listView()}

                {this._renderFloatBtn()}

                {this._showCalendar()}

                {this._raceTypeView()}


            </View>
        )
    }


    _renderFloatBtn = () => {

        return <TouchableOpacity
            onPress={this._backToMonth}
            style={{
                height: 27,
                width: 70,
                backgroundColor: 'red',
                position: 'absolute',
                bottom: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                alignSelf: 'center',
                opacity:0.8,
            }}

        >

            <Image style={styles.currentImg} source={global.language === 'zh'?Images.month:Images.monthE}/>
        </TouchableOpacity>

    };


    _backToMonth = () => {

        this.setState({
            first_id: 0,
            dataRaces: [],
            componentDataSource: this._dataSource.cloneWithRowsAndSections({}),
        });

        setTimeout(this._onRefresh, 300);

    };


    listView = () => {
        return (
            <PullListView
                key="list"
                ref={(component) => this._pullToRefreshListView = component}
                viewType={PullListView.constants.viewType.listView}
                dataSource={this.state.componentDataSource}
                renderSectionHeader={this._renderSectionHeader}
                renderRow={this._renderRow}
                onRefresh={this._onRefresh}
                onLoadMore={this._onLoadMore}
                renderHeader={(viewState) => _renderHeader(viewState, headerStyle)}
                renderFooter={(viewState) => _renderFooter(viewState, headerStyle)}
                enableEmptySections={true}/>)
    };

    topBar = () => {
        return ( <View style={styles.topBar}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={[styles.topBtn, styles.topLeft]}
                onPress={this._back}>
                <Image style={styles.imgBack}
                       source={Images.sign_return}/>
            </TouchableOpacity>
            <View style={styles.topBtn}/>
            <View style={styles.topBtn}/>

            <View style={styles.titleView}>
                <Text style={styles.title}>{I18n.t('GameList')}</Text>
            </View>
            <View style={styles.topRight}>

                <TestRouter/>
                <TouchableOpacity
                    onPress={this._searchPage}
                    testID="btn_search"
                    style={styles.topBtn}>
                    <Image style={{width: 22, height: 22}}
                           source={Images.search}/>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this._pressRaceType}
                    testID="btn_race_hosts"
                    style={styles.topBtn}>
                    <Image style={{width: 22, height: 22}}
                           source={Images.race_type}/>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this._calendarView()}
                    testID="btn_calendar"
                    style={styles.topBtn}>
                    <Image style={{width: 22, height: 21}}
                           source={Images.schedule}/>

                </TouchableOpacity>


            </View>

        </View>)
    }

    _onLoadMore = () => {
        const {last_id} = this.state;

        if (last_id != 0) {
            let body = {
                seq_id: last_id,
                operator: Forward,
                host_id: this.selectHosts,
                date: ''

            };
            this.operator = Forward;

            this.props._getRaceList(body);

        }
    };

    _onRefresh = () => {
        const {first_id} = this.state;

        if (first_id !== 0) {
            let body = {
                seq_id: first_id,
                operator: Backward,
                host_id: this.selectHosts,
                date: ''
            };
            this.operator = Backward;
            this.props._getRaceList(body);

        } else {
            this.operator = '';
            this.props._getRaceList({});
        }

    };


    _renderSectionHeader = (sectionData, sectionID) => {

        return (
            <View style={{
                height: 44, backgroundColor: Colors.bg_ec,
                alignItems: 'center', justifyContent: 'center'
            }}>
                <Text style={{color: '#4b515a', fontSize: 17, marginTop: 10}}>{sectionID}</Text>
            </View>
        )
    };

    _renderRow = (rowData, sectionID, rowID) => {
        return (

            <RaceRowView
                isMoreRace={true}
                rowID={rowID}
                router={router}
                rowData={rowData}/>
        )
    };

    componentDidMount() {

        this._onRefresh();
        this.props._getRaceHost();

    }

    componentWillReceiveProps(newProps) {
        const {actionType, raceHost} = newProps;
        if (actionType === RACE_HOSTS && !isEmptyObject(raceHost)) {
            const {race_hosts} = raceHost;
            race_hosts.map(function (x) {
                x['select'] = false;
            });
            console.log('race_hosts', race_hosts)
            this.setState({
                dataHosts: race_hosts
            })
        }

        this._handleRaceList(newProps);
    }

    _handleRaceList = (newProps) => {
        const {actionType, listRaces} = newProps;

        if (actionType === GET_SEARCH_RACES && !isEmptyObject(listRaces)) {

            console.log(actionType, listRaces)
            const {dataRaces} = this.state;
            const {first_id, items, last_id} = listRaces;

            if (this.operator === Backward) {
                this._pullToRefreshListView.endRefresh();

                if (isEmptyObject(items))
                    return;
                let newData = arrayUnique(items.concat(dataRaces));
                let datas = dataBlob(newData);
                console.log('newData', datas)
                this.setState({
                    componentDataSource: this._dataSource.cloneWithRowsAndSections(datas),
                    dataRaces: newData,
                    first_id: strNotNull(first_id) ? first_id : this.state.first_id
                });

                TimerMixin.setTimeout(() => {
                    this._pullToRefreshListView._scrollView.scrollTo({
                        y: 150 * items.length,
                        animated: false,
                    });

                }, 200);


            } else if (this.operator === Forward) {
                this._pullToRefreshListView.endLoadMore(false);

                if (isEmptyObject(items))
                    return;

                let newData = arrayUnique(dataRaces.concat(items));
                let datas = dataBlob(newData);
                console.log('newData', datas)
                this.setState({
                    componentDataSource: this._dataSource.cloneWithRowsAndSections(datas),
                    dataRaces: newData,
                    last_id: strNotNull(last_id) ? last_id : this.state.last_id
                })
            } else {
                this._pullToRefreshListView.endRefresh();

                let newData = arrayUnique(items);
                let datas = dataBlob(newData);

                this.setState({
                    componentDataSource: this._dataSource.cloneWithRowsAndSections(datas),
                    dataRaces: newData,
                    first_id: first_id,
                    last_id: last_id
                })
            }


        }
    };

    _pressRaceType = () => {
        const {showRaceType} = this.state;
        this.setState({
            showRaceType: !showRaceType,
            showCalender: false
        })
    };

    _pressHostOk = () => {

        const {showRaceType, dataHosts} = this.state;

        this.setState({
            showRaceType: !showRaceType,
            showCalender: false
        });


        let selects = [];
        dataHosts.forEach(function (x) {
            if (x.select)
                selects.push(x.id);
        });
        this.selectHosts = selects;
        this._queryRaceList();

    };

    _showCalendar = () => {
        if (this.state.showCalender)
            return (<CalendarModal
                ref={ref => this.calendarModal = ref}
                selected={(date) => {

                    this.calendar = date;

                }}
                btnOpen={this._calendarView}/>)
    };

    _raceTypeView = () => {
        const {showRaceType, dataHosts, selectAll} = this.state;
        if (showRaceType)
            return (<RaceTypeView
                pressHostOk={this._pressHostOk}
                dataHosts={dataHosts}
                pressAll={this._pressAll}
                pressItem={this._pressItem}
                selectAll={selectAll}
            />)
    };

    _pressAll = () => {
        const {selectAll} = this.state;
        this.setState((state) => {
            const newData = [...state.dataHosts];
            newData.map(function (element) {
                element.select = !selectAll;
                return element;
            });

            return {
                dataHosts: newData,
                selectAll: !selectAll
            }
        })
    }

    _pressItem = (item) => {

        this.setState((state) => {
            const newData = [...state.dataHosts];
            newData.map(function (element) {
                if (item.id === element.id) {
                    element.select = !item.select;
                }
                return element;
            });

            return {dataHosts: newData}
        })
    };


    _back = () => {
        router.pop()
    };

    _searchPage = () => {
        router.toSearchKeywordPage();
    };


    _calendarView = () => {
        const {showCalender} = this.state;
        this.setState({
            showCalender: !showCalender,
            showRaceType: false
        });
        if (this.calendarModal) {

            // if (strNotNull(this.calendar)) {
            //
            //     this._queryRaceList();
            // }
        }


    };

    _queryRaceList = () => {
        const body = {
            host_id: this.selectHosts,
            date: ''
        };
        this.operator = '';
        this.props._getRaceList(body);
    }

}

const btnFloat = {
    container: {
        height: 25,
        width: 50,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 30,
        right: 20
    },
    text: {
        color: 'white'
    }
};

const headerStyle = {height: 34, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bg_ec};


const styles = StyleSheet.create({
    topBtn: {
        width: 44, height: 44, justifyContent: 'center', alignItems: 'center'
    },
    topBar: {
        width: Metrics.screenWidth, height: Metrics.navBarHeight,
        backgroundColor: Colors.bg_09,
        alignItems: 'center', flexDirection: 'row',
        paddingTop: Metrics.statusBarHeight
    },
    titleView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    title: {color: Colors.txt_E0C, fontSize: 18},
    imgBack: {height: 19, width: 11},
    topRight: {
        flexDirection: 'row',
        height: 44,
        marginRight: 10
    },
    currentDate: {
        height: 24, width: 60, position: 'absolute', bottom: 22, left: 170,
        alignItems: 'center', backgroundColor: '#AAAAAA',
        borderRadius: 2, justifyContent: 'center'
    },
    currentText: {
        fontSize: 15,
        color: Colors.txt_E0C
    },
    topLeft: {
        marginLeft: 5,
        marginRight: 5
    },
    flatBg: {
        backgroundColor: Colors.bg_ec,
        flex: 1
    },
    currentImg:{
        width:70,
        height:27,
        resizeMode:'contain'
    }

});


const bindAction = dispatch => ({
    _searchByDate: (body) => dispatch(fetchSearchByDate(body)),
    _getRaceHost: () => dispatch(fetchRaceHost()),
    _getRaceList: (body) => dispatch(fetchGetSearchRaces(body))
});

const mapStateToProps = state => ({
    loading: state.RaceState.loading,
    error: state.RaceState.error,
    hasData: state.RaceState.hasData,
    actionType: state.RaceState.actionType,
    raceHost: state.RaceState.raceHost,
    listRaces: state.RaceState.listRaces
});

export default connect(mapStateToProps, bindAction)(SearchRacesPage);