/**
 * Created by lorne on 2018/1/22
 * Function:
 * Desc:
 */

import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';


export function get_discount(resolve, reject) {
    helper.get(Api.poker_coins_discount, ret => {
        resolve(ret.data)
    }, reject)
}

export function user_crowd_count(body, resolve, reject) {
    helper.get(Api.crowd_user_count(body), ret => {
        resolve(ret.data)
    }, reject, body)
}

export function player_match(body, resolve, reject) {
    helper.get(Api.player_match(body), ret => {
        resolve(ret.data)
    }, reject, body)
}

export function crowd_wx_paid_result(body, resolve, reject) {
    helper.get(Api.crowd_wx_result(body), ret => {
        resolve(ret)
    }, reject)
}


export function report_player(body, resolve, reject) {
    helper.get(Api.report_player(body), ret => {
        resolve(ret.data)
    }, reject, body)
}

export function timely_match(body, resolve, reject) {
    helper.get(Api.timely_match(body), ret => {
        resolve(ret.data)
    }, reject, body)
}

export function crowd_wx_pay(body, resolve, reject) {
    helper.post(Api.crowd_order_wx(body), {}, ret => {
        resolve(ret.data)
    }, reject, body)
}

export function del_crowd_info(body, resolve, reject) {
    helper.del(Api.del_crowd_info(body), ret => {
        resolve(ret.data)
    }, reject, body)
}

export function get_crowd_info(body, resolve, reject) {
    helper.get(Api.get_crowd_info(body), ret => {
        resolve(ret.data)
    }, reject)
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