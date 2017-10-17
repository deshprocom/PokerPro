/**
 * Created by lorne on 2017/4/24.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, TextInput,
    InteractionManager, Animated, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

import I18n from 'react-native-i18n';
import {isEmptyObject, convertDate, strNotNull,FontSize} from '../../utils/ComonHelper';
import {searchVideos} from '../../services/NewsDao';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {ImageLoad, UltimateListView} from '../../components';


export default class SearchVideo extends Component {


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
                keyExtractor={(item, index) => index}
                ref={(ref) => this.listView = ref}
                onFetch={this.onFetch}
                rowView={this._itemNewsView}
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

        searchVideos(body, data => {

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

        searchVideos(body, data => {

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
        router.toNewsInfoPage(this.props, item)
    };


    _playView = (item) => {
        const {id, cover_link, video_duration, video_link} = item;
        return <View style={styles.listTopImg}>

            {strNotNull(video_link) && this.state.video_link === video_link ?
                <View style={styles.listTopImg}>
                    <VideoPlayer
                        thumbnailsHeight={208}
                        thumbnails={cover_link}
                        source={{uri: video_link.trim()}}

                    />
                </View> : <Image
                    source={{uri: cover_link}}
                    style={styles.listTopImg}
                >
                    <View style={styles.itemBack}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    video_link: video_link,
                                    cover_link: cover_link
                                })
                            }}
                            style={styles.btnPlay}>
                            <Image
                                style={styles.imgPlay}
                                source={Images.video_play}/>
                        </TouchableOpacity>
                        <Text style={[styles.listVideoTime, {fontSize: FontSize.h14}]}>{video_duration}</Text>


                    </View>

                </Image>}


        </View>

    };

    _itemNewsView = (rowData, sectionID, rowID) => {

        const {top, name, cover_link, video_duration, title_desc, id} = rowData;

        return (<View
            style={styles.transparent}
            testID={"btn_news_row_" + rowData.id}
            activeOpacity={1}
            onPress={() => this._pressItem(rowData)}>

            {this._playView(rowData)}
            <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                <TouchableOpacity
                    style={{flex: 6}}
                    activeOpacity={1}
                    onPress={() => this._pressItem(rowData)}>
                    <Text
                        numberOfLines={2}
                        style={[styles.listTopTxt, {fontSize: FontSize.h17}]}>{name}</Text>
                    <Text
                        numberOfLines={1}
                        style={[styles.txtTitle1, {fontSize: FontSize.h14}]}>{title_desc}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        uVideoShare(name, title_desc, cover_link, id)
                    }}
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                    <Image style={styles.imgShare}
                           source={Images.share}/>

                </TouchableOpacity>
            </View>


        </View>)
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
        marginTop: 13
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