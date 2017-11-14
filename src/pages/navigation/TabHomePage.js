import React, {Component} from 'react';
import {
    View, ScrollView, StyleSheet, RefreshControl
}
    from 'react-native';
import Races from './Races';
import Headlines from './Headlines';
import Coming from './Coming';
import Information from './Information';
import MainBanner from './MainBanner';
import {getRecentRaces, getRaceTickets} from '../../services/RacesDao';
import {getHotInfos, getMainBanners, getPukeNews} from '../../services/NewsDao';
import Router from '../../configs/Router';
import {connect} from 'react-redux';
import {SearchPage} from './SearchPage';
import {SHOW_BACK_TOP, HIDE_BACK_TOP, BACK_TOP} from '../../actions/ActionTypes';
import {getDispatchAction, alertRefresh} from '../../utils/ComonHelper';
import {Loading} from '../../components';
import ActivityModel from '../message/ActivityModel';
import {getActivityPush} from '../../services/AccountDao';
import StorageKey from '../../configs/StorageKey';

class TabHomePage extends Component {
    state = {
        listRace: [],
        raceTickets: [],
        hotInfos: [],
        banners: [],
        bgColor: 'transparent',
        opacity: 0,
        headlines: [],
        next_id: '0',
        keyword: '',
        informationY: 0,
        isLoading: false,
        isRefreshing: false
    };

    componentWillReceiveProps(newProps) {

        if (newProps.actionType === BACK_TOP) {
            if (this.mainScroll)
                this.mainScroll.scrollTo({x: 0, y: 0, animated: true})
        }

        if (newProps.actionType === 'SWITCH_LANGUAGE') {
            this.setState({
                isLoading: true
            });
            setTimeout(this._getData, 300)
        }
    }

    componentWillMount() {
        this.router = this.router || new Router();
        global.router = this.router;

    }

    componentDidMount() {
        setTimeout(this._getData, 300)
    }

    _getPushActivity = () => {
        storage.load({key: StorageKey.Activity})
            .then(ret => {
                getActivityPush(data => {
                    const {activity} = data;
                    if (ret.id === activity.id && ret.updated_time === activity.updated_time)
                        return;
                    if (this.activityModel)
                        this.activityModel.setData(data.activity);
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

    _getData = () => {

        this._getPushActivity();
        getMainBanners(data => {
            this.setState({
                banners: data.banners,
                isLoading: false
            });

        }, err => {

        });

        getPukeNews(data => {
            console.log('headlines', data)
            this.setState({
                headlines: data.headlines
            })
        }, err => {
        });

        getRecentRaces({number: 10}, data => {
            console.log('listRace', data)
            this.setState({
                listRace: data.items
            })
        }, err => {

        });
        getRaceTickets({number: 10}, data => {
            console.log('raceTickets', data)
            this.setState({
                raceTickets: data.items
            })
        }, err => {

        });
        getHotInfos(data => {
            this.setState({
                hotInfos: data.hot_infos
            })

        }, err => {
            setTimeout(() => {
                alertRefresh(this._getData)
            }, 2000)

        })
    };

    _onScroll = (event) => {
        if (this.searchBar)
            this.searchBar.onScroll(event);

        this.onTopScroll(event);
    };


    onTopScroll = (event) => {
        const offsetHeight = 720;
        let offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY >= offsetHeight) {

            getDispatchAction()[SHOW_BACK_TOP]()
        } else {

            getDispatchAction()[HIDE_BACK_TOP]()
        }
    };


    _onRefresh = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this._getData();
            this.setState({isRefreshing: false});
        }, 1000)
    };

    render() {
        const {listRace, raceTickets, hotInfos, banners, headlines} = this.state;

        return (

            <View>

                <ScrollView
                    ref={ref => this.mainScroll = ref}
                    scrollEventThrottle={16}
                    onScroll={this._onScroll}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                    />}
                >
                    <MainBanner
                        banners={banners}/>
                    <Headlines
                        headlines={headlines}/>

                    <Races
                        raceTickets={raceTickets}/>
                    <Coming
                        listRace={listRace}/>
                    <Information
                        hotInfos={hotInfos}/>
                    <View style={{height: 48}}/>

                </ScrollView>
                <SearchPage
                    unread={this.props.unread}
                    ref={ref => this.searchBar = ref}/>

                <ActivityModel
                    ref={ref => this.activityModel = ref}/>

                <Loading visible={this.state.isLoading}/>
            </View>

        );
    }
}


const bindAction = dispatch => ({});

const mapStateToProps = state => ({

    actionType: state.AccountState.actionType,
    unread: state.AccountState.unread,
});

export default connect(mapStateToProps, bindAction)(TabHomePage);


