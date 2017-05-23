/**
 * Created by lorne on 2017/2/14.
 */
import {
    GET_RACE_INFO, GET_SEARCH_RACES, SEARCH_BY_KEYWORD,
    SEARCH_BY_DATE, SEARCH_RANGE_LIST, SUB_RACES, RACE_RANKS,
    SUB_RACE_INFO, SUB_RACE_RANKS,RACE_HOSTS,RACE_TICKET,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    raceInfo: {},
    actionType: '',
    listRaces: {},
    rangeList: {},
    subRaces: [],
    raceRanks: {},
    subRaceInfo: {},
    subRaceRanks: {},
    raceHost:{},
    raceTickets:{}
};

export default function raceInfoState(state = initialState, action) {

    switch (action.type) {
        case 'ClearSearch':
            state.listRaces = {};
            return {
                ...state,
                loading: true,
                hasData: false,
                error: false,
                actionType: action.type
            };
        case GET_RACE_INFO:
            state.raceInfo = {};
            return handleRacesFetch(state, action);
        case GET_SEARCH_RACES:
            state.listRaces = {};
            return handleRacesFetch(state, action);
        case SEARCH_BY_DATE:
            state.listRaces = {};
            return handleRacesFetch(state, action);
        case SEARCH_BY_KEYWORD:
            state.listRaces = {};
            return handleRacesFetch(state, action);
        case SEARCH_RANGE_LIST:
            state.rangeList = {};
            return handleRacesFetch(state, action);
        case SUB_RACES:
            state.subRaces = [];
            return handleRacesFetch(state, action);
        case RACE_RANKS:
            state.raceRanks = {};
            return handleRacesFetch(state, action);
        case SUB_RACE_INFO:
            state.subRaceInfo = {};
            return handleRacesFetch(state, action);
        case SUB_RACE_RANKS:
            state.subRaceRanks = {};
            return handleRacesFetch(state, action);
        case RACE_HOSTS:
            state.raceHost = {};
            return handleRacesFetch(state, action);
        case RACE_TICKET:
            state.raceTickets = {};
            return handleRacesFetch(state, action);



        default:
            return state;
    }
}

function handleRacesFetch(state, action) {
    if (action.fetching === FETCHING) {
        return {
            ...state,
            loading: true,
            hasData: false,
            error: false,
            actionType: action.type
        }
    } else if (action.fetching === FETCH_SUCCESS) {
        if (action.type === GET_RACE_INFO) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                raceInfo: action.raceInfo
            }
        } else if (action.type === GET_SEARCH_RACES) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                listRaces: action.listRaces
            }
        } else if (action.type === SEARCH_BY_DATE) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                listRaces: action.listRaces
            }
        } else if (action.type === SEARCH_BY_KEYWORD) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                listRaces: action.listRaces
            }
        } else if (action.type === SEARCH_RANGE_LIST) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                rangeList: action.rangeList
            }
        } else if (action.type === SUB_RACES) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                subRaces: action.subRaces
            }
        } else if (action.type === RACE_RANKS) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                raceRanks: action.raceRanks
            }
        } else if (action.type === SUB_RACE_INFO) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                subRaceInfo: action.subRaceInfo
            }
        } else if (action.type === SUB_RACE_RANKS) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                subRaceRanks: action.subRaceRanks
            }
        }else if(action.type === RACE_HOSTS){
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                raceHost: action.raceHost
            }
        }else if(action.type === RACE_TICKET){
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                raceTickets: action.raceTickets
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