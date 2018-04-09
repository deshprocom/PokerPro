/**
 * Created by lorne on 2017/1/18.
 */
import {
    GET_RECENT_RACES,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    actionType: '',
    profile: {},
    listRaces: {},
    fetching: ''
};

export default function homeState(state = initialState, action) {
    switch (action.type) {
        case GET_RECENT_RACES:
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
            actionType: action.type,
            fetching: action.fetching
        }
    } else if (action.fetching === FETCH_SUCCESS) {
        if (action.type === GET_RECENT_RACES) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                listRaces: action.listRaces,
                fetching: action.fetching
            }
        }

    } else {
        return {
            ...state,
            loading: false,
            error: true,
            actionType: action.type,
            fetching: action.fetching
        }
    }
}