/**
 * Created by lorne on 2017/4/20.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

/*获取资讯类别*/
export function getNewsTypes(resolve, reject) {
    helper.get(Api.news_types, (ret) => {
        resolve(ret.data)
    }, reject)
}

/*获取某个类别下的资讯*/
export function getNewsList(body, resolve, reject) {
    helper.get(Api.news_list(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

/*资讯查询接口*/
export function getNewsSearch(body, resolve, reject) {
    helper.get(Api.news_search(body), (ret) => {
        resolve(ret.data)
    }, reject)
}