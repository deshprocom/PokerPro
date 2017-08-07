/**
 * Created by lorne on 2017/7/29.
 */
import {GET_MAIN_RANK, FETCHING, FETCH_SUCCESS, FETCH_FAIL} from '../actions/ActionTypes';
import {getMainRank} from '../services/RankDao';

export function getRankPlayer(body){
    return(dispatch) => {
        dispatch(_getMainRank());
        getMainRank(body, (ret) => {
            dispatch(_getMainRankOK(ret))
        }, (err) => {
            dispatch(_getMainRankFail(err))
        })
    }
}

function _getMainRank() {
    return {
        type: GET_MAIN_RANK,
        fetching: FETCHING
    }
}

function _getMainRankOK(rankPlayer) {
    return {
        type: GET_MAIN_RANK,
        fetching: FETCH_SUCCESS,
        rankPlayer: rankPlayer
    }
}

function _getMainRankFail(error) {
    return {
        type: GET_MAIN_RANK,
        fetching: FETCH_FAIL,
        error: error
    }
}
