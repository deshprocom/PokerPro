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

export default class PokerRacePage extends Component {
    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <RaceView/>

        </View>)
    }
}