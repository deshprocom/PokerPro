/**
 * Created by lorne on 2017/4/20.
 */
import {
    GET_NEWS_SEARCH, GET_NEWS_TYPES, GET_NEWS_LIST,
    GET_VIDEO_TYPE, GET_VIDEO_LIST, SEARCH_VIDEO,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    actionType: '',
    newsTypes: {},
    newsList: {},
    newsSearch: {},
    errorMsg: '',
    videoList: {},
    videoType: {},
    videoSearch: {}
};

export default function newsState(state = initialState, action) {
    switch (action.type) {
        case GET_NEWS_LIST:
            state.newsList = {};
            return handleFetch(state, action);
        case GET_NEWS_SEARCH:
            state.newsSearch = {};
            return handleFetch(state, action);
        case GET_NEWS_TYPES:
            state.newsTypes = {};
            return handleFetch(state, action);
        case GET_VIDEO_LIST:
            state.videoList = {};
            return handleFetch(state, action);
        case GET_VIDEO_TYPE:
            state.videoType = {};
            return handleFetch(state, action);
        case SEARCH_VIDEO:
            state.videoSearch = {};
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
            actionType: action.type
        }
    } else if (action.fetching === FETCH_SUCCESS) {

        if (action.type === GET_NEWS_LIST) {
            state.newsList = action.newsList;
            state.newsTypeId = action.newsTypeId;

        } else if (action.type === GET_NEWS_SEARCH) {
            state.newsSearch = action.newsSearch;

        } else if (action.type === GET_NEWS_TYPES) {
            state.newsTypes = action.newsTypes;

        } else if (action.type === GET_VIDEO_TYPE) {
            state.videoType = action.videoType;
        } else if (action.type === GET_VIDEO_LIST) {
            state.videoList = action.videoList;
            state.videoTypeId = action.videoTypeId;
        } else if (action.type === SEARCH_VIDEO) {
            state.videoSearch = action.videoSearch;
        }

        return {
            ...state,
            loading: false,
            hasData: true,
            error: false,
            actionType: action.type,
        };


    } else {
        return {
            ...state,
            loading: false,
            error: true,
            actionType: action.type,
            errorMsg: action.errorMsg
        }
    }
}