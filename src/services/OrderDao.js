/**
 * Created by lorne on 2017/2/24.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';
import StorageKey from '../configs/StorageKey';
import {showToast} from '../utils/ComonHelper';

export function postWxPay(body, resolve, reject) {
    helper.post(Api.wx_pay(body), {}, (ret) => {
        resolve(ret.data)
    }, err => {

        reject(err)
    })
}


export function postInvite(body, resolve, reject) {
    // helper.post(Api.verify_invite_code(), body, (ret) => {
    //     resolve(ret.data)
    // }, err => {
    //     reject(err);
    //
    // })
}

export function getUnpaidOrder(body, resolve, reject) {
    helper.get(Api.unpaid_order(body), ret => {
        resolve(ret.data)
    }, err => {
        showToast(err);
        reject(err)
    })
}

export function postOrderComplete(body, resolve) {
    helper.post(Api.order_complete(body), {}, (ret) => {
        resolve(ret.data)
    }, err => {
        showToast(err)
    })
}

export function postPayOrder(body, resolve, reject) {
    helper.post(Api.pay_order(body), {}, (ret) => {
        resolve(ret.data)
    }, err => {
        reject(err)
    })
}

export function postAdrDelete(adr_id, resolve, reject) {
    helper.post(Api.adrDelete(adr_id), {}, (ret) => {
        resolve(ret.data)
    }, err => {
        showToast(err);
        reject(err)
    })
}

export function postAdrDefault(adr_id, resolve) {
    helper.post(Api.setAdrDefault(adr_id), {}, (ret) => {
        resolve(ret.data)
    }, err => {
        showToast(err);
    })
}

export function getAddressList(resolve) {
    helper.get(Api.addAddress(), (ret) => {
        console.log('adrList:', ret.data);
        global.addressList = ret.data.items;
        resolve(ret.data);
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
