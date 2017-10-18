/**
 * Created by lorne on 2017/5/26.
 */
/**
 * Created by lorne on 2017/4/20.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

import I18n from 'react-native-i18n';

import VideoListView from './VideoListView';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {getVideoTypes} from '../../services/NewsDao';


export default class MainVideoPage extends Component {

    componentDidMount() {
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
    }

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
        let that = this;

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


const styles = StyleSheet.create({
    topBar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Metrics.statusBarHeight,

    },
    popBtn: {
        height: 40,
        width: 50,
        justifyContent: 'center'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    searchView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchBar: {
        backgroundColor: '#212325',
        height: 28,
        width: 270,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 3
    },
    navBar: {
        backgroundColor: Colors._161817
    },
    searchImg: {
        height: 16,
        width: 16,
        marginLeft: 10,
        marginRight: 10
    },
    txtOutline: {
        color: Colors.txt_666,
        fontSize: 12
    },
    newsTypeView: {
        height: 50,
        backgroundColor: Colors.white
    },
    itemView: {
        height: 50,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemTxt: {
        color: Colors._888,
        fontSize: 14
    },
    itemTxtSelect: {
        color: Colors._333,
        fontSize: 16,
        marginBottom: 10
    },
    triangle: {
        height: 3,
        width: 60,
        marginBottom: 4,
        backgroundColor: Colors._333
    },
    viewPage: {
        flex: 1
    }

});