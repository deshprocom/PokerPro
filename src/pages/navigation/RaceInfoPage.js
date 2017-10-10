import React, {Component} from 'react';
import {
    View, Text, Button, Alert, DatePickIOS,
    Image, StyleSheet, ActivityIndicator,
    TouchableOpacity, ScrollView,
    ListView,Animated,Easing
}
    from 'react-native';
import Races from './Races';
import PukeNews from './PukeNews';
import Coming from './Coming';
import Information from './Information';
import MainBanner from './MainBanner';
import {styles} from './Styles';


export default class RaceInfoPage extends Component {

    render() {

        return (
            <ScrollView>
                <View style={styles.scrollImg}>
                    <MainBanner/>
                </View>
                <PukeNews/>

                <Races/>
                <Coming/>
                <Information/>

            </ScrollView>
        );
    }
}

