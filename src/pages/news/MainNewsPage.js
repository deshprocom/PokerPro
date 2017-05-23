/**
 * Created by lorne on 2017/4/20.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import TestRouter from '../../components/TestRouter';
import I18n from 'react-native-i18n';
import {GET_NEWS_TYPES} from '../../actions/ActionTypes';
import {isEmptyObject, convertDate} from '../../utils/ComonHelper';
import {connect} from 'react-redux';
import {fetchNewsTypes} from '../../actions/NewsAction';
import NewsListView from './NewsListView';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';


class MainNewsPage extends Component {

    componentDidMount() {
        this.props.getNewsTypes();
    }

    state = {
        typeListData: [],
        selectTypeId: 1
    }


    componentWillReceiveProps(newProps) {

        const {actionType, newsTypes, loading} = newProps;

        if (actionType === GET_NEWS_TYPES && !isEmptyObject(newsTypes) && !loading) {
            let {items} = newsTypes;

            items.map(function (x) {
                x['select'] = false;
            });
            if (items.length > 0) {

                items[0].select = true;
                this.setState({
                    typeListData: items,
                    selectTypeId: items[0].id
                })
            }

        }

    }


    render() {

        return (
            <View
                testID="page_news_main"
                style={ApplicationStyles.bgContainer}>
                {this._navSearchBar()}

                {this._newsTypeView()}

                {this._listView()}
            </View>
        )
    }

    _listView = () => {
        const {typeListData, selectTypeId} = this.state;

        let pages = [];

        typeListData.forEach(function (x) {
            pages.push(
                <NewsListView
                    tabLabel={x.name}
                    key={x.id}
                    selectTypeId={selectTypeId}
                    newsTypeItem={x}/>
            );
        });


        return (  <ScrollableTabView
            onChangeTab={({i})=>{
                router.log('tab',i);
                if(i== undefined || i < 0 || i>pages.length)
                    return;
                let item = typeListData[i];

                if(isEmptyObject(item))
                    return;

                this.setState({
                    selectTypeId:item.id
                });
                this.typeList.scrollToIndex({viewPosition: 1, index: Number(i)});
                this._pressItem(item);
            }}
            renderTabBar={false}
            ref={ref=>this.newsPages = ref}>
            {pages}
        </ScrollableTabView>)

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
                <TouchableOpacity
                    testID="btn_news_search"
                    activeOpacity={1}
                    onPress={()=>router.toSearchNewsPage()}
                    style={styles.searchView}>

                    <View style={styles.searchBar}>
                        <Image style={styles.searchImg}
                               source={Images.news_outline}/>
                        <Text style={styles.txtOutline}>{I18n.t('news_outline')}</Text>

                    </View>

                </TouchableOpacity>

            </View>
        </View>)
    }

    _newsTypeView = () => {

        return ( <View style={styles.newsTypeView}>
            <FlatList
                ref={ref=>this.typeList = ref}
                legacyImplementation={false}
                showsHorizontalScrollIndicator={false}
                data={this.state.typeListData}
                renderItem={this._itemView}
                horizontal={true}
                keyExtractor={item=> item.id}
            />
        </View> )
    }


    _itemView = ({item}) => {

        return (<TouchableOpacity
            testID={"btn_news_type_"+item.id}
            onPress={()=>{
                this._pressItem(item);

                  this.setState({
                    selectTypeId:item.id
                });
                this.newsPages.goToPage(this._page(item))
            }}
            style={styles.itemView}>
            {item.select ? <View style={{flex:1}}/> : null}
            <Text style={item.select?
            styles.itemTxtSelect:styles.itemTxt}>{item.name}</Text>
            {item.select ? <Image style={styles.triangle}
                                  source={Images.news_triangle}/> : null}

        </TouchableOpacity>)
    }

    _page = (item) => {
        const {typeListData} = this.state;
        for (var i = 0; i < typeListData.length; i++) {
            if (item.id === typeListData[i].id)
                return i;
        }
    }


    _pressItem = (item) => {

        this.setState((state) => {
            const newData = [...state.typeListData];
            newData.map(function (element) {

                if (item.id === element.id) {
                    element.select = true
                } else {
                    element.select = false
                }
                return element;
            });

            return {typeListData: newData}
        })
    }


}

export default connect(
    state => ({
        loading: state.NewsState.loading,
        error: state.NewsState.error,
        hasData: state.NewsState.hasData,
        actionType: state.NewsState.actionType,
        errorMsg: state.NewsState.errorMsg,
        newsTypes: state.NewsState.newsTypes
    }),
    dispatch => ({
        getNewsTypes: () => dispatch(fetchNewsTypes())

    })
)(MainNewsPage);

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
    txtOutline: {
        color: Colors.txt_666,
        fontSize: 12
    },
    newsTypeView: {
        height: 40,
        backgroundColor: Colors.white
    },
    itemView: {
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemTxt: {
        color: Colors._AAA,
        fontSize: 14
    },
    itemTxtSelect: {
        color: '#444444',
        fontSize: 16
    },
    triangle: {
        height: 9,
        width: 16
    },
    viewPage: {
        flex: 1
    }

});