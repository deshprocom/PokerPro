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
import {isEmptyObject, convertDate, strNotNull, newsUnique} from '../../utils/ComonHelper';
import {ImageLoad, PullListView} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {fetchVideoList} from '../../actions/NewsAction';
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
            newsListNextId: '0',
            topped: {},
            componentDataSource: this._dataSource.cloneWithRows([]),
        }


    }


    render() {
        const {newsListData} = this.state;


        return (<View
            style={styles.pullView}
            testID={'page_news_'+this.props.newsTypeItem.id}>


            {isEmptyObject(newsListData) ? <NoDataView/> : null}
            <View style={{flex:1}}>
                <PullListView
                    ref={ (component) => this._pullToRefreshListView = component }
                    viewType={PullListView.constants.viewType.listView}
                    dataSource={this.state.componentDataSource}
                    renderRow={this._itemNewsView}
                    renderHeader={(viewState)=>_renderHeader(viewState,headerStyle)}
                    renderFooter={(viewState)=>_renderFooter(viewState,headerStyle)}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    enableEmptySections={true}
                />
            </View>


        </View>)
    }


    _onRefresh = () => {
        const {newsTypeItem} = this.props;
        this._getNewsList(newsTypeItem.id, '0')
    };

    _onLoadMore = () => {
        const {newsTypeItem} = this.props;
        const {newsListNextId} = this.state;
        router.log("onEndReached", newsTypeItem, newsListNextId);
        this._getNewsList(newsTypeItem.id, newsListNextId)

    };


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._onRefresh();
        });

    }


    componentWillReceiveProps(newProps) {

        this._handleNewsList(newProps);
    }


    _itemNewsView = (rowData, sectionID, rowID) => {

        const {top, name, cover_link} = rowData;

        if (top) {
            return (<TouchableOpacity
                testID={"btn_news_row_"+rowData.id}
                activeOpacity={1}
                onPress={()=>this._pressItem(rowData)}>
                <Image
                    source={strNotNull(cover_link)?{uri:cover_link}:Images.empty_image}
                    style={styles.listTopImg}
                >

                    <View style={{flex:1}}/>
                    <View style={styles.listTopTxtView}>
                        <Text style={styles.listTopTxt}>{name}</Text>

                    </View>
                </Image>

            </TouchableOpacity>)
        } else {
            return (<TouchableOpacity
                testID={"btn_news_row_"+rowData.id}
                activeOpacity={1}
                onPress={()=>this._pressItem(rowData)}>
                <Image
                    source={strNotNull(cover_link)?{uri:cover_link}:Images.empty_image}
                    style={styles.listTopImg}
                >

                    <View style={{flex:1}}/>
                    <View style={styles.listTopTxtView}>
                        <Text style={styles.listTopTxt}>{name}</Text>

                    </View>
                </Image>


            </TouchableOpacity>)
        }


    }

    _pressItem = (item) => {
        router.toVideoInfoPage(this.props, item)
    }

    _handleNewsList = (newProps) => {
        const {actionType, videoList, videoTypeId, loading} = newProps;

        let newsListType = GET_VIDEO_LIST + this.props.newsTypeItem.id;

        router.log(actionType + videoTypeId, videoList)
        if (actionType + videoTypeId === newsListType
            && !isEmptyObject(videoList)
            && this.props.loading !== loading) {


            let {items, next_id, topped} = videoList;
            const {newsListData, newsListNextId} =this.state;

            if (newsListNextId !== '0') {
                this._pullToRefreshListView.endLoadMore(false);
                if (isEmptyObject(items))
                    return;

                let newData = newsUnique(newsListData.concat(items));

                this.setState({
                    componentDataSource: this._dataSource.cloneWithRows(newData),
                    newsListNextId: next_id,
                    newsListData: newData
                })
            } else {
                this._pullToRefreshListView.endRefresh();

                if (!isEmptyObject(topped)) {
                    items.unshift(topped)
                }
                let newData = newsUnique(items);

                this.setState({
                    componentDataSource: this._dataSource.cloneWithRows(newData),
                    newsListNextId: next_id,
                    newsListData: newData,
                    topped: topped
                })
            }
        }
    };

    _getNewsList = (type_id, next_id) => {
        const body = {
            type_id: type_id,
            next_id: next_id
        };
        this.setState({
            newsListNextId: next_id
        });
        this.props.getNewsList(body);
    }
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
        backgroundColor: 'rgba(0,0,0,0.30)',
        width: Metrics.screenWidth,
        alignItems: 'center',
        flexDirection: 'row'
    },
    listTopTxt: {
        fontSize: 15,
        color: Colors.white,
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
    }
});