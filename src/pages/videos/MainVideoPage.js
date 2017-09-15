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
import TestRouter from '../../components/TestRouter';
import I18n from 'react-native-i18n';
import {GET_VIDEO_TYPE} from '../../actions/ActionTypes';
import {isEmptyObject, convertDate} from '../../utils/ComonHelper';
import {connect} from 'react-redux';
import {fetchVideoType} from '../../actions/NewsAction';
import VideoListView from './VideoListView';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import {NavigationBar} from '../../components';
import {getVideoTypes} from '../../services/NewsDao';


export  default class MainVideoPage extends Component {

    componentDidMount() {
        getVideoTypes({}, data => {
            let {items} = data;
            items.map(function (x) {
                x['select'] = false;
            });
            if (items.length > 0) {

                items[0].select = true;
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
        selectTypeId: 1
    };


    render() {

        return (
            <View
                testID="page_news_main"
                style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._161817}}
                    router={router}
                    title={I18n.t('home_video')}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>



                {this._listView()}
            </View>
        )
    }

    _listView = () => {
        const {typeListData, selectTypeId} = this.state;

        let pages = [];

        typeListData.forEach(function (x) {
            pages.push(
                <VideoListView
                    tabLabel={x.name}
                    key={x.id}
                    selectTypeId={selectTypeId}
                    newsTypeItem={x}/>
            );
        });


        return (  <ScrollableTabView
            onChangeTab={({i}) => {
                router.log('tab', i);
                if (i == undefined || i < 0 || i > pages.length)
                    return;
                let item = typeListData[i];

                if (isEmptyObject(item))
                    return;

                this.setState({
                    selectTypeId: item.id
                });

            }}
            renderTabBar={() => <DefaultTabBar
                backgroundColor={Colors.white}
                activeTextColor="#161718"
                inactiveTextColor={Colors._AAA}
                textStyle={{fontSize: 16}}
                style={{borderColor: Colors._EEE}}
                tabStyle={{paddingBottom: 0}}
                underlineStyle={{backgroundColor: '#161718', height: 2}}
            />}
            ref={ref => this.newsPages = ref}>
            {pages}
        </ScrollableTabView>)

    };


    _newsTypeView = () => {

        return ( <View style={styles.newsTypeView}>
            <FlatList
                ref={ref => this.typeList = ref}
                legacyImplementation={false}
                showsHorizontalScrollIndicator={false}
                data={this.state.typeListData}
                renderItem={this._itemView}
                horizontal={true}
                keyExtractor={item => item.id}
                style={{marginLeft: 10}}
            />
        </View> )
    };


    _itemView = ({item}) => {

        return (<TouchableOpacity
            testID={"btn_news_type_" + item.id}
            onPress={() => {
                this._pressItem(item);

                this.setState({
                    selectTypeId: item.id
                });
                this.newsPages.goToPage(this._page(item))
            }}
            style={styles.itemView}>
            {item.select ? <View style={{flex: 1}}/> : null}
            <Text style={item.select ?
                styles.itemTxtSelect : styles.itemTxt}>{item.name}</Text>
            {item.select ? <View style={styles.triangle}/> : null}

        </TouchableOpacity>)
    }

    _page = (item) => {
        const {typeListData} = this.state;
        for (var i = 0; i < typeListData.length; i++) {
            if (item.id === typeListData[i].id)
                return i;
        }
    }


    _pressItem = (item) => {

        this.setState((state) => {
            const newData = [...state.typeListData];
            newData.map(function (element) {

                if (item.id === element.id) {
                    element.select = true
                } else {
                    element.select = false
                }
                return element;
            });

            return {typeListData: newData}
        })
    }


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