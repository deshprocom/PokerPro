/**
 * Created by lorne on 2017/1/24.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {GET_RACE_INFO, SUB_RACES, RACE_RANKS} from '../../actions/ActionTypes';
import {
    fetchRacesInfo, fetchSubRaces,
    fetchRaceRanks, _getRacesInfo
} from '../../actions/RacesAction';
import RaceInfoBottomView from './RaceInfoBottomView';
import {
    strNotNull, sellable, isEmptyObject, YYYY_MM_DD,
    raceStatusConvert, ticketStatusConvert, convertDate,
    strValid, uShareRace
} from '../../utils/ComonHelper';
import TestRouter from '../../components/TestRouter';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RaceSideView from './RaceSideView';
import {MarkdownPlat, ImageLoad} from '../../components';
import MainRaceResultView from './MainRaceResultView';
import {umengEvent} from '../../utils/UmengEvent';


class RacesInfoPage extends Component {
    state = {
        isLoginUser: false,
        raceInfo: {},
        noBottomBar: false,
        selectPage: 0,
        subRaces: {},
        raceRanks: [],
        selectPageKey: 'page_race_info',
        schedules: [],
        blinds: []
    };


    componentDidMount() {
        console.log('Actions', this.props)
        this._fetchSideRace();
        this._refreshPage();

    }

    componentWillReceiveProps(newProps) {
        const {raceInfo, actionType, subRaces} = newProps;
        const {ranks, schedules, blinds, race} = raceInfo;

        if (actionType === GET_RACE_INFO
            && !isEmptyObject(raceInfo)) {

            this.setState({
                raceInfo: race,
                raceRanks: isEmptyObject(ranks) ? [] : ranks,
                schedules: isEmptyObject(schedules) ? [] : schedules,
                blinds: isEmptyObject(blinds) ? [] : blinds
            })
        } else if (newProps.actionType === SUB_RACES
            && !isEmptyObject(subRaces)) {

            this.setState({
                subRaces: subRaces
            })
        }

    }


    render() {


        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.white
                }}
                testID="page_race_intro">


                {this._renderNav()}

                {this._viewPager()}

                {this._bottomBar()}


            </View>
        )
    }


    _renderNav = () => {
        const {raceInfo} = this.state;
        return <Image style={styles.header}
                      resizeMode="cover"
                      source={Images.home_bg}
        >

            <View style={styles.topBar}>
                <TouchableOpacity
                    testID="btn_bar_left"
                    style={styles.popBtn}
                    onPress={() => router.pop()}>
                    <Image style={styles.backImg}
                           source={Images.sign_return}/>
                </TouchableOpacity>
                <TestRouter refreshPage={this._refreshPage}/>

                <View style={styles.viewTitle}>
                    <Text
                        testID="txt_races_title"
                        style={styles.txtTitle}
                        numberOfLines={1}>{raceInfo.name}</Text>
                </View>
                <TouchableOpacity
                    testID="btn_bar_right"
                    style={styles.popBtn}
                    onPress={() => {
                        uShareRace(raceInfo.name, raceInfo.location +
                            '\n' + this.race_time(raceInfo),
                            raceInfo.logo,
                            this.props.params.race_id)
                    }}>
                    <Image style={styles.imgShare}
                           source={Images.share}/>
                </TouchableOpacity>


            </View>

            {isEmptyObject(raceInfo) ? null : <View style={styles.headerInfo}>
                <ImageLoad style={styles.logoImg}
                           source={{uri: raceInfo.logo}}/>
                <View style={styles.viewInfo}>
                    <View style={styles.viewTime}>
                        <Image style={styles.imgTime}
                               source={Images.home_clock}/>
                        <Text
                            testID="txt_races_period"
                            style={styles.txtTime}>{this.race_time(raceInfo)}</Text>
                    </View>
                    <View style={styles.viewLocation}>
                        <Image style={styles.imgLocation}
                               source={Images.home_adr}/>
                        <Text
                            testID="txt_races_address"
                            style={styles.txtLocation}>{raceInfo.location}</Text>
                    </View>


                    <View style={styles.viewPrice}>
                        <Text
                            testID="txt_races_status"
                            style={styles.txtStatus}>{raceStatusConvert(raceInfo.status)}</Text>

                        {raceInfo.ticket_sellable ? <Text
                            testID="txt_races_ticket"
                            style={[styles.txtStatus, styles.txtStatus1]}> {ticketStatusConvert(raceInfo.ticket_status)}</Text> : null}

                    </View>

                </View>

            </View>}

            <View style={styles.viewFlex}/>

            {this._tabBarView()}
        </Image>
    };


    _tabBarView = () => {
        const {
            selectPage, raceInfo, subRaces,
            raceRanks, selectPageKey, schedules,
            blinds
        } = this.state;
        let noBottomBar = this._hasBottomBar();
        let tabs = [];
        this.pages = [];


        tabs.push(<TouchableOpacity
            key={'btn_main_race'}
            testID="btn_main_race"
            onPress={() => this._selectPage(0)}
            style={styles.viewCenter1}>
            <Text style={selectPage === 0 ? styles.txtTabSelect : styles.txtTab}>{I18n.t('RaceIntro')}</Text>
            {selectPage === 0 ? <Image style={styles.imgTab}
                                       source={Images.race_triangle}/> :
                <View style={styles.imgTab}/>}

        </TouchableOpacity>);


        if (!isEmptyObject(raceInfo)) {
            this.pages.push(<View
                testID="page_race_info"
                key={'page_race_info'}
                style={{
                    backgroundColor: Colors.white,
                    marginBottom: noBottomBar ? 0 : 50
                }}>
                <MarkdownPlat
                    markdownStr={raceInfo.description}/>

            </View>)
        }


        if (this.pages.length > 0
            && raceRanks.length > 0
            || schedules.length > 0
            || blinds.length > 0) {

            tabs.push(<TouchableOpacity
                testID="btn_main_result"
                key={'btn_main_result'}
                onPress={() => this._selectPage(this._selectPageIndex('page_race_result'))}
                style={styles.viewCenter}>
                <Text
                    style={selectPageKey === 'page_race_result' ?
                        styles.txtTabSelect : styles.txtTab}>{I18n.t('MainInformation')}</Text>
                {selectPageKey === 'page_race_result' ?
                    <Image style={styles.imgTab}
                           source={Images.race_triangle}/> :
                    <View style={styles.imgTab}/>}

            </TouchableOpacity>);

            this.pages.push(<ScrollView
                testID="page_race_result"
                key={'page_race_result'}
                style={{
                    backgroundColor: Colors.bg_f5,
                    marginBottom: noBottomBar ? 0 : 50
                }}>
                <MainRaceResultView
                    blinds={blinds}
                    schedules={schedules}
                    raceRanks={raceRanks}/>
            </ScrollView>)
        }


        if (this.arrLength(subRaces)
            && this.pages.length > 0) {

            tabs.push(<TouchableOpacity
                testID="btn_sub_race"
                key={'btn_sub_race'}
                onPress={() => this._selectPage(this._selectPageIndex('page_race_side'))}
                style={styles.viewCenter}>
                <Text style={selectPageKey === 'page_race_side' ?
                    styles.txtTabSelect : styles.txtTab}>{I18n.t('SideInformation')}</Text>
                {selectPageKey === 'page_race_side' ?
                    <Image style={styles.imgTab}
                           source={Images.race_triangle}/> :
                    <View style={styles.imgTab}/>}

            </TouchableOpacity>);

            this.pages.push(<View
                testID="page_race_side"
                key={'page_race_side'}
                style={{
                    backgroundColor: Colors.bg_f5,
                    marginBottom: noBottomBar ? 0 : 50
                }}>
                <RaceSideView
                    raceId={this.props.params.race_id}
                    subRaces={subRaces}/>
            </View>)


        }

        return (    <View style={styles.viewTab}>

            {tabs}


        </View>)
    };

    _selectPageIndex = (key) => {
        for (let i = 0; i < this.pages.length; i++) {
            if (this.pages[i].key === key) {
                return i;
            }

        }

    };


    arrLength = (object) => {
        if (!isEmptyObject(object)) {
            const {items} = object;
            return items.length > 0
        } else
            return false;
    }


    _fetchRaceRanks = () => {
        const body = {
            race_id: this.props.params.race_id
        };
        this.props._getRaceRanks(body)
    };

    _fetchSideRace = () => {
        const body = {
            race_id: this.props.params.race_id
        };
        this.props.fetchSubRaces(body);
    }

    _refreshPage = () => {
        const {user_id} = global.login_user;
        if (strNotNull(user_id)) {
            const body = {
                user_id: user_id,
                race_id: this.props.params.race_id
            };
            this.setState({
                isLoginUser: true
            });

            this.props._fetchRacesInfo(body);
        } else {
            const body = {
                user_id: 0,
                race_id: this.props.params.race_id
            };
            this.setState({
                isLoginUser: false
            });

            this.props._fetchRacesInfo(body);
        }

    };

    _bottomBar = () => {
        const {isLoginUser, raceInfo} = this.state;

        const {ticket_status, ticket_sellable} = raceInfo;

        if (!this.props.params.fromBuy && sellable(ticket_status, ticket_sellable))
            return (    <RaceInfoBottomView
                raceInfo={raceInfo}
                onPress={() => {
                    umengEvent('race_buy_ticket');
                    router.toChoiseTicketPage(this.props, this.props.params.race_id);

                }}/>)
    };

    _selectPage = (index) => {
        umengEvent(index === 1 ? 'race_main_info' : 'race_side_info');
        this.viewpage.goToPage(index);
    };


    _viewPager = () => {

        return ( <ScrollableTabView
            onChangeTab={({i}) => {
                if (i == undefined || i < 0)
                    return;


                let pageKey;
                if (!isEmptyObject(this.pages[i]))
                    pageKey = this.pages[i].key;

                this.setState({
                    selectPage: i,
                    selectPageKey: pageKey
                })
            }}
            renderTabBar={false}
            style={styles.container}
            ref={ref => this.viewpage = ref}>

            {this.pages}


        </ScrollableTabView>)
    };


    _hasBottomBar = () => {
        const {raceInfo} = this.state;
        const {ticket_status, ticket_sellable} = raceInfo;
        return this.props.params.fromBuy || !sellable(ticket_status, ticket_sellable);
    }

    race_time = (raceInfo) => {
        if (isEmptyObject(raceInfo))
            return;
        let begin = convertDate(raceInfo.begin_date, YYYY_MM_DD);
        let end = convertDate(raceInfo.end_date, YYYY_MM_DD);
        return begin + '-' + end;
    }
}


const bindAction = dispatch => ({
        _fetchRacesInfo: (body) => dispatch(fetchRacesInfo(body)),
        fetchSubRaces: (body) => dispatch(fetchSubRaces(body)),
        _getRaceRanks: (body) => dispatch(fetchRaceRanks(body)),
        _getRacesInfo: () => dispatch(_getRacesInfo())
    })
;

const mapStateToProps = state => ({
    loading: state.RaceState.loading,
    error: state.RaceState.error,
    hasData: state.RaceState.hasData,
    actionType: state.RaceState.actionType,
    raceInfo: state.RaceState.raceInfo,
    subRaces: state.RaceState.subRaces,
    raceRanks: state.RaceState.raceRanks
});

export default connect(mapStateToProps, bindAction)(RacesInfoPage);


const styles = StyleSheet.create({
    tabBar: {
        borderColor: Colors.white,
        height: 40
    },
    tabStyle: {
        paddingBottom: 0,

    },
    underlineStyle: {
        backgroundColor: '#161718',
    },
    container: {
        flex: 1
    },
    header: {
        height: 220,
        backgroundColor: 'transparent',
        width: Metrics.screenWidth
    },
    topBar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Metrics.statusBarHeight
    },
    popBtn: {
        height: 40,
        width: 50,
        justifyContent: 'center'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    txtTitle: {
        fontSize: 16,
        color: Colors.white
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    logoImg: {
        height: 104,
        width: 80,
        marginLeft: 15
    },
    viewInfo: {
        marginLeft: 17,
        marginTop: 4
    },
    imgTime: {
        height: 10,
        width: 10
    },
    imgLocation: {
        height: 11,
        width: 8
    },
    viewTime: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    txtTime: {
        color: '#cccccc',
        fontSize: 13,
        marginLeft: 7
    },
    txtLocation: {
        color: '#cccccc',
        fontSize: 13,
        marginLeft: 7
    },
    txtLabel: {
        fontSize: 15,
        color: '#D2C476'
    },
    txtPrice: {
        fontSize: 15,
        color: '#D2C476'
    },
    viewPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    txtStatus: {
        fontSize: 10,
        height: 17,
        color: '#AAAAAA',
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 2,
        justifyContent: 'center',
        paddingTop: 2,
        paddingLeft: 2,
        paddingRight: 2
    },
    txtStatus1: {
        marginLeft: 13
    },
    viewTab: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    viewCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25
    },
    imgTab: {
        height: 8,
        width: 16
    },
    txtTab: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 10
    },
    txtTabSelect: {
        fontSize: 16,
        color: '#cccccc',
        marginBottom: 10
    },
    viewCenter1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    viewFlex: {
        flex: 1
    },
    viewTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgShare: {
        height: 22,
        width: 23,
        marginRight: 24.8
    }


});