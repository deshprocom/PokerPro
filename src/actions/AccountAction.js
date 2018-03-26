/**
 * Created by lorne on 2017/1/9.
 */
import {
    POST_EMAIL_LOGIN, POST_PHONE_LOGIN, POST_VCODE_LOGIN,
    POST_VERIFY_CODE, POST_RESET_PASSWORD, POST_REGISTER, POST_PASSWORD_IMAGE,
    POST_CHANGE_PWD, POST_V_CODE, POST_CERTIFICATION, GET_CERTIFICATION,
    POST_CARD_IMAGE, GET_PLAYER_INFO, POST_BIND_ACCOUNT, POST_CHANGE_BIND,
    POST_CHANGE_PERMISSION, GET_NOTIFICATIONS, DEL_NOTIFICATIONS, GET_UNREAND_MSG,
    SHOW_BACK_TOP, HIDE_BACK_TOP,BACK_TOP,VIDEO_PAUSE,SWITCH_LANGUAGE,
    FETCH_SUCCESS, FETCHING, FETCH_FAIL, FETCH_PASS, FETCH_PASS_SUCCESS, FETCH_PASS_FAIL,
    SHARE_CLOSE,SHARE_OPEN,
} from '../actions/ActionTypes';
import {showToast} from '../utils/ComonHelper';
import I18n from 'react-native-i18n';


import {
    postLogin, postVerifyCode,
    postRegister, postResetPwdCode,
    postChangePwd, LoginUser, postVCode,
    postCertification, getCertification,
    postCardImage, postPasswordImage, playerInfo, postChangeBind,
    postBindAccount, postChangePermission, getNotifications,
    delNotification, getMsgUnRead
} from '../services/AccountDao';

export function shareOpen(share_param) {
    return{
        type:SHARE_OPEN,
        share_param
    }
}
export function shareClose() {
    return{
        type:SHARE_CLOSE,
        share_param:{}
    }
    
}

export function switchLanguage() {
    return {
        type: SWITCH_LANGUAGE
    }
}

export function videoPause() {
    return {
        type: VIDEO_PAUSE
    }
}

export function onPressBackTop() {
    return {
        type: BACK_TOP
    }
}

export function showTabTop() {
    return {
        type: SHOW_BACK_TOP
    }
}

export function hideTabTop() {
    return {
        type: HIDE_BACK_TOP
    }
}

export function fetchUnreadMsg() {
    return (dispatch) => {
        dispatch(_getMsgNum());
        getMsgUnRead((ret) => {
            dispatch(_getMsgNumOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getMsgNumFail(err))
        })
    }
}


export function fetchDelNotice(body, success) {

    return (dispatch) => {
        dispatch(_delNotice());
        delNotification(body, (ret) => {
            success();
            dispatch(_delNoticeOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_delNoticeFail(err))
        })
    }
}

export function fetchNotifications() {
    return (dispatch) => {
        dispatch(_getNotifications());
        getNotifications((ret) => {
            dispatch(_getNotificationsOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getNotificationsFail(err))
        })
    }
}

export function fetchChangePermission(body) {
    return (dispatch) => {
        dispatch(_postChangePermission());
        postChangePermission(body, (ret) => {
            dispatch(_postChangePermissionOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postChangePermissionFail(err))
        })
    }
}


export function fetchBindAccount(body) {
    return (dispatch) => {
        dispatch(_postBindAccount());
        postBindAccount(body, (ret) => {
            dispatch(_postBindAccountOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postBindAccountFail(err))
        })
    }
}

export function fetchChangBind(body) {
    return (dispatch) => {
        dispatch(_postChangeBind());
        postChangeBind(body, (ret) => {
            dispatch(_postChangeBindOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postChangeBindFail(err))
        })
    }
}


export function fetchPlayer(body) {

    return (dispatch) => {
        dispatch(_getPlayer());
        playerInfo(body, (ret) => {
            dispatch(_getPlayerOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_getPlayerFail(err))
        })
    }
}


/*上传身份证图片*/
export function fetchPostCardImage(body) {

    return (dispatch) => {
        dispatch(_postCardImage());
        postCardImage(body, (ret) => {

            dispatch(_postCardImageOk())
        }, (err) => {
            showToast(err);
            dispatch(_postCardImageFail(err))
        })
    }
}

// 上传护照图片
export function fetchPostPasswordImage(body) {
    return (dispatch) => {
        dispatch(_postPasswordImage());
        postPasswordImage(body, (ret) => {
            dispatch(_postPasswordImageOK())
        }, (err) => {
            showToast(err);
            dispatch(_postPasswordImageFail(err))
        })
    }
}

global.user_extra = {};

/*获取实名信息*/
export function fetchGetCertification() {

    return (dispatch) => {
        dispatch(_getCertification());
        getCertification(LoginUser.user_id, (ret) => {
            let {user_extra} = ret.data;
            global.user_extra = user_extra;
            dispatch(_getCertificationOk(user_extra))
        }, (err) => {
            dispatch(_getCertificationFail(err))
        })
    }
}

/*提交实名信息*/
export function fetchPostCertification(body) {

    return (dispatch) => {
        dispatch(_postCertification());
        postCertification(LoginUser.user_id, body, (ret) => {
            let {user_extra} = ret.data;
            global.user_extra = user_extra;
            dispatch(_postCertificationOk(user_extra))
            showToast('信息提交成功');
        }, (err) => {
            showToast(err);
            dispatch(_postCertificationFail(err))
        })
    }
}


/*获取验证码*/
export function fetchPostVCode(body) {

    return (dispatch) => {
        dispatch(_postVCode());
        postVCode(body, (ret) => {
            if (body.vcode_type === 'mobile') {
                showToast(I18n.t('mobile_code_send'))
            } else {
                showToast(I18n.t('email_code_send') + body.email)
            }
            dispatch(_postVCodeOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postVCodeFail(err))
        })
    }
}

/*修改密码*/
export function fetchPostChangePwd(body) {

    return (dispatch) => {
        dispatch(_postChangePwd());
        postChangePwd(body, (ret) => {
            dispatch(_postChangePwdOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postChangePwdFail(err))
        })
    }
}

/*登陆*/
export function fetchPostLogin(body) {

    return (dispatch) => {
        dispatch(_postEmail());
        postLogin(body, (ret) => {
            dispatch(_postEmailOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postEmailFail(err))
        })
    }
}


/*检验验证码是否正确*/
export function fetchPostVerifyCode(body) {

    return (dispatch) => {
        dispatch(_postVerifyCode());
        postVerifyCode(body, (ret) => {
            dispatch(_postVerifyCodeOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postVerifyCodeFail(err))
        })
    }
}

/*重置密码*/
export function fetchPostEmailResetPwd(email, vcode, password) {
    const body = {
        type: 'email',
        email: email,
        vcode: vcode,
        password: password
    };
    return (dispatch) => {
        dispatch(_postResetPassword());
        postResetPwdCode(body, (ret) => {
            dispatch(_postResetPasswordOk(ret))
            showToast(I18n.t('reset_password'))
        }, (err) => {
            showToast(err);
            dispatch(_postResetPasswordFail(err))
        })
    }
}

export function fetchPostMobileResetPwd(mobile, vcode, password) {
    const body = {
        type: 'mobile',
        mobile: mobile,
        vcode: vcode,
        password: password
    };
    return (dispatch) => {
        dispatch(_postResetPassword());
        postResetPwdCode(body, (ret) => {
            dispatch(_postResetPasswordOk(ret))
            showToast(I18n.t('reset_password'))
        }, (err) => {
            showToast(err);
            dispatch(_postResetPasswordFail(err))
        })
    }
}


/*注册*/
export function fetchPostEmailRegister(email, password) {
    const body = {
        type: 'email',
        email: email,
        password: password
    };
    return (dispatch) => {
        dispatch(_postRegister());
        postRegister(body, (ret) => {
            dispatch(_postRegisterOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postRegisterFail(err))
        })
    }
}

export function fetchPostRegister(body) {
    return (dispatch) => {
        dispatch(_postRegister());
        postRegister(body, (ret) => {
            dispatch(_postRegisterOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postRegisterFail(err))
        })
    }
}

export function fetchPostMobileRegister(mobile, vcode, password) {
    const body = {
        type: 'mobile',
        mobile: mobile,
        vcode: vcode,
        password: password
    };
    return (dispatch) => {
        dispatch(_postRegister());
        postRegister(body, (ret) => {
            dispatch(_postRegisterOk(ret))
        }, (err) => {
            showToast(err);
            dispatch(_postRegisterFail(err))
        })
    }
}

function _postEmail() {
    return {
        type: POST_EMAIL_LOGIN,
        fetching: FETCHING
    }
}

function _postEmailOk(loginUser) {
    return {
        type: POST_EMAIL_LOGIN,
        fetching: FETCH_SUCCESS,
        loginUser: loginUser
    }
}

function _postEmailFail(error) {
    return {
        type: POST_EMAIL_LOGIN,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _postPhone() {
    return {
        type: POST_PHONE_LOGIN,
        fetching: FETCHING
    }
}

function _postPhoneOk(loginUser) {
    return {
        type: POST_PHONE_LOGIN,
        fetching: FETCH_SUCCESS,
        loginUser: loginUser
    }
}

function _postPhoneFail(error) {
    return {
        type: POST_PHONE_LOGIN,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _postVcode() {
    return {
        type: POST_VCODE_LOGIN,
        fetching: FETCHING
    }
}

function _postVcodeOk(loginUser) {
    return {
        type: POST_VCODE_LOGIN,
        fetching: FETCH_SUCCESS,
        loginUser: loginUser
    }
}

function _postVcodeFail(error) {
    return {
        type: POST_VCODE_LOGIN,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postVerifyCode() {
    return {
        type: POST_VERIFY_CODE,
        fetching: FETCHING
    }
}

function _postVerifyCodeOk() {
    return {
        type: POST_VERIFY_CODE,
        fetching: FETCH_SUCCESS
    }
}

function _postVerifyCodeFail(error) {
    return {
        type: POST_VERIFY_CODE,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postResetPassword() {
    return {
        type: POST_RESET_PASSWORD,
        fetching: FETCHING
    }
}

function _postResetPasswordOk() {
    return {
        type: POST_RESET_PASSWORD,
        fetching: FETCH_SUCCESS
    }
}

function _postResetPasswordFail(error) {
    return {
        type: POST_RESET_PASSWORD,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postRegister() {
    return {
        type: POST_REGISTER,
        fetching: FETCHING
    }
}

function _postRegisterOk(loginUser) {
    return {
        type: POST_REGISTER,
        fetching: FETCH_SUCCESS,
        loginUser: loginUser
    }
}

function _postRegisterFail(error) {
    return {
        type: POST_REGISTER,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postChangePwd() {
    return {
        type: POST_CHANGE_PWD,
        fetching: FETCHING
    }
}

function _postChangePwdOk() {
    return {
        type: POST_CHANGE_PWD,
        fetching: FETCH_SUCCESS
    }
}

function _postChangePwdFail(error) {
    return {
        type: POST_CHANGE_PWD,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postVCode() {
    return {
        type: POST_V_CODE,
        fetching: FETCHING
    }
}

function _postVCodeOk() {
    return {
        type: POST_V_CODE,
        fetching: FETCH_SUCCESS
    }
}

function _postVCodeFail(error) {
    return {
        type: POST_V_CODE,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postCertification() {
    return {
        type: POST_CERTIFICATION,
        fetching: FETCHING
    }
}

function _postCertificationOk(user_extra) {
    return {
        type: POST_CERTIFICATION,
        fetching: FETCH_SUCCESS,
        user_extra: user_extra
    }
}

function _postCertificationFail(error) {
    return {
        type: POST_CERTIFICATION,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _getCertification() {
    return {
        type: GET_CERTIFICATION,
        fetching: FETCHING
    }
}

function _getCertificationOk(user_extra) {
    return {
        type: GET_CERTIFICATION,
        fetching: FETCH_SUCCESS,
        user_extra: user_extra
    }
}

function _getCertificationFail(error) {
    return {
        type: GET_CERTIFICATION,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _postCardImage() {
    return {
        type: POST_CARD_IMAGE,
        fetching: FETCHING
    }
}

function _postPasswordImage() {
    return {
        type: POST_PASSWORD_IMAGE,
        fetching: FETCH_PASS
    }
}

function _postCardImageOk() {
    return {
        type: POST_CARD_IMAGE,
        fetching: FETCH_SUCCESS
    }
}

function _postCardImageFail(error) {
    return {
        type: POST_CARD_IMAGE,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postPasswordImageOK() {
    return {
        type: POST_PASSWORD_IMAGE,
        fetching: FETCH_PASS_SUCCESS
    }
}

function _postPasswordImageFail() {
    return {
        type: POST_PASSWORD_IMAGE,
        fetching: FETCH_PASS_FAIL
    }
}

function _getPlayer() {
    return {
        type: GET_PLAYER_INFO,
        fetching: FETCHING
    }
}

function _getPlayerOk(player) {
    return {
        type: GET_PLAYER_INFO,
        fetching: FETCH_SUCCESS,
        player: player
    }
}

function _getPlayerFail(error) {
    return {
        type: GET_PLAYER_INFO,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postChangeBind() {
    return {
        type: POST_CHANGE_BIND,
        fetching: FETCHING
    }
}

function _postChangeBindOk() {
    return {
        type: POST_CHANGE_BIND,
        fetching: FETCH_SUCCESS,
    }
}

function _postChangeBindFail(error) {
    return {
        type: POST_CHANGE_BIND,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _postBindAccount() {
    return {
        type: POST_BIND_ACCOUNT,
        fetching: FETCHING
    }
}

function _postBindAccountOk() {
    return {
        type: POST_BIND_ACCOUNT,
        fetching: FETCH_SUCCESS,
    }
}

function _postBindAccountFail(error) {
    return {
        type: POST_BIND_ACCOUNT,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _postChangePermission() {
    return {
        type: POST_CHANGE_PERMISSION,
        fetching: FETCHING
    }
}

function _postChangePermissionOk() {
    return {
        type: POST_CHANGE_PERMISSION,
        fetching: FETCH_SUCCESS,
    }
}

function _postChangePermissionFail(error) {
    return {
        type: POST_CHANGE_PERMISSION,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _getNotifications() {
    return {
        type: GET_NOTIFICATIONS,
        fetching: FETCHING
    }
}

function _getNotificationsOk(notices) {
    return {
        type: GET_NOTIFICATIONS,
        fetching: FETCH_SUCCESS,
        notices: notices
    }
}

function _getNotificationsFail(error) {
    return {
        type: GET_NOTIFICATIONS,
        fetching: FETCH_FAIL,
        error: error
    }
}

function _delNotice() {
    return {
        type: DEL_NOTIFICATIONS,
        fetching: FETCHING
    }
}

function _delNoticeOk() {
    return {
        type: DEL_NOTIFICATIONS,
        fetching: FETCH_SUCCESS
    }
}

function _delNoticeFail(error) {
    return {
        type: DEL_NOTIFICATIONS,
        fetching: FETCH_FAIL,
        error: error
    }
}


function _getMsgNum() {
    return {
        type: GET_UNREAND_MSG,
        fetching: FETCHING
    }
}

export function _getMsgNumOk(unread) {
    return {
        type: GET_UNREAND_MSG,
        fetching: FETCH_SUCCESS,
        unread: unread
    }
}

function _getMsgNumFail(error) {
    return {
        type: GET_UNREAND_MSG,
        fetching: FETCH_FAIL,
        error: error
    }
}