/**
 * Created by lorne on 2017/1/9.
 */
import {
    POST_EMAIL_LOGIN, POST_PHONE_LOGIN, POST_VCODE_LOGIN,
    POST_VERIFY_CODE, POST_RESET_PASSWORD, POST_REGISTER,
    POST_CHANGE_PWD, POST_V_CODE, POST_CARD_IMAGE,
    GET_PLAYER_INFO, POST_BIND_ACCOUNT, POST_CHANGE_BIND,
    POST_CHANGE_PERMISSION, GET_NOTIFICATIONS, DEL_NOTIFICATIONS,SWITCH_LANGUAGE,
    GET_UNREAND_MSG, SHOW_BACK_TOP, HIDE_BACK_TOP, BACK_TOP, VIDEO_PAUSE,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL,SHARE_CLOSE,SHARE_OPEN,
} from '../actions/ActionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    loginUser: {},
    actionType: '',
    player: {},
    notices: {},
    unread: {},
    share_param: {},
};

export default function accountState(state = initialState, action) {
    switch (action.type) {
        case POST_PHONE_LOGIN:
            return handleFetch(state, action);
        case POST_VCODE_LOGIN:
            return handleFetch(state, action);
        case POST_EMAIL_LOGIN:
            return handleFetch(state, action);
        case POST_VERIFY_CODE:
            return handleNoData(state, action);
        case POST_RESET_PASSWORD:
            return handleNoData(state, action);
        case POST_REGISTER:
            return handleRegister(state, action);
        case POST_CHANGE_PWD:
            return handleNoData(state, action);
        case POST_V_CODE:
            return handleNoData(state, action);
        case POST_CARD_IMAGE:
            return handleFetch(state, action);
        case GET_PLAYER_INFO:
            state.player = {};
            return handleFetch(state, action);
        case POST_BIND_ACCOUNT:
            return handleNoData(state, action);
        case POST_CHANGE_BIND:
            return handleNoData(state, action);
        case POST_CHANGE_PERMISSION:
            return handleNoData(state, action);
        case GET_NOTIFICATIONS:
            state.notices = {};
            return handleFetch(state, action);
        case DEL_NOTIFICATIONS:
            return handleNoData(state, action);
        case GET_UNREAND_MSG:
            return handleFetch(state, action);
        case SHOW_BACK_TOP:
            return {
                ...state,
                actionType: SHOW_BACK_TOP
            };
        case HIDE_BACK_TOP:
            return {
                ...state,
                actionType: HIDE_BACK_TOP
            };
        case BACK_TOP:
            return {
                ...state,
                actionType: BACK_TOP
            };
        case VIDEO_PAUSE:
            return {
                ...state,
                actionType: VIDEO_PAUSE
            };
        case SWITCH_LANGUAGE:
            return {
                ...state,
                actionType: SWITCH_LANGUAGE
            };
        case SHARE_CLOSE:
            return {
                ...state,
                actionType:SHARE_CLOSE,
                share_param:{},
            };
        case SHARE_OPEN:
            return {
                ...state,
                actionType:SHARE_OPEN,
                share_param:action.share_param,
            };
        default:
            return state;
    }
}

function handleNoData(state, action) {
    if (action.fetching === FETCHING) {
        return {
            ...state,
            loading: true,
            hasData: false,
            error: false,
            actionType: action.type
        }
    } else if (action.fetching === FETCH_SUCCESS) {
        return {
            ...state,
            loading: false,
            hasData: true,
            error: false,
            actionType: action.type
        }
    } else {
        return {
            ...state,
            loading: false,
            error: true,
            hasData: false,
            actionType: action.type
        }
    }
}

function handleRegister(state, action) {
    if (action.fetching === FETCHING) {
        return {
            ...state,
            loading: true,
            hasData: false,
            error: false,
            actionType: action.type
        }
    } else if (action.fetching === FETCH_SUCCESS) {
        return {
            ...state,
            loading: false,
            hasData: true,
            error: false,
            loginUser: action.loginUser,
            actionType: action.type
        }
    } else {
        return {
            ...state,
            loading: false,
            error: true,
            hasData: false,
            actionType: action.type
        }
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
        if (action.type === POST_CARD_IMAGE) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type
            }
        } else if (action.type === GET_PLAYER_INFO) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                player: action.player
            }

        } else if (action.type === GET_NOTIFICATIONS) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                notices: action.notices
            }

        } else if (action.type === GET_UNREAND_MSG) {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                actionType: action.type,
                unread: action.unread
            }
        }

        else {
            return {
                ...state,
                loading: false,
                hasData: true,
                error: false,
                loginUser: action.loginUser,
                actionType: action.type
            }
        }


    } else {
        return {
            ...state,
            loading: false,
            error: true,
            hasData: false,
            actionType: action.type
        }
    }
}