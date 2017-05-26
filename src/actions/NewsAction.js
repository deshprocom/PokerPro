/**
 * Created by lorne on 2017/4/20.
 */
import {
    GET_NEWS_LIST, GET_NEWS_SEARCH, GET_NEWS_TYPES,
    GET_VIDEO_LIST, GET_VIDEO_TYPE, SEARCH_VIDEO,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';
import {showToast} from '../utils/ComonHelper';

import {
    getNewsList, getNewsSearch, getNewsTypes,
    getVideoList, getVideoTypes, getVideoSearch
} from '../services/NewsDao';


export function fetchVideoSearch(body) {
    return (dispatch) => {
        dispatch(_getVideoSearch());
        getVideoSearch(body, (ret) => {
            dispatch(_getVideoSearchOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getVideoSearchFail(err))
        })
    }
}

export function fetchVideoType(body) {
    return (dispatch) => {
        dispatch(_getVideoType());
        getVideoTypes(body, (ret) => {
            dispatch(_getVideoTypeOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getVideoTypeFail(err))
        })
    }
}


export function fetchVideoList(body) {
    const {type_id} = body;
    return (dispatch) => {
        dispatch(_getVideoList());
        getVideoList(body, (ret) => {
            dispatch(_getVideoListOk(ret,type_id))
        }, (err) => {
            showToast(err);
            dispatch(_getVideoListFail(err))
        })
    }
}

export function fetchNewsSearch(body) {
    return (dispatch) => {
        dispatch(_newsSearch());
        getNewsSearch(body, (ret) => {
            dispatch(_newsSearchOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_newsSearchFail(err))
        })
    }
}

export function fetchNewsList(body) {
    const {type_id} = body;
    return (dispatch) => {
        dispatch(_newsList(type_id));
        getNewsList(body, (ret) => {
            dispatch(_newsListOk(ret, type_id))
        }, (err) => {
            showToast(err);
            dispatch(_newsListFail(err, type_id))
        })
    }
}


export function fetchNewsTypes() {
    return (dispatch) => {
        dispatch(_newsTypes());
        getNewsTypes((ret) => {
            dispatch(_newsTypesOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_newsTypesFail(err))
        })
    }
}

function _newsSearch() {
    return {
        type: GET_NEWS_SEARCH,
        fetching: FETCHING
    }
}

function _newsSearchOk(newsSearch) {
    return {
        type: GET_NEWS_SEARCH,
        fetching: FETCH_SUCCESS,
        newsSearch: newsSearch
    }
}

function _newsSearchFail(errorMsg) {
    return {
        type: GET_NEWS_SEARCH,
        fetching: FETCH_FAIL,
        errorMsg: errorMsg
    }
}


function _newsList(newsTypeId) {
    return {
        type: GET_NEWS_LIST,
        fetching: FETCHING,
        newsTypeId: newsTypeId
    }
}

function _newsListOk(newsList, newsTypeId) {
    return {
        type: GET_NEWS_LIST,
        fetching: FETCH_SUCCESS,
        newsList: newsList,
        newsTypeId: newsTypeId
    }
}

function _newsListFail(errorMsg, newsTypeId) {
    return {
        type: GET_NEWS_LIST,
        fetching: FETCH_FAIL,
        errorMsg: errorMsg,
        newsTypeId: newsTypeId
    }
}


function _newsTypes() {
    return {
        type: GET_NEWS_TYPES,
        fetching: FETCHING
    }
}

function _newsTypesOk(newsTypes) {
    return {
        type: GET_NEWS_TYPES,
        fetching: FETCH_SUCCESS,
        newsTypes: newsTypes
    }
}

function _newsTypesFail(errorMsg) {
    return {
        type: GET_NEWS_TYPES,
        fetching: FETCH_FAIL,
        errorMsg: errorMsg
    }
}


function _getVideoList() {
    return {
        type: GET_VIDEO_LIST,
        fetching: FETCHING
    }
}

function _getVideoListOk(videoList,type_id) {
    return {
        type: GET_VIDEO_LIST,
        fetching: FETCH_SUCCESS,
        videoList: videoList,
        videoTypeId:type_id
    }
}

function _getVideoListFail(errorMsg) {
    return {
        type: GET_VIDEO_LIST,
        fetching: FETCH_FAIL,
        errorMsg: errorMsg
    }
}

function _getVideoType() {
    return {
        type: GET_VIDEO_TYPE,
        fetching: FETCHING
    }
}

function _getVideoTypeOk(videoType) {
    return {
        type: GET_VIDEO_TYPE,
        fetching: FETCH_SUCCESS,
        videoType: videoType
    }
}

function _getVideoTypeFail(errorMsg) {
    return {
        type: GET_VIDEO_TYPE,
        fetching: FETCH_FAIL,
        errorMsg: errorMsg
    }
}


function _getVideoSearch() {
    return {
        type: SEARCH_VIDEO,
        fetching: FETCHING
    }
}

function _getVideoSearchOk(searchVideo) {
    return {
        type: SEARCH_VIDEO,
        fetching: FETCH_SUCCESS,
        searchVideo: searchVideo
    }
}

function _getVideoSearchFail(errorMsg) {
    return {
        type: SEARCH_VIDEO,
        fetching: FETCH_FAIL,
        errorMsg: errorMsg
    }
}