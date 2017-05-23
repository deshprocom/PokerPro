/**
 * Created by lorne on 2017/2/20.
 */
import {
    GET_RACE_NEW_ORDER, GET_TICKET_STATUS, POST_BUY_TICKET,
    GET_CERTIFICATION, POST_CERTIFICATION,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';


const initialState = {
    loading: false,
    hasData: false,
    error: false,
    race_ticket_addr: {},
    actionType: '',
    user_extra: {}
};

export default function ticketOrderState(state = initialState, action) {
    switch (action.type) {
        case GET_RACE_NEW_ORDER:
            return handleFetch(state, action);
        case POST_CERTIFICATION:
            state.user_extra = {};
            return handleFetch(state, action);
        case POST_BUY_TICKET:
            return handleFetch(state, action);
        case GET_TICKET_STATUS:
            return handleFetch(state, action);
        case GET_CERTIFICATION:
            state.user_extra = {};
            return handleFetch(state, action);
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
            actionType: action.type,
        }
    } else if (action.fetching === FETCH_SUCCESS) {
        if (action.type === GET_RACE_NEW_ORDER) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                race_ticket_addr: action.race_ticket_addr
            }
        } else if (action.type === POST_CERTIFICATION) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                user_extra: action.user_extra
            }
        } else if (action.type === GET_CERTIFICATION) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                user_extra: action.user_extra

            }
        } else if (action.type === POST_BUY_TICKET) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type

            }
        } else {
            return {
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