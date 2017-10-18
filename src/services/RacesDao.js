/**
 * Created by lorne on 2017/1/18.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

export function getRaceTickets(body, resolve, reject) {
    helper.get(Api.race_tickets(body), (ret) => {
        resolve(ret.data);
    }, reject);
}

export function getRaceHost(resolve, reject) {
    helper.get(Api.race_hosts, (ret) => {
        resolve(ret.data);
    }, reject);
}

// 获取边赛详情
export function getSubRaceInfo(body, resolve, reject) {
    helper.get(Api.sub_race_info(body), (ret) => {
        resolve(ret.data);
    }, reject);
}

// 获取赛事的排行榜
export function raceRanks(body, resolve, reject) {
    helper.get(Api.race_ranks(body), (ret) => {
        resolve(ret.data);
    }, reject);
}

//获取主赛名下的边赛列表
export function subRaces(body, resolve, reject) {
    helper.get(Api.sub_races(body), (ret) => {
        resolve(ret.data);
    }, reject);
}

//赛事开始结束日期查询(查询区间段所包含的赛事情况)
export function searchRangeList(body, resolve, reject) {
    helper.get(Api.search_range_list(body), (ret) => {
        resolve(ret.data);
    }, reject);
}

export function searchRaceKeyword(body, resolve, reject) {
    helper.get(Api.search_by_keyword(body), (ret) => {
        resolve(ret.data);
    }, reject);
}
// 赛事日期查询(查询包含日期在内的赛事)
export function searchByDate(body, resolve, reject) {
    helper.get(Api.search_by_date(body), (ret) => {
        resolve(ret.data);
    }, reject);
}

/*查询赛事列表*/
export function searchRaces(body, resolve, reject) {
    helper.get(Api.search_races(body), (ret) => {
        resolve(ret.data);
    }, reject);
}
/*获取近期赛事列表*/
export function getRecentRaces(body, resolve, reject) {
    helper.get(Api.recent_races(body), (ret) => {
        resolve(ret.data);
    }, reject);
}
/*获取赛事详情*/
export function getRacesInfo(body, resolve, reject) {
    helper.get(Api.races_info(body), (ret) => {
        resolve(ret.data);
    }, reject);
}
/*获取购票页面所需信息*/
export function getNewOrder(body, resolve, reject) {
    helper.get(Api.new_order(body), (ret) => {
        resolve(ret.data)
    }, reject)
}
/*检查出票情况*/
export function getTicketStatus(body, resolve, reject) {
    helper.get(Api.ticket_status(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

/*购买电子票*/
export function buyTicket(race_id, body, resolve, reject) {
    helper.post(Api.buyTicket(race_id), body, (ret) => {
        resolve(ret.data)
    }, reject)
}

