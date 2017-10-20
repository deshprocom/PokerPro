import React, {Component} from 'react';
import {Scene, Stack, Tabs} from 'react-native-router-flux';
import RaceInfoPage from './RaceInfoPage';
import Personal from './Personal';
import {
    StyleSheet
} from 'react-native';
import TabIcon from './TabIcon';
import I18n from 'react-native-i18n';
import {Images} from '../../Themes';
import VideoNewsTab from './VideoNewsTab';
import DrawerRank from '../rank/DrawerRank';
import ConstomTabBar from './BottomNavigation';


export const Navigation = () => {


    return (
        <Tabs
            style={styles.tabs}
            lazy
            key="Navigation"
            showLabel={false}
            activeBackgroundColor="rgba(255, 255, 255, 0.96)"
            inactiveBackgroundColor="rgba(255, 255, 255, 0.96)"
            tabBarPosition={'bottom'}
            swipeEnabled={false}
            tabBarComponent={ConstomTabBar}
        >
            <Stack
                key="tab_1"
            >
                <Scene
                    key="tab_home"
                    component={RaceInfoPage}
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
                <Scene key="tab_rank"
                       component={DrawerRank}
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