/**
 * Created by lorne on 2017/5/26.
 */
/**
 * Created by lorne on 2017/4/20.
 */
import React, {Component} from 'react';
import {
    View
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';

import VideoListView from './VideoListView';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {getVideoTypes} from '../../services/NewsDao';


export default class MainVideoPage extends Component {

    componentDidMount() {
        console.log('MainVideo')
        this.refresh();
    }


    refresh = () => {
        getVideoTypes({}, data => {
            let {items} = data;

            if (items.length > 0) {


                this.setState({
                    typeListData: items,
                    selectTypeId: items[0].id
                })
            }
        }, err => {
        })
    };

    state = {
        typeListData: [],
        selectTypeId: 0,

    };


    render() {

        return (
            <View
                testID="page_news_main"
                style={ApplicationStyles.bgContainer}>

                {this._listView()}
            </View>
        )
    }

    pauseVideo = () => {
        let that = this;
        const {typeListData} = this.state;

        typeListData.forEach(function (x) {
            if (that.refs[`videoList${x.id}`] !== undefined)
                that.refs[`videoList${x.id}`].setPause();
        });
    };

    _listView = () => {
        const {typeListData} = this.state;

        let pages = [];

        typeListData.forEach(function (x) {
            pages.push(
                <VideoListView
                    ref={`videoList${x.id}`}
                    tabLabel={x.name}
                    key={x.id}
                    newsTypeItem={x}/>
            );
        });

        if (pages.length > 0)
            return (  <ScrollableTabView
                onChangeTab={({i}) => {
                    this.pauseVideo()
                }}
                renderTabBar={() => <ScrollableTabBar
                    tabStyle={{
                        height: 49,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}
                    backgroundColor={Colors.white}
                    activeTextColor="#161718"
                    inactiveTextColor={Colors._AAA}
                    textStyle={{fontSize: 16}}
                    style={{borderColor: Colors._EEE}}
                    underlineStyle={{backgroundColor: '#161718', height: 2}}
                />}>
                {pages}
            </ScrollableTabView>)

    };


}
