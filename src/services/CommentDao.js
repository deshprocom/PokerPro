/**
 * Created by lorne on 2017/12/19
 * Function:
 * Desc:
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

/*回复未读数量接口*/
export function getUnreadComments(body, resolve, reject) {
    helper.get(Api.unread_comments(body) ,ret => {
        resolve(ret.data)
    }, reject)
}
/*删除回复接口*/
export function delDeleteReply(body, resolve, reject) {
    helper.del(Api.delete_reply(body), body,ret => {
        resolve(ret.data)
    }, reject)
}
/*删除评论接口*/
export function delDeleteComment(body, resolve, reject) {
    helper.del(Api.delete_comment(body), body, ret => {
        resolve(ret.data)
    }, reject)
}

/*个人中心我的所有动态*/
export function getReceivedReply(body, resolve, reject) {
    helper.get(Api.person_reply(body), ret => {
        resolve(ret.data)
    }, reject)
}

/*个人中心我的所有动态*/
export function getPersonDynamics(body, resolve, reject) {
    helper.get(Api.person_dynamics(body), ret => {
        resolve(ret.data)
    }, reject)
}

/*资讯点赞和取消点赞的接口*/
export function postNewLikes(body, resolve, reject) {
    helper.post(Api.new_likes(body),  body, ret => {
        resolve(ret.data)
    }, reject)
}

/*某个回复下回复的接口*/
export function postRepliesReplies(body, resolve, reject) {
    helper.post(Api.replies_replies(body), body, ret => {
        resolve(ret.data)
    }, reject)
}

/*资讯视频回复列表的接口*/
export function getReplies(body, resolve, reject) {
    helper.get(Api.comment_replies(body), ret => {
        resolve(ret.data)
    }, reject)
}

/*评论下回复的接口*/
export function postRelaies(body, resolve, reject) {
    helper.post(Api.comment_replies(body), body, ret => {
        resolve(ret.data)
    }, reject)
}

/*资讯视频评论接口*/
export function postComment(body, resolve, reject) {
    helper.post(Api.topic_comments, body, ret => {
        resolve(ret.data)
    }, reject)
}