import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MainVideoPage from '../videos/MainVideoPage';
import MainNewsPage from '../news/MainNewsPage';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class VideoNewsTab extends PureComponent {

    render() {
        return (<ScrollableTabView
            locked
            renderTabBar={false}
        >

            <MainNewsPage
                tabLabel={'资讯'}/>

            <MainVideoPage
                tabLabel={'视频'}/>

        </ScrollableTabView>)
    }

}
