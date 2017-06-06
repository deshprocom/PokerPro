/**
 * Created by lorne on 2016/12/27.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, ListView,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, Platform
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import {openDrawer} from '../reducers/DrawerRedux';
import StorageKey from '../configs/StorageKey';
import {setAccessToken, getBaseURL, getApiType} from '../services/RequestHelper';
import {fetchGetProfile} from '../actions/PersonAction';
import {FETCH_SUCCESS, GET_PROFILE, GET_RECENT_RACES} from '../actions/ActionTypes';
import I18n from 'react-native-i18n';
import {init} from '../services/ConfigDao';
import {fetchGetRecentRaces, _getProfileOk} from '../actions/RacesAction';
import ListViewForRaces from '../components/listitem/ListViewForRaces';
import LoadErrorPage from '../components/ListNoDataPage';
import ListNoDataPage from '../components/ListErrorPage';
import {isEmptyObject, strNotNull, putLoginUser, developing} from '../utils/ComonHelper';
import {NavigationBar, ParallaxScrollView} from '../components';
import {LoadingView} from '../components/load';
import JpushHelp from '../services/JpushHelper';
import TestRouter from '../components/TestRouter';

var maxDown = 0;

class HomePage extends Component {

    static propTypes = {
        router: PropTypes.object
    }

    constructor(props) {

        super(props);
        this.state = {
            user_id: '',
            languageChange: false,
            opacity: 0,
            badge: false

        };

        init(() => {
            this.setState({
                languageChange: true
            })
        })

    }

    componentDidMount() {
        if (Platform.OS === 'android') {

        }
        JpushHelp.addPushListener(this.receiveCb, this.openCb);
        this._refreshPage();

    }

    componentWillUnmount() {
        JpushHelp.removePushListener();
    }

    receiveCb = (notification) => {
        const {aps} = notification;
        if (aps.badge > 0) {
            this.setState({
                badge: true
            })
        }
    };

    openCb = (notification) => {
    };

    _refreshPage() {
        storage.load({key: StorageKey.LoginUser})
            .then(ret => {
                router.log(ret);
                let {access_token, user_id} = ret;
                putLoginUser(ret);
                setAccessToken(access_token);
                getBaseURL();
                this.setState({
                    user_id: user_id
                });
                this.props._getProfile(user_id);

                const recentRaces = {
                    user_id: user_id,
                    number: 5
                };
                this.props._getRecentRaces(recentRaces);

            }).catch(err => {
            getBaseURL();
            const recentRaces = {
                number: 5
            };
            this.props._getRecentRaces(recentRaces)
        })
    }

    _showListView = (listRaces) => {

        if (listRaces != undefined && listRaces.length > 0) {
            return ( <ListViewForRaces
                dataSource={listRaces}
                router={this.props.router}
            />)
        } else {
            return (
                <ListNoDataPage/>)
        }

    };

    _loadErrorPage = () => {
        return (<LoadErrorPage
            btnRefresh={()=>this._refreshPage()}/>)
    }


    _userIdView = (profile) => {
        return (
            <View style={styles.person_feature}>
                <Text style={styles.person_id}>ID:</Text>
                <Text style={styles.person_id}>{profile.user_name}</Text>
                <Text style={styles.person_honer}></Text>
            </View>
        )
    }


    _onScroll = (event) => {
        var offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY <= 232 - Metrics.navBarHeight) {
            var opacity = offsetY / (232 - Metrics.navBarHeight - 20);
            this.setState({opacity: opacity});
        } else {
            this.setState({opacity: 1});
        }

        if (offsetY <= -100) {
            maxDown = -120;
        }

        if (maxDown == -120 && offsetY == 0) {
            maxDown = 0;
            const recentRaces = {
                user_id: this.state.user_id,
                number: 5
            };
            this.props._getRecentRaces(recentRaces);
        }
    };

    _showNick = (nickname) => {
        if (strNotNull(nickname))
            return (
                <Text
                    testID="lb_nickname"
                    style={styles.person_nick}>{nickname}</Text>
            )
        else
            return (
                <TouchableOpacity
                    testID="btn_to_login"
                    onPress={()=>{
                                this.props.router.toLoginFirstPage()
                            }}>
                    <Text
                        style={styles.person_nick}>{I18n.t('log_register')}</Text>
                </TouchableOpacity>
            )
    };

    toMessagePage = () => {

        if (isEmptyObject(login_user)) {
            router.toLoginFirstPage()
        } else {
            this.setState({
                badge: false
            });
            JpushHelp.iosSetBadge(0);
            router.toMessagePage()
        }

    };

    render() {

        const {profile, router, error, loading, hasData, actionType, listRaces} = this.props;
        const {opacity, badge} = this.state;

        return (
            <View
                style={ {flex:1,backgroundColor:Colors.bg_09}}
                testID="home_page">

                <View style={[styles.topBar,{ backgroundColor: 'rgba(0,0,0,'+opacity+')'}]}>
                    <StatusBar barStyle="light-content"/>
                    <TouchableOpacity
                        testID="btn_bar_left"
                        onPress={()=>this.props.openDrawer()}
                        style={styles.topBtn}
                        activeOpacity={1}>
                        <Image
                            source={Images.home_more}
                            style={styles.topImgLeft}/>

                    </TouchableOpacity>
                    <TestRouter refreshPage={this._refreshPage}/>
                    <View style={{flex:1}}/>
                    <TouchableOpacity
                        testID="btn_bar_right"
                        onPress={this.toMessagePage}
                        style={styles.topBtn}
                        activeOpacity={1}>
                        <Image
                            style={styles.topImgRight}
                            source={badge?Images.home_badge:Images.home_notification}/>

                    </TouchableOpacity>


                </View>


                <ParallaxScrollView
                    fadeOutForeground={false}
                    fadeOutBackground={false}
                    contentBackgroundColor="#191b1e"
                    renderBackground={()=>  <Image style={{height:260,width:Metrics.screenWidth}}
                               source={Images.home_bg}/>}
                    renderForeground={()=>  <View style={styles.person_view}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={this._btnHeader}>
                            <Image
                            style={{height:101,width:101,
                            alignItems:'center',justifyContent:'center'}}
                                   source={Images.home_def_harid}>
                                <Image style={{height:82,width:82,
                                borderRadius:41}}
                                       source={strNotNull(profile.avatar)?
                                           {uri:profile.avatar}:Images.home_avatar}
                                />
                            </Image>
                      </TouchableOpacity>

                            {this._showNick(profile.nick_name)}

                            <Text style={styles.person_sign}
                            >{profile.signature ? profile.signature :
                                I18n.t('ple_sign')}</Text>
                            {/*ID 称号*/}
                            {isEmptyObject(profile) ? null : this._userIdView(profile)}

                        </View>}
                    parallaxHeaderHeight={260}
                    onScroll={this._onScroll}>


                    {/*功能模块*/}
                    <View style={styles.home_modules}>
                        <TouchableOpacity
                            testID="btn_home_ticket"
                            onPress={()=>router.toTicketPage()}
                            style={[{marginLeft:53},styles.item_center]}>
                            <Image style={styles.gif_fuc}
                                   source={Images.home_ticket}/>
                            <Text style={styles.text_fuc}>{I18n.t('home_ticket')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            testID="btn_home_news"
                            onPress={()=>router.toMainNewsPage()}
                            style={styles.item_center}>
                            <Image style={styles.gif_fuc}
                                   source={Images.home_new}/>
                            <Text style={styles.text_fuc}>{I18n.t('home_info')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            testID="btn_home_video"
                            onPress={()=>router.toVideoPage()}
                            style={styles.item_center}>
                            <Image style={styles.gif_fuc}
                                   source={Images.home_video}/>
                            <Text style={styles.text_fuc}>{I18n.t('home_video')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            testID="btn_home_sort"
                            onPress={developing}
                            style={[{marginRight:53},styles.item_center]}>
                            <Image style={styles.gif_fuc}
                                   source={Images.home_sort}/>
                            <Text style={styles.text_fuc}>{I18n.t('home_sort')}</Text>
                        </TouchableOpacity>

                    </View>


                    <View style={{height:20,backgroundColor:Colors.bg_09}}/>

                    {/*我的赛事*/}
                    <View style={{backgroundColor:Colors.bg_09}}>
                        {/*    <View style={styles.home_list1}>

                         <View style={{flexDirection:'row'}}>
                         <Image style={{height:15,width:24,
                         marginRight:21,alignSelf:'flex-end'}}
                         source={Images.home_left_click}/>
                         <Image style={{height:22,width:25}}
                         source={Images.home_poker}/>
                         <Image style={{height:16,width:67,alignSelf:'flex-end'}}
                         source={Images.home_typeface}/>
                         <Image style={{height:15,width:24,
                         marginLeft:21,alignSelf:'flex-end'}}
                         source={Images.home_right_click}/>
                         </View>
                         </View>*/}

                        <Image style={{height:54,
                        justifyContent:'space-between',
                        flexDirection:'row',
                        width:Metrics.screenWidth}}
                               source={Images.home_bg_races}>
                            <View
                                style={[styles.recent_races,
                                {marginLeft:17,marginTop:12}]}>

                                <Image style={{height:19,width:14}}
                                       source={Images.home_match}/>
                                <Text style={styles.txtRecent}>
                                    {I18n.t('home_recent_races')}</Text>

                            </View>
                            <TouchableOpacity
                                testID="btn_more_races"
                                onPress={()=>this.props.router.toSearchRacesPage()}
                                style={[styles.recent_races,
                            {marginRight:17,marginTop:12}]}>
                                <Image style={{height:9,width:35}}
                                       source={Images.home_more_one}/>
                                <Image style={{height:11,width:8,marginLeft:5}}
                                       source={Images.home_open}/>
                            </TouchableOpacity>
                        </Image>
                    </View>


                    {this._showLoading()}
                    {/*赛事列表*/}
                    {!loading && error ? this._loadErrorPage()
                        : this._showListView(listRaces)}


                </ParallaxScrollView>

            </View>
        )
    }


    _btnHeader = () => {
        const {profile} = this.props;
        if (isEmptyObject(profile))
            this.props.router.toLoginFirstPage();
        else {

            if (strNotNull(profile.avatar)) {
                avatar = [{url: profile.avatar}];
                router.toImageGalleryPage(this.props, avatar, 0);
            }


        }

    }

    _showLoading = () => {
        const {loading, actionType} = this.props;
        if (actionType === GET_RECENT_RACES && loading) {
            return (<LoadingView/>)
        }
    }
}

const styles = StyleSheet.create({
    home_list1: {
        flex: 0,
        height: 60,
        paddingTop: 5,
        backgroundColor: '#090909',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    home_item: {
        flex: 1,
    },
    home_row: {
        flexDirection: 'row',
        flex: 1
    },
    home_modules: {
        height: 78,
        backgroundColor: '#090909',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    person_view: {
        alignItems: 'center',
        marginTop: Metrics.navBarHeight
    },
    person_nick: {
        marginTop: 8,
        color: Colors.txt_CCCCCC,
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    person_sign: {
        color: '#999999',
        fontSize: 12,
        marginTop: 10,
        backgroundColor: 'transparent'
    },
    person_feature: {
        flexDirection: 'row',
        marginTop: 6,
    },
    person_id: {
        color: '#666666',
        fontSize: 11,
        backgroundColor: 'transparent'
    },
    person_honer: {
        color: 'white',
        fontSize: 12,
        backgroundColor: 'transparent'
    },
    loadingView: {
        height: 100,
        width: 100
    },
    text_fuc: {
        color: '#999999',
        fontSize: 13,
        marginTop: 10
    },
    item_center: {
        alignItems: 'center'
    },
    gif_fuc: {
        height: 30,
        width: 30
    },
    recent_races: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtRecent: {
        fontSize: Fonts.size.h15,
        color: Colors.txt_666, marginLeft: 13,
        backgroundColor: 'transparent'
    },
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 3,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight
    },
    topBtn: {
        height: 40,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topImgLeft: {height: 14, width: 18, marginLeft: 15, marginRight: 20},
    topImgRight: {height: 19, width: 17, marginRight: 15, marginLeft: 20},
});


const bindAction = dispatch => ({
    openDrawer: () => dispatch(openDrawer()),
    _getProfile: (user_id) => dispatch(fetchGetProfile(user_id)),
    _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
    _getProfileNull: () => dispatch(_getProfileOk({}))
});

const mapStateToProps = state => ({
    loading: state.HomeState.loading,
    error: state.HomeState.error,
    hasData: state.HomeState.hasData,
    actionType: state.HomeState.actionType,
    listRaces: state.HomeState.listRaces,
    profile: state.PersonState.profile,
    pageName: state.SideBarNavRedux.pageName
});

export default connect(mapStateToProps, bindAction)(HomePage);
