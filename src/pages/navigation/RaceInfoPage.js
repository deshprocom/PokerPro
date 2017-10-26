import React, {Component} from 'react';
import {
    View, ScrollView, StatusBar, StyleSheet, Image, TextInput,
    Text
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
import {getDispatchAction} from '../../utils/ComonHelper';
import {Loading} from '../../components';

class RaceInfoPage extends Component {
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
        isLoading: false
    };

    componentWillReceiveProps(newProps) {

        if (newProps.actionType === BACK_TOP) {
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

    _getData = () => {
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

    render() {
        const {listRace, raceTickets, hotInfos, banners, headlines} = this.state;

        return (

            <View>
                <StatusBar barStyle={this.props.barStyle ? this.props.barStyle : "light-content"}/>
                <ScrollView
                    ref={ref => this.mainScroll = ref}
                    scrollEventThrottle={16}
                    onScroll={this._onScroll}
                    showsVerticalScrollIndicator={false}
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

export default connect(mapStateToProps, bindAction)(RaceInfoPage);


