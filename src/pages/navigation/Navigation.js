import React, {Component} from 'react';
import {Scene, Stack, Tabs} from 'react-native-router-flux';
import TabHomePage from './TabHomePage';
import Personal from './Personal';
import {
    StyleSheet
} from 'react-native';
import VideoNewsTab from './VideoNewsTab';
import CustomTabBar from './BottomNavigation';
import Discover from '../socials/Discover';
import Square from '../socials/Square';


export const Navigation = () => {


    return (
        <Tabs
            type="reset"
            style={styles.tabs}
            lazy
            key="Navigation"
            showLabel={false}
            tabBarPosition={'bottom'}
            swipeEnabled={false}
            tabBarComponent={CustomTabBar}
        >
            <Stack
                key="tab_1"
            >
                <Scene
                    key="tab_home"
                    component={TabHomePage}
                    hideNavBar
                />
            </Stack>
            <Stack key="tab_2">
                <Scene key="tab_news"
                       component={VideoNewsTab}
                       hideNavBar

                />
            </Stack>

            <Stack key="tab_3">
                <Scene key="tab_discover"
                       component={Discover}
                       hideNavBar
                />
            </Stack>
            <Stack key="tab_4">
                <Scene key="tab_person"
                       component={Personal}
                       hideNavBar
                />
            </Stack>
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