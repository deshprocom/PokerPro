import React, {Component} from 'react';
import {Scene, Stack, Tabs} from 'react-native-router-flux';
import RaceInfoPage from './RaceInfoPage';
import Personal from './Personal';
import {
    StyleSheet
} from 'react-native';
import VideoNewsTab from './VideoNewsTab';
import DrawerRank from '../rank/DrawerRank';
import CustomTabBar from './BottomNavigation';


export const Navigation = () => {


    return (
        <Tabs
            style={styles.tabs}
            lazy
            key="Navigation"
            showLabel={false}
            tabBarPosition={'bottom'}
            swipeEnabled={false}
            tabBarComponent={CustomTabBar}
        >

                <Scene
                    key="tab_home"
                    component={RaceInfoPage}
                    hideNavBar
                />


                <Scene key="tab_news"
                       component={VideoNewsTab}
                       hideNavBar

                />


                <Scene key="tab_rank"
                       component={DrawerRank}
                       hideNavBar

                />


                <Scene key="tab_person"
                       component={Personal}
                       hideNavBar
                />

        </Tabs>
    );
};
const styles = StyleSheet.create({
    tabs: {
        height: 50
    },
    textStyle: {
        color: '#AAAAAA'
    },
    textStyle2: {
        color: '#161718'
    },
    bgHomeStyle: {
        height: 24,
        width: 24
    },
    bgInformationStyle: {
        width: 17,
        height: 23
    },
    bgRankStyle2: {
        height: 25,
        width: 25
    }
})