/**
 * Created by lorne on 2017/2/23.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ListView, Platform,
    ActivityIndicator,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {isEmptyObject, strNotNull} from '../../utils/ComonHelper';
import {GET_ORDER_LIST, POST_ORDER_CANCEL} from '../../actions/ActionTypes';
import {fetchOrderList} from '../../actions/OrderAction';
import {LoginUser} from '../../services/AccountDao';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import ItemOrderView from './ItemOrderView';
import {_renderFooter, _renderHeader} from '../../components/LoadingView';

import {Verified} from '../../configs/Status';

class ListOrderView extends Component {


    componentDidMount() {
        this._pullToRefreshListView.beginRefresh()
    }


    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.initData();

    }

    initData = () => {
        let dataList = [];
        this.state = {
            dataList: dataList,
            dataSource: this.ds.cloneWithRows(dataList),
            next_id: '0'
        };
    }


    componentWillReceiveProps(newProps) {
        const {orderStatus, hasData, orderList, loading, actionType} = newProps;

        if (hasData && this.props.loading !== loading)
            if (orderStatus === GET_ORDER_LIST + this.props.status
                && actionType === GET_ORDER_LIST) {

                if (this.state.next_id === '0') {
                    this.state.dataList.splice(0, this.state.dataList.length);
                    this._pullToRefreshListView.endRefresh()
                } else {
                    this._pullToRefreshListView.endLoadMore(false)
                }


                const {items, next_id} = orderList;
                let newDataList = this.state.dataList.concat(items)

                this.setState({
                    dataList: newDataList,
                    dataSource: this.ds.cloneWithRows(newDataList),
                    next_id: next_id
                });
            }
    }


    _loadList = (next_id) => {
        if (!isEmptyObject(LoginUser) && strNotNull(LoginUser.user_id)) {

            const body = {
                user_id: LoginUser.user_id,
                page_size: 10,
                status: this.props.status,
                next_id: next_id
            };

            this.props._getOrderList(body);
        }

    }

    _onLoadMore = () => {
        const {next_id} = this.state;
        if (strNotNull(next_id)) {
            this._loadList(next_id);
        } else {
            this._pullToRefreshListView.endLoadMore(false)
        }
    }
    _onRefresh = () => {
        this.setState({
            next_id: '0'
        });

        this._loadList('0')
    };

    _beginRefresh = () => {
        this._pullToRefreshListView.beginRefresh();
    };

    _lookOrderDetail = (order_id, price) => {
        if (user_extra.status !== Verified.PASSED)

            router.toOrderInfoPage(this.props, order_id, price,
                this._beginRefresh)
    };


    _renderRow = (rowData, sectionID, rowID) => {

        const {order_info, race_info, ticket} = rowData;
        return (<TouchableOpacity
            onPress={() => this._lookOrderDetail(order_info.order_id, order_info.price)}
            activeOpacity={1}
            testID={'btn_orders_' + rowID}
            style={{marginBottom: 5}}>

            <View style={{height: 6}}/>
            {/*赛事简介*/}
            <ItemOrderView
                refresh={this._beginRefresh}
                ticket={ticket}
                orderInfo={order_info}
                raceInfo={race_info}/>


        </TouchableOpacity>)
    }


    render() {

        const {testViewID} = this.props;

        return (<View
            testID={testViewID}
            style={ApplicationStyles.bgContainer}>
            <PullToRefreshListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                onLoadMore={this._onLoadMore}
                onRefresh={this._onRefresh}
                renderHeader={(viewState) => _renderHeader(viewState, headerStyle)}
                renderFooter={(viewState) => _renderFooter(viewState, headerStyle)}
                enableEmptySections={true}
                ref={(component) => this._pullToRefreshListView = component}
                viewType={PullToRefreshListView.constants.viewType.listView}
            />


        </View>)
    }


}

const headerStyle = {height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bg_f5};


const bindAction = dispatch => ({
    _getOrderList: (body) => dispatch(fetchOrderList(body))
});

const mapStateToProps = state => ({
    loading: state.OrderState.loading,
    error: state.OrderState.error,
    hasData: state.OrderState.hasData,
    actionType: state.OrderState.actionType,
    orderList: state.OrderState.orderList,
    orderStatus: state.OrderState.orderStatus
});

export default connect(mapStateToProps, bindAction)(ListOrderView);