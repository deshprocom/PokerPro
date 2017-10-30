import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

export function getCategories(resolve, reject) {
    helper.get(Api.categories, (ret) => {
        resolve(ret.data)
    }, reject)
}


export function categoriesChild(body, resolve, reject) {
    helper.get(Api.categories_child(body), (ret) => {
        resolve(ret.data)
    }, reject)
}