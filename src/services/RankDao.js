/**
 * Created by lorne on 2017/7/25.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

// 排行榜
export function getMainRank(body,resolve,reject) {
    helper.get(Api.players_list(body),(ret) => {
        resolve(ret.data)
    },reject)
}
//我关注牌手
export function getFocusPlayer(body,resolve,reject) {
    
}

