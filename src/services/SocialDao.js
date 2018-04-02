/**
 * Created by hfl on 2018/3/30.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

export function postTopic(body, resolve, reject) {
    helper.post(Api.release_topic(), body, (ret) => {
        resolve(ret.data)
    }, err => {
        reject(err)
    })
}

export function uploadImage(body, resolve, reject) {
    helper.post(Api.upload_image, body, (ret) => {
        resolve(ret.data)
    }, err => {
        reject(err)
    })
}