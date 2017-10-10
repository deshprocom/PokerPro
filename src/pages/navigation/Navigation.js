import React, {Component} from 'react';
import {Scene,Stack,Tabs} from 'react-native-router-flux';
import RaceInfoPage from './RaceInfoPage';
import TabIcon from './TabIcon';


export const Navigation=()=>{


    return (
        <Tabs
            key="tabbar"
            showLabel={false}
            activeBackgroundColor="white"
            inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
        >
            <Stack
                key="tab_1"
                title="Tab #1"
                tabBarLabel="TAB #1"
                inactiveBackgroundColor="#FFF"
                activeBackgroundColor="#DDD"
                icon={TabIcon}
                navigationBarStyle={{ backgroundColor: 'green' }}
                titleStyle={{ color: 'white', alignSelf: 'center' }}
            >
                <Scene
                    key="tab1_1"
                    component={RaceInfoPage}
                    title="Tab #1_1"
                    onRight={() => alert('Right button')}
                    rightTitle="Right"

                />
            </Stack>
            <Stack key="tab_2">
                <Scene key="tab_2_1" component={RaceInfoPage} title="Tab #2" hideNavBar icon={TabIcon} />
            </Stack>
            <Stack key="tab_3">
                <Scene key="tab_3_1" component={RaceInfoPage} title="Tab #3" icon={TabIcon} />
            </Stack>
            <Stack key="tab_4">
                <Scene key="tab_4_1" component={RaceInfoPage} title="Tab #4" icon={TabIcon} />
            </Stack>
        </Tabs>
    );
}