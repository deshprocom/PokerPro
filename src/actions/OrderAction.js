/**
 * Created by lorne on 2017/2/24.
 */
import {
    GET_ORDER_LIST, GET_ORDER_DETAIL, POST_ORDER_CANCEL,
    POST_ADDRESS,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';
import {getOrderDetail, getOrderList, postOrderCancel} from '../services/OrderDao';
import {showToast} from '../utils/ComonHelper';


export function fetchAddress(body) {
    return (dispatch) => {
        dispatch(_postAddress());
        postOrderCancel(body, (ret) => {
            dispatch(_postAddressOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postAddressFail(err))
        })
    }
}


/*取消订单*/
export function fetchOrderCancel(body) {
    return (dispatch) => {
        dispatch(_postOrderCancel());
        postOrderCancel(body, (ret) => {
            dispatch(_postOrderCancelOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postOrderCancelFail(err))
        })
    }
}

/*订单详情*/
export function fetchOrderDetail(body) {
    return (dispatch) => {
        dispatch(_getOrderDetail());
        getOrderDetail(body, (ret) => {
            dispatch(_getOrderDetailOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getOrderDetailFail(err))
        })
    }
}

/*订单列表*/
export function fetchOrderList(body) {
    return (dispatch) => {
        dispatch(_getOrderList());
        getOrderList(body, (ret) => {
            dispatch(_getOrderListOk(ret, body.status))
        }, (err) => {
            showToast(err);
            dispatch(_getOrderListFail(err))
        })
    }
}


function _getOrderList() {
    return {
        type: GET_ORDER_LIST,
        fetching: FETCHING
    }
}

function _getOrderListOk(orderList, status) {
    return {
        type: GET_ORDER_LIST,
        fetching: FETCH_SUCCESS,
        orderList: orderList,
        orderStatus: status
    }
}

function _getOrderListFail(error) {
    return {
        type: GET_ORDER_LIST,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _getOrderDetail() {
    return {
        type: GET_ORDER_DETAIL,
        fetching: FETCHING
    }
}

function _getOrderDetailOk(orderDetail) {
    return {
        type: GET_ORDER_DETAIL,
        fetching: FETCH_SUCCESS,
        orderDetail: orderDetail
    }
}

function _getOrderDetailFail(error) {
    return {
        type: GET_ORDER_DETAIL,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _postOrderCancel() {
    return {
        type: POST_ORDER_CANCEL,
        fetching: FETCHING
    }
}

function _postOrderCancelOk() {
    return {
        type: POST_ORDER_CANCEL,
        fetching: FETCH_SUCCESS
    }
}

function _postOrderCancelFail(error) {
    return {
        type: POST_ORDER_CANCEL,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postAddress() {
    return {
        type: POST_ADDRESS,
        fetching: FETCHING
    }
}

function _postAddressOk(address) {
    return {
        type: POST_ADDRESS,
        fetching: FETCH_SUCCESS,
        address: address
    }
}

function _postAddressFail(error) {
    return {
        type: POST_ADDRESS,
        fetching: FETCH_FAIL,
        error: error
    }
}



