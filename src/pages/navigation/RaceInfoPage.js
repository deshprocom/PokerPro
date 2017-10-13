import React, {Component} from 'react';
import {
    View, ScrollView
}
    from 'react-native';
import Races from './Races';
import PukeNews from './PukeNews';
import Coming from './Coming';
import Information from './Information';
import MainBanner from './MainBanner';
import {getRecentRaces, getRaceTickets} from '../../services/RacesDao';
import {getHotInfos, getMainBanners, getPukeNews} from '../../services/NewsDao';
import Router from '../../configs/Router';
import {NavigationBar} from '../../components';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class RaceInfoPage extends Component {
    state = {
        listRace: [],
        raceTickets: [],
        hotInfos: [],
        banners: [],
        opacity: 0
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
            this.setState({opacity: 1});
        }
    };

    render() {
        const {listRace, raceTickets, hotInfos, banners} = this.state;

        return (

            <View>

                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={this._onScroll}
                >
                    <MainBanner
                        banners={banners}/>
                    <PukeNews/>

                    <Races
                        raceTickets={raceTickets}/>
                    <Coming
                        listRace={listRace}/>
                    <Information
                        hotInfos={hotInfos}/>

                </ScrollView>

                <NavigationBar
                    title={I18n.t('app_name')}
                    toolbarStyle={{
                        position: 'absolute',
                        top: 0,
                        backgroundColor: Colors._161,
                        opacity: this.state.opacity
                    }}/>
            </View>

        );
    }
}

