/**
 * Created by lorne on 2016/12/26.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';
import StorageKey from '../configs/StorageKey';
import JpushHelp from './JpushHelper';
import {isEmptyObject} from '../utils/ComonHelper';

export function postLoginCount() {
    helper.post(Api.login_count(), {}, ret => {
    }, err => {
    })
}

export function delNotification(body, resolve, reject) {
    helper.del(Api.delNotice(body), {}, (ret) => {
        resolve(ret.data);
    }, reject);
}

export function getNotifications(resolve, reject) {
    helper.get(Api.notifications(), (ret) => {
        resolve(ret.data);
    }, reject);
}
export function postChangePermission(body, resolve, reject) {
    helper.post(Api.change_permission(), body, (ret) => {
        resolve(ret.data);
    }, reject);
}

export function postBindAccount(body, resolve, reject) {
    helper.post(Api.bind_account(), body, (ret) => {
        resolve(ret.data);
    }, reject);
}

export function postChangeBind(body, resolve, reject) {
    helper.post(Api.account_change_bind(), body, (ret) => {
        resolve(ret.data);
    }, reject);
}

export function playerInfo(body, resolve, reject) {
    helper.get(Api.player_info(body), (ret) => {
        resolve(ret.data);
    }, reject);
}


export function postVCode(body, resolve, reject) {

    helper.post(Api.v_codes, body, (ret) => {
        resolve(ret.data);
    }, reject);
}

/*注册*/
export function postRegister(body, resolve, reject) {

    helper.post(Api.register, body, (ret) => {
        let {access_token} = ret.data;
        setLoginUser(ret.data);
        helper.setAccessToken(access_token);
        storage.save({
            key: StorageKey.LoginUser,
            rawData: ret.data
        });
        resolve(ret.data);
    }, reject);
}

/*登陆*/
export function postLogin(body, resolve, reject) {
    helper.post(Api.login, body, (ret) => {
        let {access_token, user_id} = ret.data;
        setLoginUser(ret.data);
        helper.setAccessToken(access_token);
        storage.save({
            key: StorageKey.LoginUser,
            rawData: ret.data
        });
        resolve(ret);
    }, reject);
}

export var LoginUser = {};

global.login_user = {};
export function setLoginUser(ret) {
    LoginUser = ret;
    global.login_user = ret;

    if (!isEmptyObject(ret)) {
        JpushHelp.getRegistrationID((id) => {
            router.log('JpushId: ' + id)
        });
        let type = helper.getApiType() === 'production' ? 'pro' : helper.getApiType();
        let alias = type + '_' + ret.user_id;
        console.log(alias)
        JpushHelp.setAlias(alias, () => {
            router.log(alias + ' set jpush alias success')
        }, () => {
            router.log(alias + ' set jpush alias fail')
        })
    }

}

export function removeToken() {
    helper.removeToken();
}

export function localLoginUser(resolve, reject) {
    storage.load({key: StorageKey.LoginUser})
        .then(ret => {
            resolve(ret)
        }).catch(err => {
        reject(err)
    });
}

/*修改个人资料*/
export function putProfile(user_id, body, resolve, reject) {
    helper.put(Api.account_profile(user_id), body, (ret) => {
        storage.save({
            key: StorageKey.profile,
            rawData: ret.data
        });
        resolve(ret.data);
    }, reject);
}
/*获取个人资料*/
export function getProfile(user_id, resolve, reject) {
    helper.get(Api.account_profile(user_id), (ret) => {
        storage.save({
            key: StorageKey.profile,
            rawData: ret.data
        });
        resolve(ret.data);
    }, reject);
}

/*上传头像*/
export function postAvatar(body, resolve, reject) {
    helper.post(Api.upload_avatar, body, (ret) => {
        resolve(ret.data)
    }, reject);
}


/*检验验证码是否正确*/
export function postVerifyCode(body, resolve, reject) {
    helper.post(Api.account_verify, body, resolve, reject);
}
/*找回密码*/
export function postResetPwdCode(body, resolve, reject) {
    helper.post(Api.account_reset_password, body, resolve, reject);
}

export function postChangePwd(body, resolve, reject) {
    helper.post(Api.account_change_pwd(), body, resolve, reject);
}

/*实名认证*/
export function postCertification(user_uuid, body, resolve, reject) {
    helper.post(Api.certification(user_uuid), body, resolve, reject);
}
/*获取实名认证*/
export function getCertification(user_uuid, resolve, reject) {
    helper.get(Api.certification(user_uuid), resolve, reject);
}

/*上传头像*/
export function postCardImage(body, resolve, reject) {
    helper.post(Api.upload_card_image, body, (ret) => {
        resolve(ret.data)
    }, reject);
}

// 上传护照
export function postPasswordImage(body, resolve, reject) {
    helper.post(Api.upload_card_image, body, (ret) => {
        resolve(ret.data)
    }, reject);
}