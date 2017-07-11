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

        if (top) {
            return (<TouchableOpacity
                style={styles.transparent}
                testID={"btn_news_row_" + rowData.id}
                activeOpacity={1}
                onPress={() => this._pressItem(rowData)}>


                <ImageLoad
                    source={{uri: cover_link}}
                    style={styles.listTopImg}
                >
                    <View style={styles.itemBack}/>
                </ImageLoad>

                <Text style={[styles.listVideoTime, {fontSize: FontSize.h14}]}>{video_duration}</Text>
                <Text style={[styles.listTopTxt, {fontSize: FontSize.h17}]}>{name}</Text>

            </TouchableOpacity>)
        } else {
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

                    </View>

                </ImageLoad>

                <Text style={[styles.listVideoTime, {fontSize: FontSize.h14}]}>{video_duration}</Text>
                <Text style={[styles.listTopTxt, {fontSize: FontSize.h16}]}>{name}</Text>
            </TouchableOpacity>)
        }


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
        height: 228,
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
        color: Colors.white,
        left: 17,
        position: 'absolute',
        bottom: 12,
        fontWeight: 'bold'
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1
    },
    transparent: {
        backgroundColor: 'transparent',
    },
    listVideoTime: {
        color: Colors._EEE,
        left: 17,
        position: 'absolute',
        bottom: 36
    },
    imgPlay: {
        height: 68,
        width: 68,
        alignSelf: 'center',
        marginTop: 68
    }
});