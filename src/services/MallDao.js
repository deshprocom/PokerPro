import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

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