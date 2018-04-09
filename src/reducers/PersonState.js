/**
 * Created by lorne on 2017/1/6.
 */
import {
    GET_PROFILE, PUT_PROFILE, POST_UPLOAD_AVATAR,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    profile: {},
    actionType: '',
    followships: {
        following_count: 0,
        follower_count: 0
    }
};

export default function profileDataState(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return handleFetch(state, action);
        case PUT_PROFILE:
            return handleFetch(state, action);
        case POST_UPLOAD_AVATAR:
            return handleFetch(state, action);
        default:
            return state;
    }
}

function handleFetch(state, action) {
    if (action.fetching === FETCHING) {
        return {
            ...state,
            hasData: false,
            error: false,
            loading: true,
            actionType: action.type
        }
    } else if (action.fetching === FETCH_SUCCESS) {
        return {
            ...state,
            loading: false,
            hasData: true,
            error: false,
            profile: action.profile,
            actionType: action.type,
            followships: action.followships ? action.followships : {
                following_count: 0,
                follower_count: 0
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