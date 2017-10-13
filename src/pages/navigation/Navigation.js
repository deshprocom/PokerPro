import React, {Component} from 'react';
import {Scene, Stack, Tabs} from 'react-native-router-flux';
import RaceInfoPage from './RaceInfoPage';
import Personal from './Personal';
import {
    StyleSheet
} from 'react-native';
import {TabIcon} from './TabIcon';
import I18n from 'react-native-i18n';
import {Images} from '../../Themes';
import VideoNewsTab from './VideoNewsTab';
import DrawerRank from '../rank/DrawerRank';


export const Navigation = () => {


    return (
        <Tabs
            style={styles.tabs}
            lazy
            key="Navigation"
            showLabel={false}
            activeBackgroundColor="rgba(0, 0, 0, 1)"
            activeTintColor="rgba(255, 0, 0, 1)"
            inactiveBackgroundColor="rgba(0, 0, 0, 1)"
            tabBarPosition={'bottom'}
            swipeEnabled={false}
        >
            <Stack
                key="tab_1"
                tabBarLabel="TAB #1"
                inactiveBackgroundColor="#FFF"
                icon={({focused}) => focused ? TabIcon(I18n.t('home'), Images.home2, styles.textStyle2, styles.bgHomeStyle) :
                    TabIcon(I18n.t('home'), Images.home, styles.textStyle, styles.bgHomeStyle)}

                titleStyle={{color: 'white', alignSelf: 'center'}}
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
                       icon={({focused}) => focused ? TabIcon(I18n.t('home_info'), Images.information2, styles.textStyle2, styles.bgInformationStyle) :
                           TabIcon(I18n.t('home_info'), Images.information, styles.textStyle, styles.bgInformationStyle)}
                />
            </Stack>
            <Stack key="tab_3">
                <Scene key="tab_rank"
                       component={DrawerRank}
                       hideNavBar
                       icon={({focused}) => focused ? TabIcon(I18n.t('home_sort'), Images.rank2, styles.textStyle2, styles.bgRankStyle2) :
                           TabIcon(I18n.t('home_sort'), Images.rank, styles.textStyle, styles.bgRankStyle2)}
                />
            </Stack>
            <Stack key="tab_4">
                <Scene key="tab_person"
                       component={Personal}
                       hideNavBar
                       icon={({focused}) => focused ? TabIcon(I18n.t('mine'), Images.mine2, styles.textStyle2, styles.bgHomeStyle) :
                           TabIcon(I18n.t('mine'), Images.mine, styles.textStyle, styles.bgHomeStyle)}
                />
            </Stack>
        </Tabs>
    );
}
const styles = StyleSheet.create({
    tabs: {
        height: 50
    },
    textStyle: {
        color: '#AAAAAA'
    },
    textStyle2: {
        color: '#FFE9AD'
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