import React, {Component} from 'react';
import {
    View, Text, Button, Alert, DatePickIOS,
    Image, StyleSheet, ActivityIndicator,
    TouchableOpacity, ScrollView,
    ListView, Animated, Easing
}
    from 'react-native';
import Races from './Races';
import PukeNews from './PukeNews';
import Coming from './Coming';
import Information from './Information';
import MainBanner from './MainBanner';
import {styles} from './Styles';
import {getRecentRaces, getRaceTickets} from '../../services/RacesDao';
import {getHotInfos} from '../../services/NewsDao';
import Router from '../../configs/Router';

export default class RaceInfoPage extends Component {
    state = {
        listRace: [],
        raceTickets: [],
        hotInfos: []
    };

    componentWillMount() {
        this.router = this.router || new Router();
        global.router = this.router;

    }

    componentDidMount() {
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

    }

    render() {
        const {listRace, raceTickets, hotInfos} = this.state;

        return (
            <ScrollView>
                <View style={styles.scrollImg}>
                    <MainBanner/>
                </View>
                <PukeNews/>

                <Races
                    raceTickets={raceTickets}/>
                <Coming
                    listRace={listRace}/>
                <Information
                    hotInfos={hotInfos}/>

            </ScrollView>
        );
    }
}

