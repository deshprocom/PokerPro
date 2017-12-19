/**
 * Created by lorne on 2017/12/19
 * Function:
 * Desc:
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

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