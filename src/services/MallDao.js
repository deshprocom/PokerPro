import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

//退换货详情
export function getRefundInfo(body, resolve, reject) {
    helper.get(Api.refund_info(body), ret => {
        resolve(ret.data)
    }, reject)
}

//体检退换信息
export function postMallRefund(body, resolve, reject) {
    helper.post(Api.mall_refund(body), body, ret => {
        resolve(ret.data)
    }, reject)
}

//退款上传凭证接口
export function postTempImg(body, resolve, reject) {
    helper.post(Api.upload_temp_img, body, ret => {
        resolve(ret.data)
    }, reject)
}

//查看退款的类型
export function getReturnType(resolve, reject) {
    helper.get(Api.refund_types, ret => {
        resolve(ret.data)
    }, reject)
}

//完成订单
export function postOrderConfirm(body, resolve, reject) {
    helper.post(Api.product_order_confirm(body), {}, ret => {
        resolve(ret.data)
    }, reject)
}

//物流信息
export function getLogisticsInfo(body, resolve, reject) {
    helper.get(Api.logistics_info(body), ret => {
        resolve(ret.data)
    }, reject)
}

//删除订单
export function deleteMall(body, resolve, reject) {
    helper.del(Api.product_order_detail(body), {}, (ret) => {
        resolve(ret.data)
    }, reject)
}

//获取订单详情
export function getMallDetail(body, resolve, reject) {
    helper.get(Api.product_order_detail(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

//微信支付是否成功
export function getWxPaidResult(body, resolve, reject) {
    helper.get(Api.wx_paid_result(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

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