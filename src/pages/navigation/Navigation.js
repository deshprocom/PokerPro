import React, {Component} from 'react';
import {Scene,Stack,Tabs} from 'react-native-router-flux';
import RaceInfoPage from './RaceInfoPage';

import {TabIcon} from './TabIcon';
import DrawerPage from '../DrawerPage'
import I18n from 'react-native-i18n';
import {Images} from '../../Themes';
import VideoNewsTab from './VideoNewsTab';

export const Navigation=()=>{


    return (
        <Tabs
            lazy
            key="Navigation"
            showLabel={false}
            inactiveBackgroundColor="rgba(0, 0, 0, 1)"
        >
            <Stack
                key="tab_1"
                tabBarLabel="TAB #1"
                inactiveBackgroundColor="#FFF"
                activeBackgroundColor="#DDD"
                icon={()=>TabIcon(I18n.t('home'),Images.home,{
                    color:'#AAAAAA',fonSize:10
                },{
                    height:24,
                    width:24
                })}
                navigationBarStyle={()=>TabIcon(I18n.t('home'),Images.home2,{
                    color:'#FFE9AD'
                },{
                    height:24,
                    width:24
                })}
                titleStyle={{ color: 'white', alignSelf: 'center' }}
            >
                <Scene
                    key="tab1_1"
                    component={DrawerPage}
                    hideNavBar
                />
            </Stack>
            <Stack key="tab_2">
                <Scene key="tab_2_1"
                       component={RaceInfoPage}
                       hideNavBar
                       icon={()=>TabIcon(I18n.t('home_info'),Images.information,{
                            color:'#AAAAAA'
                        },{
                           width:17,
                            height:23
                       })}

                       navigationBarStyle={()=>TabIcon(I18n.t('home_info'),Images.information2,{
                    color:'#FFE9AD'
                },{
                           width:17,
                            height:23
                       })}
                />
            </Stack>
            <Stack key="tab_3">
                <Scene key="tab_3_1"
                       component={VideoNewsTab}
                       hideNavBar
                       icon={()=>TabIcon(I18n.t('home_sort'),Images.rank,{
                    color:'#AAAAAA'
                },{
                           width:25,
                            height:25
                       })}
                       navigationBarStyle={()=>TabIcon(I18n.t('home_sort'),Images.rank2,{
                    color:'#FFE9AD'
                },{
                           width:25,
                            height:25
                       })}
                />
            </Stack>
            <Stack key="tab_4">
                <Scene key="tab_4_1"
                       component={RaceInfoPage}
                       hideNavBar
                       icon={()=>TabIcon(I18n.t('mine'),Images.mine,{
                    color:'#AAAAAA'
                },{
                           height:24,
                            width:24
                       })}
                       navigationBarStyle={()=>TabIcon(I18n.t('mine'),Images.mine2,{
                    color:'#FFE9AD'
                },{
                           height:24,
                            width:24
                       })}
                />
            </Stack>
        </Tabs>
    );
}