/**
 * Created by lorne on 2017/1/18.
 */
import {
    GET_RECENT_RACES, GET_PROFILE,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    actionType: '',
    profile: {},
    listRaces: {},
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
            actionType: action.type
        }
    } else if (action.fetching === FETCH_SUCCESS) {
        if (action.type === GET_RECENT_RACES) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                listRaces: action.listRaces
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