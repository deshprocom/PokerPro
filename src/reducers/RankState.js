/**
 * Created by lorne on 2017/7/29.
 */
import {FETCH_SUCCESS, FETCHING, RANK_CHECK_TYPE,GET_MAIN_RANK} from '../actions/ActionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    typeData: []
};

export default function rankList(state = initialState, action) {
    switch (action.type){
        case GET_MAIN_RANK:
            state.typeData = [];
            return handleRankFetch(state, action);
        default:
            return state
    }
};

function handleRankFetch(state, action) {
    if(action.fetching === FETCHING){
        return {
            ...state,
            loading: true,
            hasData: false,
            error: false,
            actionType: action.type
        }
    }else if(action.fetching === FETCH_SUCCESS){
        if(action.type === GET_MAIN_RANK){
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                typeData: action.rankPlayer
            }
        }
    }else{
        return{
            ...state,
            loading: false,
            error: true,
            actionType: action.type
        }
    }
};


