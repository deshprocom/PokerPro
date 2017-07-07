/**
 * Created by lorne on 2017/2/24.
 */
import {
    GET_ORDER_DETAIL, GET_ORDER_LIST, POST_ORDER_CANCEL,
    POST_ADDRESS,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    actionType: '',
    orderDetail: {},
    orderList: {},
    orderStatus: '',
    address:{}
};

export default function orderState(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_DETAIL:
            state.orderDetail = {};
            return handleFetch(state, action);
        case GET_ORDER_LIST:
            state.orderList = {};
            return handleFetch(state, action);
        case POST_ORDER_CANCEL:
            return handleFetch(state, action);
        case POST_ADDRESS:
            state.address = {};
            return handleFetch(state,action);

        default:
            return state;
    }
}

function handleFetch(state, action) {
    if (action.fetching === FETCHING) {
        return {
            ...state,
            loading: true,
            hasData: false,
            error: false,
            actionType: action.type
        }
    } else if (action.fetching === FETCH_SUCCESS) {
        if (action.type === GET_ORDER_DETAIL) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                orderDetail: action.orderDetail
            }
        } else if (action.type === GET_ORDER_LIST) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                orderList: action.orderList,
                orderStatus: action.type + action.orderStatus
            }
        } else if (action.type === POST_ORDER_CANCEL) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type
            }
        }else if(action.type === POST_ADDRESS){
            return{
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type
            }
        }


    } else {
        return {
            ...state,
            loading: false,
            error: true,
            actionType: action.type
        }
    }
}