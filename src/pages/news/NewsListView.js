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
import {GET_NEWS_LIST} from '../../actions/ActionTypes';
import {isEmptyObject, convertDate, strNotNull, uniqueArray} from '../../utils/ComonHelper';
import {ImageLoad, PullListView, UltimateListView} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {fetchNewsList} from '../../actions/NewsAction';
import {_renderFooter, _renderHeader} from '../../components/LoadingView';
const headerStyle = {height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bg_f5};
import {getNewsList} from '../../services/NewsDao';


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
            error: false
        }


    }


    render() {

        return (<View
            style={styles.pullView}
            testID={'page_news_'+this.props.newsTypeItem.id}>


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
                emptyView={()=>{
                    return this.state.error? <LoadErrorView
                    onPress={()=>{
                        this.listView.refresh()
                    }}/>: <NoDataView/>;
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
        getNewsList(body, (data) => {
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
        let {newsTypeItem} = this.props;
        let body = {
            type_id: newsTypeItem.id,
            next_id: '0'
        };
        getNewsList(body, (data) => {
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
        }, (err) => {
            this.setState({
                error: true
            });
            abortFetch();
        })
    };


    _itemNewsView = (rowData, sectionID, rowID) => {

        const {top, image, title, source, date, image_thumb} = rowData;

        if (top) {
            return (<TouchableOpacity
                testID={"btn_news_row_"+rowData.id}
                activeOpacity={1}
                onPress={()=>this._pressItem(rowData)}>
                <Image
                    source={strNotNull(image)?{uri:image}:Images.empty_image}
                    style={styles.listTopImg}
                >

                    <View style={{flex:1}}/>
                    <View style={styles.listTopTxtView}>
                        <Text
                            numberOfLines={1}
                            style={styles.listTopTxt}>{title}</Text>

                    </View>
                </Image>

            </TouchableOpacity>)
        } else {
            return (<TouchableOpacity
                testID={"btn_news_row_"+rowData.id}
                activeOpacity={1}
                onPress={()=>this._pressItem(rowData)}
                style={styles.listView}>
                <View style={styles.listTitleView}>
                    <Text
                        numberOfLines={2}
                        style={styles.listTitleTxt}>{title}</Text>

                    <View style={styles.listTimeView}>
                        <Text style={styles.listSource}>{source}</Text>
                        <Text style={styles.listTime}>{convertDate(date, 'MM-DD')}</Text>
                    </View>


                </View>

                <View style={{flex:1}}/>
                <ImageLoad style={styles.listImg}
                           source={{uri:image_thumb}}/>

            </TouchableOpacity>)
        }


    };

    _pressItem = (item) => {
        router.toNewsInfoPage(this.props, item)
    };

}


const bindAction = dispatch => ({
    getNewsList: (body) => dispatch(fetchNewsList(body))
});

const mapStateToProps = state => ({
    loading: state.NewsState.loading,
    error: state.NewsState.error,
    hasData: state.NewsState.hasData,
    actionType: state.NewsState.actionType,
    errorMsg: state.NewsState.errorMsg,
    newsList: state.NewsState.newsList,
    newsTypeId: state.NewsState.newsTypeId
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