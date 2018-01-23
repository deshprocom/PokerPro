/**
 * Created by lorne on 2018/1/22
 * Function:
 * Desc:
 */

import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

export function poker_info(body, resolve, reject) {
    helper.get(Api.poker_info(body), ret => {
        resolve(ret.data)
    }, reject, body)
}
export function poker_list(body, resolve, reject) {
    helper.get(Api.poker_list(body), ret => {
        resolve(ret.data)
    }, reject, body)
}
export function crowd_list(body, resolve, reject) {
    helper.get(Api.crowdfundings, ret => {
        resolve(ret.data)
    }, reject, body)
}

export function crowd_detail(body, resolve, reject) {
    helper.get(Api.crowd_detail(body), ret => {
        resolve(ret.data)
    }, reject, body)
}