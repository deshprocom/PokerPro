/**
 * Created by lorne on 2017/1/4.
 */
import {
    GET_PROFILE, PUT_PROFILE,
    FETCH_START, FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';
import {getProfile, putProfile} from '../services/AccountDao';

const initialState = {
    fetching: FETCH_START,
    profile: {},
    error: {},
    apiType: ''
};

export default function account(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                fetching: action.fetching,
                profile: action.profile,
                error: action.error,
                apiType: action.type
            };
        case PUT_PROFILE:
            return {
                ...state,
                fetching: action.fetching,
                profile: action.profile,
                error: action.error,
                apiType: action.type
            };
        default:
            return state;
    }
}

export function fetchGetProfile(user_id) {
    return (dispatch) => {
        dispatch(_getProfile());
        getProfile(user_id, (ret) => {
            dispatch(_getProfileOk(ret))
        }, (err) => {
            dispatch(_getProfileFail(err))
        })
    }
}

export function fetchPutProfile(user_id, body) {
    return (dispatch) => {
        dispatch(_putProfile());
        putProfile(user_id, body, (ret) => {
            dispatch(_putProfileOk(ret))
        }, (err) => {
            dispatch(_putProfileFail(err))
        })
    }
}


export function _putProfile() {
    return {
        type: PUT_PROFILE,
        fetching: FETCHING
    }
}

export function _putProfileOk(profile) {
    return {
        type: PUT_PROFILE,
        fetching: FETCH_SUCCESS,
        profile: profile
    }
}

export function _putProfileFail(error) {
    return {
        type: PUT_PROFILE,
        fetching: FETCH_FAIL,
        error: error
    }
}

export function _getProfile() {
    return {
        type: GET_PROFILE,
        fetching:FETCHING
    }
}

export function _getProfileOk(profile) {
    return {
        type: GET_PROFILE,
        fetching: FETCH_SUCCESS,
        profile: profile
    }
}

export function _getProfileFail(error) {
    return {
        type: GET_PROFILE,
        fetching: FETCH_FAIL,
        error: error
    }
}