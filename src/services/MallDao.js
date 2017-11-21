import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

//取消订单
export function cancelMallOrder(body, resolve, reject) {
    helper.post(Api.mall_order_cancel(body), {}, ret => {
        resolve(ret.data)
    }, reject)
}

//商品订单页面
export function getMallOrders(body, resolve, reject) {
    helper.get(Api.order_lists(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

//微信支付
export function postWxPay(body, resolve, reject) {
    helper.post(Api.mall_wxPay(body), {}, ret => {
        resolve(ret.data)
    }, reject)
}

export function postMallOrder(body, resolve, reject) {
    helper.post(Api.mall_order, body, ret => {
        resolve(ret.data)
    }, reject)
}

//获取新建订单页面
export function getProductOrders(body, resolve, reject) {
    helper.post(Api.product_orders(), body, ret => {
        resolve(ret.data)
    }, reject)
}


//获取商品详情
export function getProductDetail(body, resolve, reject) {
    helper.get(Api.product_detail(body), ret => {
        resolve(ret.data)
    }, reject)
}

//获取某个分类下面的商品
export function catProducts(body, resolve, reject, params) {
    helper.get(Api.cat_products(body), ret => {
        resolve(ret.data)
    }, reject, params)
}

//获取所有商品或搜索商品
export function searchProducts(params, resolve, reject) {
    helper.get(Api.products, ret => {
        resolve(ret.data)
    }, reject, params)
}

//获取所有分类
export function getCategories(resolve, reject) {
    helper.get(Api.categories, (ret) => {
        resolve(ret.data)
    }, reject)
}

//获取主分类下的自分类
export function categoriesChild(body, resolve, reject) {
    helper.get(Api.categories_child(body), (ret) => {
        resolve(ret.data)
    }, reject)
}