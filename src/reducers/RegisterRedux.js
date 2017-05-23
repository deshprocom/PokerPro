/**
 * Created by lorne on 2016/12/29.
 */
import * as TYPTES from '../actions/ActionTypes';
import * as LoginService from '../services/AccountDao';

const initialState = {
    fetching: TYPTES.FETCH_START,
    user: {},
    error: {},
    apiType: ''
};

export default function register(state = initialState, action) {
    switch (action.type) {
        case TYPTES.MOBILE_REGISTER:
            console.log('.....register....', action.fetching)
            console.log(action.user)
            console.log(action.error)
            console.log('.....register....', action.fetching)
            return {
                ...state,
                fetching: action.fetching,
                user: action.user,
                error: action.error,
                apiType: action.type
            };
        case TYPTES.MOBILE_LOGIN:
            return {
                ...state,
                fetching: action.fetching,
                user: action.user,
                error: action.error,
                apiType: action.type,

            };
        case TYPTES.EMAIL_LOGIN:
            return {
                ...state,
                fetching: action.fetching,
                user: action.user,
                error: action.error,
                apiType: action.type,
            };
        default:
            return state;

    }
}
/*邮箱登陆*/
export function _loginFetchEmail(email, password) {
    const body = {
        type: 'email',
        email: email,
        password: password
    };
    return (dispatch) => {
        dispatch(_loginEmailRequest());
        LoginService.postLogin(body, (data) => {
            dispatch(_loginEmailSuccess(data));
        }, (error) => {
            dispatch(_loginEmailFail(error));
        })
    }
}
/*手机密码登陆*/
export function _loginFetchPassword(username, password) {
    const body = {
        type: 'mobile',
        mobile: username,
        password: password
    };
    return (dispatch) => {
        dispatch(_loginMobileRequest());
        LoginService.postLogin(body, (data) => {
            dispatch(_loginMobileSuccess(data));
        }, (error) => {
            dispatch(_loginMobileFail(error));
        })
    }
}
/*手机验证码登陆*/
export function _loginFetchCode(username, vcode) {
    const body = {
        type: 'vcode',
        mobile: username,
        vcode: vcode
    };
    return (dispatch) => {
        dispatch(_loginMobileRequest());
        LoginService.postLogin(body, (data) => {
            dispatch(_loginMobileSuccess(data));
        }, (error) => {
            dispatch(_loginMobileFail(error));
        })
    }
}
/*邮箱注册*/
export function _registerFetchEmail(email, password) {
    const body = {
        type: 'email',
        email: email,
        password: password
    };
    return (dispatch) => {
        dispatch(_registerMobileRequest());
        LoginService.postRegister(body, (data) => {
            dispatch(_registerMobileSuccess(data));
        }, (error) => {
            dispatch(_registerMobileFail(error));
        })
    }
}

export function _loginEmailRequest() {
    return {
        type: TYPTES.EMAIL_LOGIN,
        fetching: TYPTES.FETCHING
    }
}

export function _loginEmailSuccess(user) {
    return {
        type: TYPTES.EMAIL_LOGIN,
        fetching: TYPTES.FETCH_SUCCESS,
        user: user
    }
}

export function _loginEmailFail(error) {
    return {
        type: TYPTES.EMAIL_LOGIN,
        fetching: TYPTES.FETCH_FAIL,
        error: error
    }
}

export function _loginMobileRequest() {
    return {
        type: TYPTES.MOBILE_REGISTER,
        fetching: TYPTES.FETCHING
    }
}

export function _loginMobileSuccess(user) {
    return {
        type: TYPTES.MOBILE_REGISTER,
        fetching: TYPTES.FETCH_SUCCESS,
        user: user
    }
}

export function _loginMobileFail(error) {
    return {
        type: TYPTES.MOBILE_REGISTER,
        fetching: TYPTES.FETCH_FAIL,
        error: error
    }
}

/*手机注册*/
export function _registerFetchMobile(phone, vcode, password) {
    const body = {
        type: 'mobile',
        mobile: phone,
        vcode: vcode,
        password: password
    };
    return (dispatch) => {
        dispatch(_registerMobileRequest());
        LoginService.postRegister(body, (data) => {
            dispatch(_registerMobileSuccess(data));
        }, (error) => {
            dispatch(_registerMobileFail(error));
        })
    }
}

export function _registerMobileRequest() {
    return {
        type: TYPTES.MOBILE_REGISTER,
        fetching: TYPTES.FETCHING
    }
}

export function _registerMobileSuccess(user) {
    return {
        type: TYPTES.MOBILE_REGISTER,
        fetching: TYPTES.FETCH_SUCCESS,
        user: user
    }
}

export function _registerMobileFail(error) {
    return {
        type: TYPTES.MOBILE_REGISTER,
        fetching: TYPTES.FETCH_FAIL,
        error: error
    }
}

var myreg = /^1(3|4|5|7|8)\d{9}$/;
export function checkPhone(phone) {
    if (phone != null && phone != undefined) {
        if (!myreg.test(phone)) {
            alert('请输入有效的手机号码！');
            return false;
        }
        return true;
    }
}

var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export function checkMail(mail) {

    if (filter.test(mail)) return true;
    else {
        alert('您的电子邮件格式不正确');
        return false;
    }
}

export function checkLoginMail(mail) {

    if (filter.test(mail)) return true;
    else {
        return false;
    }
}