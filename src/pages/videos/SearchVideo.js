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
import {getDateDiff, isEmptyObject, strNotNull, FontSize, uVideoShare} from '../../utils/ComonHelper';
import {searchVideos} from '../../services/NewsDao';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {VideoPlayer, UltimateListView} from '../../components';
import ReadLike from '../comment/ReadLike';

export default class SearchVideo extends Component {


    constructor(props) {
        super(props);

        this.state = {
            newsListData: [],
            newsListNextId: '0',
            video_link: '',
        };
        this.keyword = ''
        this.viewabilityConfig = {viewAreaCoveragePercentThreshold: 50}
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
                viewabilityConfig={this.viewabilityConfig}
                onViewableItemsChanged={this.handleViewableItemsChanged}
            />

        </View>)

    }

    handleViewableItemsChanged = (info) => {
        const {changed} = info;
        changed.forEach(x => {
            if (!x.isViewable && !isEmptyObject(x.item)
                && x.item.video_link === this.state.video_link) {
                this.setState({
                    video_link: ''
                })
            }

        })
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


    _playView = (item) => {
        const {id, cover_link, video_duration, video_link} = item;
        return <TouchableOpacity
            onPress={() => {
                this._pressItem(item)
            }}
            style={styles.listTopImg}>

            {strNotNull(video_link) && this.state.video_link === video_link ?
                <View style={styles.listTopImg}>
                    <VideoPlayer
                        thumbnailsHeight={208}
                        thumbnails={cover_link}
                        source={{uri: video_link.trim()}}

                    />
                </View> : <View style={styles.listTopImg}>
                    <Image
                        source={{uri: cover_link}}
                        style={[styles.listTopImg, {position: 'absolute'}]}
                    />

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
                </View>}


        </TouchableOpacity>

    };

    _itemNewsView = (rowData, sectionID, rowID) => {

        const {created_at, name, cover_link, video_duration, title_desc, id} = rowData;

        return (<View
            style={styles.transparent}
            testID={"btn_news_row_" + rowData.id}>

            <View>

                <Text style={styles.itemTitle}>{name}</Text>

            </View>

            {this._playView(rowData)}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                    numberOfLines={1}
                    style={{fontSize: 12, color: Colors._AAA}}>{getDateDiff(created_at)}</Text>
                <Text
                    numberOfLines={1}
                    style={{fontSize: 12, color: Colors._AAA}}> # {video_duration}</Text>

                <View style={{flex: 1}}/>
                <ReadLike
                    read={rowData.total_views}
                    like={rowData.total_likes}/>
                <TouchableOpacity
                    onPress={() => {
                        uVideoShare(name, title_desc, cover_link, id)
                    }}
                    style={{alignItems: 'center', justifyContent: 'center'}}>

                    <Image style={styles.imgShare}
                           source={Images.video_share}/>

                </TouchableOpacity>
            </View>


            <View style={{backgroundColor: Colors._ECE, height: 1}}/>


        </View>)


    }

    _pressItem = (item) => {
        let url = `videos/${item.id}`;
        global.router.toWebPage(url, {bottomNav: 'commentNav', info: item, topic_type: 'video'})
    };

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
                            placeholder={I18n.t('video_outline')}
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
    transparent: {
        paddingLeft: 17,
        paddingRight: 17,
        backgroundColor: Colors.white,

    },
    listVideoTime: {
        color: Colors._EEE,
        right: 17,
        position: 'absolute',
        bottom: 7
    },
    imgPlay: {
        height: 68,
        width: 68
    },
    btnPlay: {
        height: 68,
        width: 68,
        alignSelf: 'center',
        marginTop: 68
    },
    imgShare: {
        height: 17,
        width: 17,
        marginTop: 8,
        marginBottom: 10,
        marginLeft: 14

    },

    itemTitle: {
        fontSize: 17,
        color: Colors._333,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 11

    },
    barTxt: {
        fontSize: 15,
        color: '#E4D57F'
    },
    listTopImg: {
        height: 208,
        width: '100%',
        backgroundColor: Colors._ECE

    },
});