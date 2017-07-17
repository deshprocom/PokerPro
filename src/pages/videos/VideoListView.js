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
    ScrollView, Animated, InteractionManager,
    ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {GET_VIDEO_LIST} from '../../actions/ActionTypes';
import {isEmptyObject, uniqueArray, FontSize, newsUnique} from '../../utils/ComonHelper';
import {ImageLoad, PullListView, UltimateListView} from '../../components';
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
            error: false
        }


    }


    render() {
        const {newsListData, error} = this.state;


        return (<View
            style={styles.pullView}
            testID={'page_news_' + this.props.newsTypeItem.id}>

            <UltimateListView
                key={this.state.layout}
                keyExtractor={(item, index) => `${this.state.layout} - ${item.race_id}`}
                ref={(ref) => this.listView = ref}
                onFetch={this.onFetch}
                legacyImplementation
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


    _itemNewsView = (rowData, sectionID, rowID) => {

        const {top, name, cover_link, video_duration} = rowData;

        return (<TouchableOpacity
            style={styles.transparent}
            testID={"btn_news_row_" + rowData.id}
            activeOpacity={1}
            onPress={() => this._pressItem(rowData)}>

            <ImageLoad
                source={{uri: cover_link}}
                style={styles.listTopImg}
            >
                <View style={styles.itemBack}>
                    <Image
                        style={styles.imgPlay}
                        source={Images.video_play}/>

                    <Text style={[styles.listVideoTime, {fontSize: FontSize.h14}]}>{video_duration}</Text>

                </View>

            </ImageLoad>
            <View style={styles.viewDesc}>
                <Text
                    numberOfLines={1}
                    style={[styles.listTopTxt, {fontSize: FontSize.h17}]}>{name}</Text>

            </View>
            <View style={{height: 6}}/>


        </TouchableOpacity>)


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
        marginTop: 9,
        marginLeft: 17
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
        width: 68,
        alignSelf: 'center',
        marginTop: 68
    },
    viewDesc: {
        height: 68,
        backgroundColor: 'white'
    }
});