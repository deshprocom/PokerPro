/**
 * Created by lorne on 2017/2/20.
 */
import {
    GET_RACE_NEW_ORDER, GET_TICKET_STATUS, POST_BUY_TICKET,
    GET_CERTIFICATION, POST_CERTIFICATION,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';
import {getNewOrder, buyTicket, getTicketStatus} from '../services/RacesDao';
import {showToast} from '../utils/ComonHelper';


/*购票*/
export function fetchTicketStatus(body) {
    return (dispatch) => {
        dispatch(_getTicketStatus());
        getTicketStatus(body, (ret) => {
            dispatch(_getTicketStatusOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getTicketStatusFail(err))
        })
    }
}

/*购票*/
export function fetchBuyTicket(race_id, body) {
    return (dispatch) => {
        dispatch(_postBuyTicket());
        buyTicket(race_id, body, (ret) => {
            dispatch(_postBuyTicketOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postBuyTicketFail(err))
        })
    }
}


/*购票详情*/
export function fetchRaceNewOrder(body) {
    return (dispatch) => {
        dispatch(_getRaceNewOrder());
        getNewOrder(body, (ret) => {
            dispatch(_getRaceNewOrderOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getRaceNewOrderFail(err))
        })
    }
}

function _getRaceNewOrder() {
    return {
        type: GET_RACE_NEW_ORDER,
        fetching: FETCHING
    }
}

function _getRaceNewOrderOk(race_ticket_addr) {
    return {
        type: GET_RACE_NEW_ORDER,
        fetching: FETCH_SUCCESS,
        race_ticket_addr: race_ticket_addr
    }
}

function _getRaceNewOrderFail(error) {
    return {
        type: GET_RACE_NEW_ORDER,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postBuyTicket() {
    return {
        type: POST_BUY_TICKET,
        fetching: FETCHING
    }
}

function _postBuyTicketOk() {
    return {
        type: POST_BUY_TICKET,
        fetching: FETCH_SUCCESS
    }
}

function _postBuyTicketFail(error) {
    return {
        type: POST_BUY_TICKET,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _getTicketStatus() {
    return {
        type: GET_TICKET_STATUS,
        fetching: FETCHING
    }
}

function _getTicketStatusOk() {
    return {
        type: GET_TICKET_STATUS,
        fetching: FETCH_SUCCESS
    }
}

function _getTicketStatusFail(error) {
    return {
        type: GET_TICKET_STATUS,
        fetching: FETCH_FAIL,
        error: error
    }
}