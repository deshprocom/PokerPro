/**
 * Created by lorne on 2017/7/25.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

export function postFocus(body,resolve,reject) {
    helper.post(Api.player_focus(body), {}, (ret) => {
        resolve(ret.data)
    }, reject)
}

export function deleteFocus(body,resolve,reject) {
    helper.del(Api.player_focus(body), {}, (ret) => {
        resolve(ret.data)
    }, reject)
}


// 排行榜
export function getMainRank(body, resolve, reject) {
    helper.get(Api.players_list(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

export function getPokerRanks(body, resolve, reject) {
    helper.get(Api.poker_ranks(body), (ret) => {
        resolve(ret.data)
    }, reject)
}
//我关注牌手
export function getFocusPlayer(body,resolve,reject) {
    helper.get(Api.focus_list(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

