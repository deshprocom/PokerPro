import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

export function getCrowdfundingsList(body, resolve, reject) {
    helper.get(Api.crowdfundings_list(body), (ret) => {
        resolve(ret.data)
    }, reject)
}