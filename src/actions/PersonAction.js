/**
 * Created by lorne on 2017/1/6.
 */
import {
    GET_PROFILE, PUT_PROFILE, POST_UPLOAD_AVATAR,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL
} from '../actions/ActionTypes';
import {getProfile, putProfile, postAvatar, localLoginUser} from '../services/AccountDao';
import {showToast} from '../utils/ComonHelper';
import {followships} from '../services/SocialDao';

function _putProfile() {
    return {
        type: PUT_PROFILE,
        fetching: FETCHING
    }
}

function _putProfileOk(profile) {
    return {
        type: PUT_PROFILE,
        fetching: FETCH_SUCCESS,
        profile: profile
    }
}

function _putProfileFail(error) {
    return {
        type: PUT_PROFILE,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _getProfile() {
    return {
        type: GET_PROFILE,
        fetching: FETCHING
    }
}

function _getProfileOk(profile, followships) {
    return {
        type: GET_PROFILE,
        fetching: FETCH_SUCCESS,
        profile: profile,
        followships: followships
    }
}

function _getProfileFail(error) {
    return {
        type: GET_PROFILE,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postAvatar() {
    return {
        type: POST_UPLOAD_AVATAR,
        fetching: FETCHING
    }
}

function _postAvatarOk(profile) {
    return {
        type: POST_UPLOAD_AVATAR,
        fetching: FETCH_SUCCESS,
        profile: profile
    }
}

function _PostAvatarFail(error) {
    return {
        type: POST_UPLOAD_AVATAR,
        fetching: FETCH_FAIL,
        error: error
    }
}

export function fetchGetProfile(user_id) {
    return (dispatch) => {
        dispatch(_getProfile());
        getProfile(user_id, (profile) => {
            dispatch(_getProfileOk(profile))

        }, (err) => {
            showToast(err);
            dispatch(_getProfileFail(err))
        })
    }
}

export function fetchPutProfile(user_id, body) {
    return (dispatch) => {
        dispatch(_putProfile());
        putProfile(user_id, body, (ret) => {
            showToast('修改成功');
            dispatch(_putProfileOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_putProfileFail(err))
        })
    }
}

export function fetchPostAvatar(body) {
    return (dispatch) => {
        dispatch(_postAvatar());
        postAvatar(body, (ret) => {
            showToast('头像修改成功');
            dispatch(_postAvatarOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_PostAvatarFail(err))
        })
    }
}
