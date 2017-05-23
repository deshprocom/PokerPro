/**
 * Created by lorne on 2017/1/9.
 */

import {showToast} from '../utils/ComonHelper';
var myreg = /^1(3|4|5|7|8)\d{9}$/;
export function checkPhone(phone) {
    if (phone != null && phone != undefined) {
        if (!myreg.test(phone)) {
            Toast.show('请输入有效的手机号码！');
            return false;
        }
        return true;
    }
}

var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export function checkMail(mail) {

    if (filter.test(mail)) return true;
    else {
        Toast.show('您的电子邮件格式不正确');
        return false;
    }
}

export function checkLoginMail(mail) {
    if (filter.test(mail)) return true;
    else {
        return false;
    }
}

/*有效的密码格式满足的条件
 1, 长度必须6 - 20位
 2, 必须是 数字+字母 或 数字 + 特殊字符 或 字母+特殊字符 或 数字 + 字母 + 特殊字符的组合*/
var PWD_VALID_FORMAT_REGEX = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
export function pwdVaild(password) {
    if(PWD_VALID_FORMAT_REGEX.test(password))
        return true;
    else {
        showToast('密码格式不正确');
        return false;
    }

}