/**
 * Created by lorne on 2017/2/24.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';
import StorageKey from '../configs/StorageKey';

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
