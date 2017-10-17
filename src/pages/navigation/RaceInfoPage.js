import React, {Component} from 'react';
import {
    View, ScrollView, Platform, StyleSheet, Image, TextInput,
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
import BackTop from './BackTop';
import {SearchPage} from './SearchPage';


export default class RaceInfoPage extends Component {
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
        informationY:0
    };

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
                banners: data.banners
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
        if (this.backTop)
            this.backTop.onScroll(event);
    };

    render() {
        const {listRace, raceTickets, hotInfos, banners, headlines} = this.state;

        return (

            <View>

                <ScrollView
                    ref={ref=>this.mainScroll = ref}
                    scrollEventThrottle={16}
                    onScroll={this._onScroll}
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

                </ScrollView>
                <SearchPage
                    ref={ref => this.searchBar = ref}/>
                <BackTop
                    scrollToTop={()=>{
                        this.mainScroll.scrollTo({x: 0, y: 0, animated: false})
                    }}
                    ref={scroll => this.backTop = scroll}
                />
            </View>

        );
    }
}


