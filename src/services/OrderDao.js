/**
 * Created by lorne on 2017/2/24.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';
import StorageKey from '../configs/StorageKey';
import {showToast} from '../utils/ComonHelper';

export function getAddressList(resolve) {
    helper.get(Api.addAddress(), (ret) => {
        resolve(ret.data)
    }, err => {
        showToast(err)
    })
}

export function postAddress(body, resolve, reject) {
    helper.post(Api.addAddress(), body, (ret) => {
        resolve(ret.data)
    }, reject)
}

export function postOrderTicket(param, body, resolve, reject) {
    helper.post(Api.orderTicket(param), body, (ret) => {
        resolve(ret.data)
    }, reject)
}


export function getBuyRaceTicket(body, resolve, reject) {
    helper.get(Api.buyRaceTicket(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

export function getSelectRaceTicket(body, resolve, reject) {
    helper.get(Api.selectRaceTicket(body), (ret) => {
        resolve(ret.data)
    }, reject)
}
/*订单列表*/
export function getOrderList(body, resolve, reject) {
    helper.get(Api.users_orderList(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

/*订单详情*/
export function getOrderDetail(body, resolve, reject) {
    helper.get(Api.users_orderDetail(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

export function postOrderCancel(body, resolve, reject) {
    helper.post(Api.users_orderCancel(body), {}, (ret) => {
        resolve(ret.data)
    }, reject)
}
