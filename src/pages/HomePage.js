/**
 * Created by lorne on 2016/12/27.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, ListView,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, Platform
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import {openDrawer} from '../reducers/DrawerRedux';
import StorageKey from '../configs/StorageKey';
import {fetchGetProfile} from '../actions/PersonAction';
import {FETCH_SUCCESS, GET_PROFILE, GET_RECENT_RACES} from '../actions/ActionTypes';
import I18n from 'react-native-i18n';
import {init} from '../services/ConfigDao';
import {fetchGetRecentRaces, _getProfileOk} from '../actions/RacesAction';
import ListViewForRaces from '../components/listitem/ListViewForRaces';
import {LoadErrorView, LoadingView, NoDataView} from '../components/load'
import {isEmptyObject, strNotNull, putLoginUser, getUserData, updateApp} from '../utils/ComonHelper';
import {NavigationBar, ParallaxScrollView} from '../components';
import JpushHelp from '../services/JpushHelper';
import {umengEvent} from '../utils/UmengEvent';
import {getActivityPush} from '../services/AccountDao';
import ActivityModel from './message/ActivityModel';

var maxDown = 0;

class HomePage extends Component {


    constructor(props) {

        super(props);
        this.state = {
            user_id: '',
            languageChange: false,
            opacity: 0,
            badge: false,

        };
        getUserData();
        init(() => {
            this.setState({
                languageChange: true
            });
        });

    }

    componentDidMount() {
        JpushHelp.addPushListener(this.receiveCb, this.openCb);
        this._refreshPage();
        //首页活动
        this._getPushActivity();


    }


    _getPushActivity = () => {
        storage.load({key: StorageKey.Activity})
            .then(ret => {
                getActivityPush(data => {
                    const {activity} = data;
                    if (ret.id === activity.id && ret.updated_time === activity.updated_time)
                        return;
                    if (this.activityModel)
                        this.activityModel.setData(data.activity)
                    storage.save({
                        key: StorageKey.Activity,
                        rawData: data.activity
                    })
                }, err => {

                })

            }).catch(err => {
            getActivityPush(data => {
                if (this.activityModel)
                    this.activityModel.setData(data.activity)
                storage.save({
                    key: StorageKey.Activity,
                    rawData: data.activity
                })
            }, err => {

            })
        })

    };

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

                let { user_id} = ret;

                this.setState({
                    user_id: user_id
                });
                this.props._getProfile(user_id);

                const recentRaces = {
                    user_id: user_id,
                    number: 8
                };
                this.props._getRecentRaces(recentRaces);


            }).catch(err => {

            const recentRaces = {
                number: 8
            };
            this.props._getRecentRaces(recentRaces)
        })
    }

    _showListView = (listRaces) => {

        if (listRaces != undefined && listRaces.length > 0) {
            return ( <ListViewForRaces
                dataSource={listRaces}
            />)
        } else {
            return (
                <NoDataView
                    pageStyle={{backgroundColor: 'white'}}/>)
        }

    };

    _loadErrorPage = () => {
        return (<LoadErrorView
            pageStyle={{backgroundColor: 'white'}}
            onPress={() => this._refreshPage()}/>)
    };


    _onScroll = (event) => {
        let offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY <= 232 - Metrics.navBarHeight) {
            let opacity = offsetY / (232 - Metrics.navBarHeight - 20);
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
                    style={styles.txtNick}>{nickname}</Text>
            );
        else
            return (
                <TouchableOpacity
                    testID="btn_to_login"
                    onPress={() => {
                        router.toLoginFirstPage()
                    }}>
                    <Text
                        style={styles.txtNick}>{I18n.t('log_register')}</Text>
                </TouchableOpacity>
            )
    };

    toMessagePage = () => {

        umengEvent('home_notification');
        if (isEmptyObject(login_user)) {
            router.toLoginFirstPage()
        } else {
            this.setState({
                badge: false
            });
            JpushHelp.iosSetBadge(0);
            router.toMessageCenter()
        }

    };

    render() {

        const {profile, router, error, loading, hasData, actionType, listRaces} = this.props;
        const {opacity, badge} = this.state;

        return (

            <View
                style={ApplicationStyles.bgContainer}
                testID="home_page">

                <View style={[styles.topBar, {backgroundColor: 'rgba(0,0,0,' + opacity + ')'}]}>
                    <StatusBar barStyle="light-content"/>
                    <TouchableOpacity
                        testID="btn_bar_left"
                        onPress={() => {
                            umengEvent('home_side');
                            this.props.openDrawer()
                        }}
                        style={styles.topBtn}
                        activeOpacity={1}>
                        <Image
                            source={Images.home_more}
                            style={styles.topImgLeft}/>

                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                    <Text style={{
                        color: 'rgba(244,227,161,' + opacity + ')',
                        fontSize: Fonts.size.h17
                    }}>{I18n.t('app_name')}</Text>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        testID="btn_bar_right"
                        onPress={this.toMessagePage}
                        style={styles.topBtn}
                        activeOpacity={1}>
                        <Image
                            style={styles.topImgRight}
                            source={badge ? Images.home_badge : Images.home_notification}/>

                    </TouchableOpacity>


                </View>
                <ParallaxScrollView
                    contentBackgroundColor="#ECECEE"
                    fadeOutForeground={false}
                    fadeOutBackground={false}
                    renderBackground={() => <View style={{
                        height: 300, width: Metrics.screenWidth,
                    }}>
                        <Image
                            style={styles.homeImg}
                            source={Images.home_img}/>
                    </View>}
                    renderForeground={() => <View>
                        <View
                            style={styles.homeImg}/>

                        <Image
                            style={styles.imgHead}
                            source={Images.home_head}/>

                        <TouchableOpacity
                            style={styles.btnAvatar}
                            activeOpacity={1}
                            onPress={this._btnHeader}>
                            <View
                                style={styles.viewAvatar}>
                                <Image style={styles.avatar}
                                       source={strNotNull(profile.avatar) ?
                                           {uri: profile.avatar} : Images.home_avatar}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            backgroundColor: 'white',
                            height: 100
                        }}>
                            < View style={styles.viewNick}>
                                {this._showNick(profile.nick_name)}

                                <Text style={styles.txtSign}>{profile.signature ? profile.signature :
                                    I18n.t('ple_sign')}</Text>
                            </View>
                        </View>


                    </View>}
                    parallaxHeaderHeight={300}
                    onScroll={this._onScroll}>


                    {/*功能模块*/}
                    <View style={{backgroundColor: 'white'}}>
                        <View style={styles.menu}>
                            <TouchableOpacity
                                testID="btn_home_ticket"
                                onPress={() => {
                                    umengEvent('home_ticket');
                                    router.toTicketPage()
                                }}
                                style={[{marginLeft: 53}, styles.item_center]}>
                                <Image style={styles.gif_fuc}
                                       source={Images.home_ticket1}/>
                                <Text style={styles.txtMenu}>{I18n.t('home_ticket')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                testID="btn_home_news"
                                onPress={() => {
                                    umengEvent('home_news');
                                    router.toMainNewsPage()
                                }}
                                style={styles.item_center}>
                                <Image style={styles.gif_fuc}
                                       source={Images.home_news}/>
                                <Text style={styles.txtMenu}>{I18n.t('home_info')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                testID="btn_home_video"
                                onPress={() => {
                                    umengEvent('home_videos');
                                    router.toVideoPage()
                                }}
                                style={styles.item_center}>
                                <Image style={styles.gif_fuc}
                                       source={Images.home_video1}/>
                                <Text style={styles.txtMenu}>{I18n.t('home_video')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                testID="btn_home_sort"
                                onPress={() => {
                                    umengEvent('home_ranking');
                                    router.toDrawerRank()
                                }}
                                style={[{marginRight: 53}, styles.item_center]}>
                                <Image style={styles.gif_fuc}
                                       source={Images.home_sort1}/>
                                <Text style={styles.txtMenu}>{I18n.t('home_sort')}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.viewRace}>
                        <View style={styles.viewRecent}>
                            <Image style={styles.imgFire}
                                   source={Images.home_fire}/>
                            <Text style={styles.txtRace}>
                                {I18n.t('home_recent_races')}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.btnMore}
                            testID="btn_more_races"
                            onPress={() => {
                                umengEvent('home_more');
                                router.toSearchRacesPage()
                            }}>
                            <Image style={styles.imgMore}
                                   source={Images.more}/>
                        </TouchableOpacity>


                    </View>


                    {this._showLoading()}
                    {/*赛事列表*/}
                    {!loading && error ? this._loadErrorPage()
                        : this._showListView(listRaces)}


                </ParallaxScrollView>

                <ActivityModel
                    ref={ref => this.activityModel = ref}/>
            </View>
        )
    }


    _btnHeader = () => {
        const {profile} = this.props;
        if (isEmptyObject(profile))
            router.toLoginFirstPage();
        else {

            if (strNotNull(profile.avatar)) {
                avatar = [{url: profile.avatar}];
                router.toImageGalleryPage( avatar, 0);
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
        height: 27,
        width: 27
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
    homeImg: {
        height: 229,
        width: Metrics.screenWidth
    },
    btnAvatar: {
        position: 'absolute',
        zIndex: 3,
        left: 15,
        top: 176
    },
    txtNick: {
        fontSize: Fonts.size.h17,
        color: '#333333'
    },
    txtSign: {
        fontSize: Fonts.size.h12,
        color: '#888888',
        marginTop: 10
    },
    viewNick: {
        marginLeft: 130,
        marginTop: 10,
        backgroundColor: 'white'

    },
    viewAvatar: {
        height: 106,
        width: 106,
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 53
    },
    avatar: {
        height: 95,
        width: 95,
        borderRadius: 47.5
    },
    menu: {
        height: 78,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 14,
        marginBottom: 20
    },
    txtMenu: {
        fontSize: Fonts.size.h14,
        color: '#333333',
        marginTop: 8
    },
    viewRace: {
        height: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ececee',
        paddingRight: 15,
        paddingLeft: 15
    },
    imgFire: {
        height: 16,
        width: 12
    },
    txtRace: {
        fontSize: Fonts.size.h15,
        color: '#333333',
        marginLeft: 5
    },
    viewRecent: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    imgMore: {
        height: 13,
        width: 60
    },
    btnMore: {
        height: 42,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewUser: {
        height: 150,
        width: Metrics.screenWidth,
        flexDirection: 'row'
    },
    imgHead: {
        height: 91,
        width: Metrics.screenWidth,
        position: 'absolute',
        zIndex: 2,
        top: 146,
    }
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
