/**
 * Created by lorne on 2017/7/25.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import PokerView from './PokerView';
import RaceListView from './RaceListView';

export default class PokerRankPage extends Component {

    render() {
        const {player_id} = this.props.navigation.state.params;
        return (<View style={ApplicationStyles.bgContainer}>
            <PokerView
                playerId={player_id}/>

            <RaceListView
                playerId={player_id}/>

        </View>)
    }
}