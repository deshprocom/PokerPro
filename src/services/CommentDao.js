/**
 * Created by lorne on 2017/12/19
 * Function:
 * Desc:
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

export function postComment(body, resolve, reject) {
    helper.post(Api.topic_comments, body, ret => {
        resolve(ret.data)
    }, reject)
}