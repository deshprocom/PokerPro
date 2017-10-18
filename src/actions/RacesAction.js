/**
 * Created by lorne on 2017/1/18.
 */
import {
    GET_RECENT_RACES, GET_PROFILE, GET_RACE_INFO,
    GET_SEARCH_RACES, SEARCH_BY_DATE, SEARCH_BY_KEYWORD,
    SEARCH_RANGE_LIST, SUB_RACES, RACE_RANKS, RACE_TICKET,
    SUB_RACE_INFO, SUB_RACE_RANKS, RACE_HOSTS,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';
import {
    getRecentRaces, getRacesInfo, searchRaces,
    searchRaceKeyword, searchByDate, searchRangeList,
    subRaces, raceRanks, getSubRaceInfo, getRaceHost,
    getRaceTickets
} from '../services/RacesDao';
import {showToast} from '../utils/ComonHelper';


export function fetchTickets(body) {
    return (dispatch) => {
        dispatch(_getRaceTicket());
        getRaceTickets(body, (ret) => {
            dispatch(_getRaceTicketOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getRaceTicketFail(err))
        })
    }
}


export function fetchRaceHost() {
    return (dispatch) => {
        dispatch(_getRaceHosts());
        getRaceHost((ret) => {
            dispatch(_getRaceHostsOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getRaceHostsFail(err))
        })
    }
}


export function fetchSubInfo(body) {
    return (dispatch) => {
        dispatch(_getSubRaceInfo());
        getSubRaceInfo(body, (ret) => {
            dispatch(_getSubRaceInfoOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getSubRaceInfoFail(err))
        })
    }
}


export function fetchRaceRanks(body) {
    return (dispatch) => {
        dispatch(_getRaceRanks());
        raceRanks(body, (ret) => {
            dispatch(_getRaceRanksOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getRaceRanksFail(err))
        })
    }
}

export function fetchSubRaceRanks(body) {
    return (dispatch) => {
        dispatch(_getSubRaceRanks());
        raceRanks(body, (ret) => {
            dispatch(_getSubRaceRanksOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getSubRaceRanksFail(err))
        })
    }
}

export function fetchSubRaces(body) {
    return (dispatch) => {
        dispatch(_getSubRaces());
        subRaces(body, (ret) => {
            dispatch(_getSubRacesOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getSubRacesFail(err))
        })
    }
}


export function fetchRangeList(body) {
    return (dispatch) => {
        dispatch(_getSearchRangeList());
        searchRangeList(body, (ret) => {
            dispatch(_getSearchRangeListOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getSearchRangeListFail(err))
        })
    }
}
//赛事关键字查询(查询标题或地点含有关键字的赛事)
export function fetchSearchByKeyword(body) {
    return (dispatch) => {
        dispatch(_getSearchByKeyword());
        searchRaceKeyword(body, (ret) => {
            dispatch(_getSearchByKeywordOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getSearchByKeywordFail(err))
        })
    }
}


export function fetchSearchByDate(body) {
    return (dispatch) => {
        if (body.next_id === '0')
            dispatch(clearSearch())
        else
            dispatch(_getSearchByDate());
        searchByDate(body, (ret) => {
            dispatch(_getSearchByDateOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getSearchByDateFail(err))
        })
    }
}


/*查询赛事列表*/
export function fetchGetSearchRaces(body) {
    return (dispatch) => {
        dispatch(_getSearchRaces());
        searchRaces(body, (ret) => {
            dispatch(_getSearchRacesOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getSearchRacesFail(err))
        })
    }
}

export function fetchGetRecentRaces(body) {
    return (dispatch) => {
        dispatch(_getRecentRaces());
        // getRecentRaces(body, (ret) => {
        //     const {items} = ret;
        //     dispatch(_getRecentRacesOk(items))
        // }, (err) => {
        //     showToast(err);
        //     dispatch(_getRecentRacesFail(err))
        // })
    }
}


export function fetchRacesInfo(body) {
    return (dispatch) => {
        dispatch(_getRacesInfo());
        getRacesInfo(body, (ret) => {
            dispatch(_getRacesInfoOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getRacesInfoFail(err))
        })
    }
}

export function _getProfileOk(profile) {
    return {
        type: GET_PROFILE,
        fetching: FETCH_SUCCESS,
        profile: profile
    }
}


export function _getRecentRaces() {
    return {
        type: GET_RECENT_RACES,
        fetching: FETCHING
    }
}

function _getRecentRacesOk(listRaces) {
    return {
        type: GET_RECENT_RACES,
        fetching: FETCH_SUCCESS,
        listRaces: listRaces
    }
}

function _getRecentRacesFail(error) {
    return {
        type: GET_RECENT_RACES,
        fetching: FETCH_FAIL,
        error: error
    }
}

export function _getRacesInfo() {
    return {
        type: GET_RACE_INFO,
        fetching: FETCHING
    }
}

function _getRacesInfoOk(raceInfo) {
    return {
        type: GET_RACE_INFO,
        fetching: FETCH_SUCCESS,
        raceInfo: raceInfo
    }
}

function _getRacesInfoFail(error) {
    return {
        type: GET_RACE_INFO,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _getSearchRaces() {
    return {
        type: GET_SEARCH_RACES,
        fetching: FETCHING
    }
}

function _getSearchRacesOk(listRaces) {
    return {
        type: GET_SEARCH_RACES,
        fetching: FETCH_SUCCESS,
        listRaces: listRaces
    }
}

function _getSearchRacesFail(error) {
    return {
        type: GET_SEARCH_RACES,
        fetching: FETCH_FAIL,
        error: error
    }
}

export function clearSearch() {
    return {
        type: 'ClearSearch'
    }
}

function _getSearchByDate() {
    return {
        type: SEARCH_BY_DATE,
        fetching: FETCHING
    }
}

function _getSearchByDateOk(listRaces) {
    return {
        type: SEARCH_BY_DATE,
        fetching: FETCH_SUCCESS,
        listRaces: listRaces
    }
}

function _getSearchByDateFail(error) {
    return {
        type: SEARCH_BY_DATE,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _getSearchByKeyword() {
    return {
        type: SEARCH_BY_KEYWORD,
        fetching: FETCHING
    }
}

function _getSearchByKeywordOk(listRaces) {
    return {
        type: SEARCH_BY_KEYWORD,
        fetching: FETCH_SUCCESS,
        listRaces: listRaces
    }
}

function _getSearchByKeywordFail(error) {
    return {
        type: SEARCH_BY_KEYWORD,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _getSearchRangeList() {
    return {
        type: SEARCH_RANGE_LIST,
        fetching: FETCHING
    }
}

function _getSearchRangeListOk(rangeList) {
    return {
        type: SEARCH_RANGE_LIST,
        fetching: FETCH_SUCCESS,
        rangeList: rangeList
    }
}

function _getSearchRangeListFail(error) {
    return {
        type: SEARCH_RANGE_LIST,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _getSubRaces() {
    return {
        type: SUB_RACES,
        fetching: FETCHING
    }
}

function _getSubRacesOk(subRaces) {
    return {
        type: SUB_RACES,
        fetching: FETCH_SUCCESS,
        subRaces: subRaces
    }
}

function _getSubRacesFail(error) {
    return {
        type: SUB_RACES,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _getRaceRanks() {
    return {
        type: RACE_RANKS,
        fetching: FETCHING
    }
}

function _getRaceRanksOk(raceRanks) {
    return {
        type: RACE_RANKS,
        fetching: FETCH_SUCCESS,
        raceRanks: raceRanks
    }
}

function _getRaceRanksFail(error) {
    return {
        type: RACE_RANKS,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _getSubRaceRanks() {
    return {
        type: SUB_RACE_RANKS,
        fetching: FETCHING
    }
}

function _getSubRaceRanksOk(subRaceRanks) {
    return {
        type: SUB_RACE_RANKS,
        fetching: FETCH_SUCCESS,
        subRaceRanks: subRaceRanks
    }
}

function _getSubRaceRanksFail(error) {
    return {
        type: SUB_RACE_RANKS,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _getSubRaceInfo() {
    return {
        type: SUB_RACE_INFO,
        fetching: FETCHING
    }
}

function _getSubRaceInfoOk(subRaceInfo) {
    return {
        type: SUB_RACE_INFO,
        fetching: FETCH_SUCCESS,
        subRaceInfo: subRaceInfo
    }
}

function _getSubRaceInfoFail(error) {
    return {
        type: SUB_RACE_INFO,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _getRaceHosts() {
    return {
        type: RACE_HOSTS,
        fetching: FETCHING
    }
}

function _getRaceHostsOk(raceHost) {
    return {
        type: RACE_HOSTS,
        fetching: FETCH_SUCCESS,
        raceHost: raceHost
    }
}

function _getRaceHostsFail(error) {
    return {
        type: RACE_HOSTS,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _getRaceTicket() {
    return {
        type: RACE_TICKET,
        fetching: FETCHING
    }
}

function _getRaceTicketOk(raceTickets) {
    return {
        type: RACE_TICKET,
        fetching: FETCH_SUCCESS,
        raceTickets: raceTickets
    }
}

function _getRaceTicketFail(error) {
    return {
        type: RACE_TICKET,
        fetching: FETCH_FAIL,
        error: error
    }
}