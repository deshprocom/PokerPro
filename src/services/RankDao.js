/**
 * Created by lorne on 2017/7/25.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

// 排行榜
export function getMainRank(resolve,reject) {
    helper.get(Api.players,(ret) => {
        resolve(ret.data)
    },reject)
}

