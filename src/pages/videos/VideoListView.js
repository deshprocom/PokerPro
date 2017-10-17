/**
 * Created by lorne on 2017/5/26.
 */
/**
 * Created by lorne on 2017/4/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, Modal
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {isEmptyObject, uniqueArray, FontSize, uVideoShare, strNotNull} from '../../utils/ComonHelper';
import {ImageLoad, VideoPlayer, UltimateListView} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {getVideoList} from '../../services/NewsDao';


export default class VideoListView extends Component {


    constructor(props) {
        super(props);

        this.state = {
            newsListData: [],
            newsListNextId: 0,
            topped: {},
            error: false,
            modalVisible: false,
            video_link: '',
            cover_link: ''
        }

    }


    render() {
        let {video_link} = this.state;
        let that = this;

        return (<View
            style={styles.pullView}
            testID={'page_news_' + this.props.newsTypeItem.id}>

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
                onViewableItemsChanged={info => {

                    const {changed} = info;
                    changed.forEach(function (x) {
                        if (!x.isViewable && !isEmptyObject(x.item)
                            && x.item.video_link === video_link) {
                            that.setState({
                                video_link: ''
                            })
                        }

                    })
                }}

            />


        </View>)
    }


    setPause = () => {
        this.setState({
            video_link: ''
        })
    };


    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            this.listPage = page;

            if (page === 1) {
                this.refresh(startFetch, abortFetch)
            } else {
                this.loadmore(startFetch, abortFetch);
            }
        } catch (err) {
            abortFetch();
        }
    };

    loadmore = (startFetch, abortFetch) => {
        let {newsTypeItem} = this.props;
        const {newsListNextId, newsListData} = this.state;
        let body = {
            type_id: newsTypeItem.id,
            next_id: newsListNextId
        };
        getVideoList(body, (data) => {
            let {items, next_id, topped} = data;

            let rows = uniqueArray(this.listView.getRows(), items)

            startFetch(rows, 5);

            let newData = newsListData.concat(rows);
            this.setState({
                newsListData: newData,
                newsListNextId: next_id === 0 ? newsListNextId : next_id
            })
        }, (err) => {
            abortFetch();
        })
    };

    refresh = (startFetch, abortFetch) => {
        const {newsTypeItem} = this.props;
        const body = {
            type_id: newsTypeItem.id,
            next_id: 0
        };
        getVideoList(body, data => {
            let {items, next_id, topped} = data;
            if (!isEmptyObject(topped)) {
                items.unshift(topped)
            }
            let rows = uniqueArray(this.listView.getRows(), items);

            startFetch(rows, 5);

            this.setState({
                newsListData: rows,
                newsListNextId: next_id
            })
        }, err => {
            this.setState({
                error: true
            });
            abortFetch();
        })

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


        </TouchableOpacity>

    };

    _itemNewsView = (rowData, sectionID, rowID) => {

        const {top, name, cover_link, video_duration, title_desc, id} = rowData;

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
                    style={{fontSize: 12, color: Colors._AAA}}>两小时前</Text>
                <Text
                    numberOfLines={1}
                    style={{fontSize: 12, color: Colors._AAA}}> # {video_duration}</Text>

                <View style={{flex: 1}}/>

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
        router.toVideoInfoPage(this.props, item)
    };

}


const styles = StyleSheet.create({
    imgShare: {
        height: 17,
        width: 17,
        marginTop: 8,
        marginBottom: 10,
        marginLeft: 8

    },
    listTopImg: {
        height: 208,
        width: '100%',
        backgroundColor: Colors._ECE

    },
    listTopTxtView: {
        height: 32,
        backgroundColor: 'transparent',
        width: Metrics.screenWidth,
        alignItems: 'center',
        flexDirection: 'row'
    },
    listTopTxt: {
        color: Colors._333,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 17,
        marginRight: 17,
        lineHeight: 24
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
        backgroundColor: 'transparent'
    },
    listTitleTxt: {
        color: '#444444',
        fontSize: 16,
        width: 216,
        alignSelf: 'flex-start',
        height: 44
    },
    pullView: {
        flex: 1
    },
    itemBack: {
        flex: 1
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
    viewDesc: {
        backgroundColor: 'white'
    },
    txtTitle1: {
        color: Colors._AAA,
        marginTop: 3,
        marginLeft: 17,
        marginBottom: 12,
        marginRight: 17,
    },
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
    },
    itemTitle: {
        fontSize: 17,
        color: Colors._333,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 11

    }
});