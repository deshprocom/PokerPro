/**
 * Created by lorne on 2017/7/26.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import RaceView from './RaceView';
import RankListView from './RankListView';
import {getRacesInfo} from '../../../services/RacesDao';

export default class PokerRacePage extends Component {

    state = {
        race: {},
        ranks: []
    };

    componentDidMount() {
        const {race_id} = this.props.params;

        const body = {
            race_id: race_id
        };
        getRacesInfo(body, data => {
            this.setState({
                race: data,
                ranks: data.ranks
            })
        }, err => {
        })
    }

    render() {
        const {race, ranks} = this.state;
        return (<View style={ApplicationStyles.bgContainer}>
            <RaceView
                race={race}/>
            <RankListView
                ranks={ranks}/>

        </View>)
    }
}