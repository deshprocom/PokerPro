/**
 * Created by lorne on 2017/4/24.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, ListView,
    TouchableOpacity, Image, TextInput,
    InteractionManager, Animated, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import TestRouter from '../../components/TestRouter';
import I18n from 'react-native-i18n';
import {GET_NEWS_SEARCH} from '../../actions/ActionTypes';
import {isEmptyObject, convertDate, strNotNull} from '../../utils/ComonHelper';
import {connect} from 'react-redux';
import {fetchNewsSearch} from '../../actions/NewsAction';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {ImageLoad, PullListView} from '../../components';
import {_renderFooter, _renderHeader} from '../../components/LoadingView';
const headerStyle = {height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bg_f5};


class SearchNewsPage extends Component {


    constructor(props) {
        super(props);
        this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.race_id !== r2.race_id,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            componentDataSource: this._dataSource.cloneWithRows([]),
            newsListData: [],
            newsListNextId: '0',
            keyword: ''
        };


    }


    render() {

        return (<View
            testID="page_news_search"
            style={ApplicationStyles.bgContainer}>

            {this._navSearchBar()}
            {this._content()}
        </View>)
    }


    componentWillReceiveProps(newProps) {
        const {newsSearch, actionType, hasData, loading} = newProps;
        const {newsListData, newsListNextId} = this.state;

        if (actionType === GET_NEWS_SEARCH
            && hasData
            && this.props.loading !== loading) {
            const {items, next_id} = newsSearch;

            if (newsListNextId !== '0') {
                this._pullToRefreshListView.endLoadMore();
                newsListData.concat(items);
                this.setState({
                    componentDataSource: this._dataSource.cloneWithRows(newsListData),
                    newsListNextId: next_id,
                    newsListData: newsListData
                })
            } else {
                this._pullToRefreshListView.endRefresh();
                this.setState({
                    componentDataSource: this._dataSource.cloneWithRows(items),
                    newsListNextId: '0',
                    newsListData: items
                })
            }

        }
    }

    _content = () => {

        const {newsListData} = this.state;

        return (<View>

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
            {isEmptyObject(newsListData) ? <NoDataView/> : null}

        </View>)

    }


    _onRefresh = () => {
        const {keyword} = this.state;
        this._getNewsList(keyword, '0')
    }

    _onLoadMore = () => {

        const {newsListNextId, keyword} = this.state;
        router.log("onEndReached", keyword, newsListNextId);
        this._getNewsList(keyword, newsListNextId)

    }

    _getNewsList = (keyword, next_id) => {
        const body = {
            keyword: keyword,
            next_id: next_id
        };

        this.props.getSearchNews(body);
    }

    _pressItem = (item) => {
        router.toNewsInfoPage(this.props, item)
    }

    _itemNewsView = (rowData, sectionID, rowID) => {
        const {image, title, source, date, image_thumb} = rowData;

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

    _navSearchBar = () => {
        return (<View style={styles.navBar}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    testID="btn_bar_left"
                    style={styles.popBtn}
                    onPress={()=>router.pop()}>
                    <Image style={styles.backImg}
                           source={Images.sign_return}/>
                </TouchableOpacity>
                <TestRouter/>
                <View
                    style={styles.searchView}>

                    <View style={styles.searchBar}>
                        <Image style={styles.searchImg}
                               source={Images.news_outline}/>
                        <TextInput
                            testID="input_news_search"
                            placeholderTextColor={Colors.txt_666}
                            placeholder={I18n.t('news_outline')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            underlineColorAndroid="transparent"
                            style={this._searchInput()}
                            onChangeText={text=>{
                                this.setState({
                                    keyword:text
                                });
                                if(strNotNull(text))
                                this._getNewsList(text, '0')
                            }}

                        />

                    </View>

                </View>

            </View>
        </View>)
    }

    _searchInput = () => {
        if (Platform.OS === 'ios')
            return styles.searchTextInput;
        else
            return styles.androidInput;
    }


}


export default connect(
    state => ({
        loading: state.NewsState.loading,
        error: state.NewsState.error,
        hasData: state.NewsState.hasData,
        actionType: state.NewsState.actionType,
        errorMsg: state.NewsState.errorMsg,
        newsSearch: state.NewsState.newsSearch
    }),
    dispatch => ({
        getSearchNews: (body) => dispatch(fetchNewsSearch(body))

    })
)(SearchNewsPage);

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
});