import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, Image,
    View
} from 'react-native';

import Swiper from 'react-native-swiper';
import {getMainBanners} from '../../services/NewsDao';
import I18n from 'react-native-i18n';


export default class Personal extends Component {


    state = {
        items: []
    };

    componentDidMount() {

    }

    render() {

        return (
            <View style={{height: 200}}>

            </View>
        )
    }
}