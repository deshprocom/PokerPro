import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

export function getCrowdfundingsInfo(body, resolve, reject) {
    helper.get(Api.crowdfundings_info(body), (ret) => {
        resolve(ret.data)
    }, reject)
}
export function getCrowdfundingsList(body, resolve, reject) {
    helper.get(Api.crowdfundings_list(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

