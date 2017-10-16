/**
 * Created by lorne on 2017/5/26.
 */
/**
 * Created by lorne on 2017/4/21.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, ListView,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Modal, InteractionManager,
    ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {GET_VIDEO_LIST} from '../../actions/ActionTypes';
import {isEmptyObject, uniqueArray, FontSize, uVideoShare, strNotNull} from '../../utils/ComonHelper';
import {ImageLoad, VideoPlayer, UltimateListView} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {fetchVideoList} from '../../actions/NewsAction';
import {getVideoList} from '../../services/NewsDao';
import {_renderFooter, _renderHeader} from '../../components/LoadingView';

const headerStyle = {height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bg_f5};


class NewsListView extends Component {

    static propTypes = {
        newsTypeItem: PropTypes.object,
        selectTypeId: PropTypes.number
    };

    constructor(props) {
        super(props);
        this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.race_id !== r2.race_id
        });


        this.state = {
            newsListData: [],
            newsListNextId: 0,
            topped: {},
            componentDataSource: this._dataSource.cloneWithRows([]),
            error: false,
            modalVisible: false,
            video_link: '',
            cover_link: ''
        }


    }


    render() {
        const {newsListData, error} = this.state;


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

            />


        </View>)
    }


    _showVideo = () => {

        const {modalVisible, video_link, cover_link} = this.state;
        return ( <Modal
            style={styles.container}
            transparent={true}
            visible={modalVisible}>

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.setState({
                        modalVisible: false
                    })
                }}
                style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}}/>
            <VideoPlayer
                thumbnails={cover_link}
                closeFull={true}
                source={{uri: video_link.trim()}}
            />
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.setState({
                        modalVisible: false
                    })
                }}
                style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}}/>
        </Modal>)
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

    _pressItem = (item) => {
        router.toVideoInfoPage(this.props, item)
    };

}


const bindAction = dispatch => ({
    getNewsList: (body) => dispatch(fetchVideoList(body))
});

const mapStateToProps = state => ({
    loading: state.NewsState.loading,
    error: state.NewsState.error,
    hasData: state.NewsState.hasData,
    actionType: state.NewsState.actionType,
    errorMsg: state.NewsState.errorMsg,
    videoList: state.NewsState.videoList,
    videoTypeId: state.NewsState.videoTypeId
});

export default connect(mapStateToProps, bindAction)(NewsListView);


const styles = StyleSheet.create({
    imgShare: {
        height: 22,
        width: 23

    },
    listTopImg: {
        height: 208,
        width: Metrics.screenWidth

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
        backgroundColor: 'transparent',
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
});