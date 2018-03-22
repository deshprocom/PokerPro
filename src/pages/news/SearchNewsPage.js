/**
 * Created by lorne on 2017/4/24.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, TextInput,
    InteractionManager, Animated, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

import I18n from 'react-native-i18n';
import {isEmptyObject, convertDate, strNotNull} from '../../utils/ComonHelper';
import {getNewsSearch} from '../../services/NewsDao';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {ImageLoad, UltimateListView} from '../../components';
import ReadLike from '../comment/ReadLike';

export default class SearchNewsPage extends Component {


    constructor(props) {
        super(props);

        this.state = {
            newsListData: [],
            newsListNextId: '0',
        };
        this.keyword = ''

    }


    render() {

        return (<View
            testID="page_news_search"
            style={ApplicationStyles.bgContainer}>

            {this._navSearchBar()}
            {this._content()}
        </View>)
    }


    _content = () => {


        return (<View>

            <UltimateListView
                keyExtractor={(item, index) => index+"item"}
                ref={(ref) => this.listView = ref}
                onFetch={this.onFetch}
                item={this._itemNewsView}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
                emptyView={() => {
                    return this.state.error ? <LoadErrorView
                        onPress={() => {
                            this.listView.refresh()
                        }}/> : <NoDataView/>;
                }}
            />

        </View>)

    }


    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            if (page === 1) {
                this._onRefresh(startFetch, abortFetch)
            } else {
                this._onLoadMore(startFetch, abortFetch);
            }
        } catch (err) {
            abortFetch();
        }
    };
    _onRefresh = (startFetch, abortFetch) => {


        const body = {
            keyword: this.keyword,
            next_id: '0'
        };

        getNewsSearch(body, data => {

            const {items, next_id} = data;
            this.setState({
                newsListNextId: next_id
            });
            startFetch(items, 6)

        }, err => {
            abortFetch()
        });
    };

    _onLoadMore = (startFetch, abortFetch) => {

        const {newsListNextId} = this.state;


        const body = {
            keyword: this.keyword,
            next_id: newsListNextId
        };

        getNewsSearch(body, data => {

            const {items, next_id} = data;
            this.setState({
                newsListNextId: next_id
            });
            startFetch(items, 6)

        }, err => {
            abortFetch()
        });

    };


    _pressItem = (item) => {
        let url = `news/${item.id}`;
        global.router.toWebPage(url, {bottomNav: 'commentNav', info: item, topic_type: 'info'})
    };

    _itemNewsView = (rowData, sectionID, rowID) => {

        const {image, title, source, date, image_thumb} = rowData;

        return (<TouchableOpacity
            testID={"btn_news_row_" + rowData.id}
            activeOpacity={1}
            onPress={() => this._pressItem(rowData)}
            style={styles.listView}>
            <View style={styles.listTitleView}>
                <Text
                    numberOfLines={2}
                    style={styles.listTitleTxt}>{title}</Text>

                <View style={styles.listTimeView}>

                    <ReadLike
                        read={rowData.total_views}
                        like={rowData.total_likes}/>
                    <View style={{flex:1}}/>
                    <Text style={styles.listTime}>{convertDate(date, 'MM-DD')}</Text>
                    <View style={{width:10}}/>
                </View>


            </View>

            <View style={{flex: 1}}/>
            <ImageLoad style={styles.listImg}
                       source={{uri: image_thumb}}/>

        </TouchableOpacity>)
    }

    _navSearchBar = () => {
        return (<View style={styles.navBar}>
            <View style={styles.topBar}>
                <View
                    style={styles.searchView}>

                    <View style={styles.searchBar}>
                        <Image style={styles.searchImg}
                               source={Images.news_outline}/>
                        <TextInput
                            autoFocus={true}
                            testID="input_news_search"
                            placeholderTextColor={Colors.txt_666}
                            placeholder={I18n.t('news_outline')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            underlineColorAndroid="transparent"
                            style={this._searchInput()}
                            onChangeText={text => {
                                this.keyword = text;
                                if (strNotNull(text))
                                    this.listView.onRefresh()
                            }}

                        />

                    </View>

                    <TouchableOpacity
                        testID="btn_bar_right"
                        style={styles.popBtn}
                        onPress={() => router.pop()}>
                        <Text style={styles.barTxt}>{I18n.t('cancel')}</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>)
    };

    _searchInput = () => {
        if (Platform.OS === 'ios')
            return styles.searchTextInput;
        else
            return styles.androidInput;
    }


}


const styles = StyleSheet.create({
    topBar: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Metrics.statusBarHeight,

    },
    popBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    searchView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
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
    searchTextInput: {
        color: Colors.white,
        fontSize: 12,
        height: 28,
        width: 230,
    },
    androidInput: {
        color: Colors.white,
        fontSize: 12,
        height: 40,
        width: 230,
    },
    listView: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.bg_f5,
        alignItems: 'center'
    },
    listTime: {
        color: Colors._AAA,
        fontSize: 12,
        marginLeft: 10
    },
    listTimeView: {
        flexDirection: 'row',
        marginTop: 13,
    },
    listSource: {
        color: Colors._AAA,
        fontSize: 12,
    },
    listImg: {
        height: 74,
        width: 122,
        marginTop: 13,
        marginRight: 17,
        marginBottom: 16
    },
    listTitleView: {
        marginLeft: 17,
        marginTop: 13,
        marginBottom: 16,
    },
    listTitleTxt: {
        color: '#444444',
        fontSize: 16,
        width: 216
    },
    barTxt: {
        fontSize: 15,
        color: '#E4D57F'
    },
});