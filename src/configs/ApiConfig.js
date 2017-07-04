/**
 * Created by lorne on 2016/12/20.
 */
import {LoginUser} from '../services/AccountDao';
import {strNotNull, isEmptyObject} from '../utils/ComonHelper';

export default {
    //内部测试
    dev: 'http://192.168.2.232:8800/v10/',
    dev_ci_at: 'http://192.168.2.231:8801/v10/',

    //test分支用来发布版本  test_ci_at用来跑自动化测试
    test: 'http://106.75.134.18:8800/v10/',
    test_ci_at: 'http://106.75.134.18:8801/v10/',

    //production 用来发布正式生产环境
    staging: 'http://106.75.136.9:8801/v10/',
    production: 'https://api.deshpro.com/v10/',

    register: 'register',
    login: 'login',
    account_profile: putProfile,
    upload_avatar: 'uploaders/avatar',
    account_verify: 'account/verify_vcode',
    account_reset_password: 'account/reset_password',
    account_change_pwd: postChangePwd,
    recent_races: recent_races,
    v_codes: 'account/v_codes',
    races_info: races_info,

    new_order: new_order,
    ticket_status: ticket_status,
    buyTicket: buyTicket,
    certification: certification,
    upload_card_image: 'uploaders/card_image',
    users_orderList: users_orderList,
    users_orderDetail: users_orderDetail,
    users_orderCancel: users_orderCancel,
    search_races: search_races,
    search_by_date: search_by_date,
    search_by_keyword: search_by_keyword,
    search_range_list: search_range_list,
    sub_races: sub_races,
    race_ranks: race_ranks,
    sub_race_info: sub_race_info,
    player_info: player_info,
    news_types: 'news/types',
    news_list: news_list,
    news_search: news_search,
    race_hosts: 'race_hosts',
    race_tickets: race_tickets,
    account_change_bind: account_change_bind,
    bind_account: bind_account,
    change_permission: change_permission,
    notifications: notifications,
    videoTypes: 'videos/types',
    videoList: videoList,
    searchVideo: searchVideo,
    delNotice: delNotice,
    selectRaceTicket: selectRaceTicket,
    buyRaceTicket: buyRaceTicket,
    orderTicket: orderTicket

}


function getUserId() {
    if (!isEmptyObject(login_user) && strNotNull(login_user.user_id)) {
        return login_user.user_id;
    }
    return '0';
}

const page_size = 10;


export function orderTicket(body) {
    const {race_id, ticket_id} = body;
    return 'races/' + race_id + '/tickets/' + ticket_id + '/orders';
}


export function buyRaceTicket(body) {
    const {race_id, ticket_id} = body;
    return 'races/' + race_id + '/tickets/' + ticket_id;
}

export function selectRaceTicket(body) {
    const {race_id} = body;
    return 'races/' + race_id + '/tickets';
}

export function delNotice(body) {
    const {id} = body;
    return 'users/' + login_user.user_id + '/notifications/' + id;

}

export function searchVideo(body) {
    const {keyword, next_id} = body;
    return 'videos/search?keyword=' + keyword + '&next_id=' + next_id
}

export function videoList(body) {
    const {type_id, next_id} = body;
    return 'videos/types/' + type_id + '?page_size=' + page_size + '&next_id=' + next_id
}


export function notifications() {
    return 'users/' + login_user.user_id + '/notifications';
}


export function change_permission() {
    return 'account/users/' + login_user.user_id + '/change_permission';
}


export function bind_account() {
    return 'account/users/' + login_user.user_id + '/bind_account';
}

export function account_change_bind() {
    return 'account/users/' + login_user.user_id + '/change_account'
}

export function race_tickets(body) {
    const {keyword, seq_id} = body;
    let url = '';
    if (strNotNull(keyword)) {
        url = '&keyword=' + keyword;
    }
    if (strNotNull(seq_id))
        url = url + '&seq_id=' + seq_id;

    return 'race_tickets?&page_size=' + page_size + url;
}

export function news_search(body) {
    const {keyword, next_id} = body;

    return 'news/search?keyword=' + keyword + '&next_id=' + next_id;
}

export function news_list(body) {

    const {type_id, next_id} = body;

    return 'news/types/' + type_id + '?page_size=' + page_size + '&next_id=' + next_id;
}
export function player_info(body) {
    const {player_id} = body;
    return 'players/' + player_id;
}

export function sub_race_info(body) {
    const {race_id_1, race_id_2}  = body;
    return 'races/' + race_id_1 + '/sub_races/' + race_id_2;
}


export function race_ranks(body) {
    const {race_id} = body;
    return 'races/' + race_id + '/race_ranks';
}

export function sub_races(body) {
    const {race_id, type} = body;
    if (strNotNull(type))
        return 'races/' + race_id + '/sub_races?type=' + type;
    else
        return 'races/' + race_id + '/sub_races';
}

export function search_range_list(body) {
    const {begin_date, end_date} = body;
    return 'u/' + getUserId() + '/races/search_range_list?begin_date='
        + begin_date + '&end_date=' + end_date
}

export function search_by_keyword(body) {
    const {keyword, next_id} = body;
    return 'u/' + getUserId() + '/races/search_by_keyword?keyword='
        + keyword + '&next_id=' + next_id + '&page_size=' + page_size;
}

export function search_by_date(body) {
    const {date, next_id} = body;
    return 'u/' + getUserId() + '/races/search_by_date?date='
        + date + '&next_id=' + next_id + '&page_size=' + page_size;

}


export function search_races(body) {
    const {seq_id, operator, host_id, date} = body;
    if (!isEmptyObject(login_user) && strNotNull(login_user.user_id)) {
        if (strNotNull(operator) && strNotNull(seq_id)) {
            return '/u/' + login_user.user_id + '/races?page_size='
                + page_size + '&seq_id=' + seq_id + '&operator=' + operator;
        } else if (strNotNull(host_id) || strNotNull(date)) {
            return '/u/' + login_user.user_id + '/races?page_size='
                + page_size + '&host_id=' + host_id + '&date=' + date;
        } else {
            return '/u/' + login_user.user_id + '/races?page_size='
                + page_size;
        }

    } else {
        if (strNotNull(operator) && strNotNull(seq_id)) {
            return '/u/0/races?page_size='
                + page_size + '&seq_id=' + seq_id + '&operator=' + operator;
        } else if (strNotNull(host_id) || strNotNull(date)) {
            return '/u/0/races?page_size='
                + page_size + '&host_id=' + host_id + '&date=' + date;
        } else {
            return '/u/0/races?page_size='
                + page_size;
        }

    }


}


export function putProfile(user_id) {
    return 'account/users/' + user_id + '/profile';
}

function postChangePwd() {
    return 'account/users/' + LoginUser.user_id + '/change_password';
}

function recent_races(body) {
    const {user_id, number} = body;
    if (strNotNull(user_id) && strNotNull(number)) {
        return 'u/' + user_id + '/recent_races?numbers=' + number;
    } else {
        return 'u/0/recent_races';
    }
}


function races_info(body) {
    const {user_id, race_id} = body;
    return 'u/' + user_id + '/races/' + race_id;
}

function new_order(race_id) {
    return 'races/' + race_id + '/new_order'
}

function ticket_status(race_id) {
    return 'races/' + race_id + '/ticket_status'
}

function buyTicket(race_id) {
    return 'races/' + race_id + '/orders'
}

function certification(user_uuid) {
    return 'account/users/' + user_uuid + '/certification'
}

function users_orderList(body) {
    const {user_id, page_size, next_id, status} = body;
    return 'users/' + user_id + '/orders?page_size='
        + page_size + '&next_id=' + next_id + '&status=' + status;

}

function users_orderDetail(body) {
    const {user_id, order_id} = body;
    return 'users/' + user_id + '/orders/' + order_id;
}

function users_orderCancel(body) {
    const {user_id, order_id} = body;
    return 'users/' + user_id + '/orders/' + order_id + '/cancel';
}


