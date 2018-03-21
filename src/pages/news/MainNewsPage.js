/**
 * Created by lorne on 2017/4/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, Platform,
    ScrollView, Animated
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import TestRouter from '../../components/TestRouter';
import I18n from 'react-native-i18n';
import {GET_NEWS_TYPES} from '../../actions/ActionTypes';
import {isEmptyObject, convertDate} from '../../utils/ComonHelper';
import {connect} from 'react-redux';
import {fetchNewsTypes} from '../../actions/NewsAction';
import NewsListView from './NewsListView';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {getNewsTypes} from '../../services/NewsDao';


export default class MainNewsPage extends Component {

    componentWillMount() {
        this.refresh()
    }


    refresh = () => {
        getNewsTypes(data => {
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
        selectTypeId: 1
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

    _listView = () => {
        const {typeListData, selectTypeId} = this.state;

        let pages = [];

        typeListData.forEach(function (x) {
            pages.push(
                <NewsListView
                    tabLabel={x.name}
                    key={x.id}
                    selectTypeId={selectTypeId}
                    newsTypeItem={x}/>
            );
        });

        if (pages.length > 0)
            return (  <ScrollableTabView
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


    _navSearchBar = () => {
        return (<View style={styles.navBar}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    testID="btn_bar_left"
                    style={styles.popBtn}
                    onPress={() => router.pop()}>
                    <Image style={styles.backImg}
                           source={Images.sign_return}/>
                </TouchableOpacity>
                <TestRouter/>
                <TouchableOpacity
                    testID="btn_news_search"
                    activeOpacity={1}
                    onPress={() => router.toSearchNewsPage()}
                    style={styles.searchView}>

                    <View style={styles.searchBar}>
                        <Image style={styles.searchImg}
                               source={Images.news_outline}/>
                        <Text style={styles.txtOutline}>{I18n.t('news_outline')}</Text>

                    </View>

                </TouchableOpacity>

            </View>
        </View>)
    };


}


const styles = StyleSheet.create({
    topBar: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Metrics.statusBarHeight,

    },
    popBtn: {
        height: 44,
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
        backgroundColor: Colors._333,
        marginBottom: 4
    },
    viewPage: {
        flex: 1
    }

});