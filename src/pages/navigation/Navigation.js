import React, {Component} from 'react';
import {Scene,Stack,Tabs} from 'react-native-router-flux';
import RaceInfoPage from './RaceInfoPage';
import TabIcon from './TabIcon';
import DrawerPage from '../DrawerPage'


export const Navigation=()=>{


    return (
        <Tabs
            key="Navigation"
            showLabel={false}
            activeBackgroundColor="rgba(0, 250, 0, 0.7)"
            inactiveBackgroundColor="rgba(250, 250, 250, 0.5)"
        >
            <Stack
                key="tab_1"
                tabBarLabel="TAB #1"
                inactiveBackgroundColor="#FFF"
                activeBackgroundColor="#DDD"
                icon={TabIcon}
                navigationBarStyle={{ backgroundColor: 'green' }}
                titleStyle={{ color: 'white', alignSelf: 'center' }}
            >
                <Scene
                    key="tab1_1"
                    component={DrawerPage}
                    hideNavBar
                />
            </Stack>
            <Stack key="tab_2">
                <Scene key="tab_2_1" component={RaceInfoPage}  hideNavBar icon={TabIcon} />
            </Stack>
            <Stack key="tab_3">
                <Scene key="tab_3_1" component={RaceInfoPage} icon={TabIcon} />
            </Stack>
            <Stack key="tab_4">
                <Scene key="tab_4_1" component={RaceInfoPage}  icon={TabIcon} />
            </Stack>
        </Tabs>
    );
}