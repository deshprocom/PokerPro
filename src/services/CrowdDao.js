/**
 * Created by lorne on 2018/1/22
 * Function:
 * Desc:
 */

import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';


export function del_crowd_info(body, resolve, reject) {
    helper.del(Api.del_crowd_info, ret => {
        resolve(ret.data)
    }, reject, body)
}
export function get_crowd_info(body, resolve, reject) {
    helper.get(Api.get_crowd_info, ret => {
        resolve(ret.data)
    }, reject, body)
}
export function user_crowd_orders(body, resolve, reject) {
    helper.get(Api.user_crowd_orders, ret => {
        resolve(ret.data)
    }, reject, body)
}
export function poker_coins(body, resolve, reject) {
    helper.get(Api.poker_coins, ret => {
        resolve(ret.data)
    }, reject, body)
}
export function crowd_order_list(body, resolve, reject) {
    helper.get(Api.crowdfunding_orders, ret => {
        resolve(ret.data)
    }, reject, body)
}

export function crowd_banner(resolve, reject) {
    helper.get(Api.crowdfunding_banners, ret => {
        resolve(ret.data)
    }, reject)

}

export function crowd_order(body, resolve, reject) {
    helper.post(Api.crowdfunding_orders, body, ret => {
        resolve(ret.data)
    }, reject, body)
}

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