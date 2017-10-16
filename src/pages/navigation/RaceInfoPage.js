import React, {Component} from 'react';
import {
    View, ScrollView,Platform,StyleSheet,Image,TextInput,
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
import {Metrics} from '../../Themes';
import {SearchPage} from './SearchPage';


export default class RaceInfoPage extends Component {
    state = {
        listRace: [],
        raceTickets: [],
        hotInfos: [],
        banners: [],
        bgColor: 'transparent',
        opacity:0,
        headlines: [],
        next_id: '0',
        keyword: ''
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
        const offsetHeight = 200;
        let offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY <= offsetHeight - Metrics.navBarHeight) {
            let opacity = offsetY / (offsetHeight - Metrics.navBarHeight - 20);
            this.setState({opacity: opacity});
        } else {
            this.setState({
                opacity: 1
            });
        }
    };


    render() {
        const {listRace, raceTickets, hotInfos, banners, headlines} = this.state;

        return (

            <View>

                <ScrollView
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
                <SearchPage/>
            </View>

        );
    }
}


