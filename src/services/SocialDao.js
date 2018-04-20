/**
 * Created by hfl on 2018/3/30.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';
import _ from 'lodash';
import {getDispatchAction} from '../utils/ComonHelper';
import {GET_PROFILE} from "../actions/ActionTypes";


export function report_topic(topic_id,body, resolve, reject) {
    helper.post(Api.report_topic(topic_id), body, ret => {
        resolve(ret.data)
    },reject);
}


export function report_user(body, resolve, reject) {
    helper.post(Api.report_user(), body, ret => {
        resolve(ret.data)
    },reject);
}

export function locations(body, resolve, reject) {
    helper.get(Api.locations, ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    }, body);
}

export function postNearBys(body, resolve, reject) {
    helper.post(Api.nearbys(), body, ret => {
        resolve(ret.data)
    }, reject)
}

export function getNearBys(resolve, reject) {
    helper.get(Api.nearbys(), ret => {
        resolve(ret.data)
    }, reject)
}


export function my_foucs(param, resolve, reject) {
    helper.get(Api.my_focus(), ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    }, param);
}

export function profile(user_id, resolve, reject) {
    helper.get(Api.profile(user_id), ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    });
}

export function followships(resolve, reject) {
    if (_.isEmpty(global.login_user))
        return;
    helper.get(Api.followships() + '/following_ids', ret => {
        global.followships = ret.data.following_ids;
        resolve && resolve(ret.data)
    }, err => {
        reject && reject(err)
    })
}


export function visit_other(body, resolve, reject) {
    helper.get(Api.jmessage_visit_other(body), ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    });

}

export function topics_search(user_id, resolve, reject, params) {
    helper.get(Api.topics_search(user_id), ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    }, params)
}

export function topics_delete(topic_id, resolve, reject) {
    helper.del(Api.topics_delete(topic_id), {}, ret => {
        resolve(ret.data)
    }, err => reject(err))
}

export function user_topics(body, resolve, reject) {
    helper.get(Api.user_topics(body), ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    }, body)
}

export function follow(followed, body, resolve, reject) {
    if (followed) {
        helper.del(Api.followships(), body,
            ret => {
                getDispatchAction()['GET_PROFILE']();
                followships();
                resolve(ret.data)
            }, err => reject(err))
    } else
        helper.post(Api.followships(), body,
            ret => {
                getDispatchAction()['GET_PROFILE']();
                followships();
                resolve(ret.data)
            }, err => reject(err))
}

export function followings(params, resolve, reject) {
    helper.get(Api.followings(), ret => {
        resolve && resolve(ret.data)
    }, err => {
        reject && reject(err)
    }, params)
}

export function followers(params, resolve, reject) {
    helper.get(Api.followers(), ret => {
        resolve && resolve(ret.data)
    }, err => {
        reject && reject(err)
    }, params)
}

export function topics_comments(topic_id, resolve, reject) {
    helper.get(Api.topics_comments(topic_id), ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    })
}


export function topics_details(topic_id, resolve, reject) {
    helper.get(Api.topics_detail(topic_id), ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    })
}

export function topics_like(topic_id, resolve, reject) {
    helper.post(Api.topics_like(topic_id), {}, ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    })
}

export function topics(params, resolve, reject) {
    helper.get(Api.topics, ret => {
        resolve(ret.data)
    }, err => {
        reject && reject(err)
    }, params)
}

export function topics_recommends(params, resolve, reject) {
    helper.get(Api.topics_recommends, ret => {
        resolve(ret.data)
    }, err => {
        reject && reject(err)
    }, params)
}

export function postTopic(body, resolve, reject) {
    helper.post(Api.release_topic(), body, (ret) => {
        resolve(ret.data)
    }, err => {
        reject(err)
    })
}

export function uploadTopicImage(topic_id, body, resolve, reject) {
    helper.post(Api.topics_image(topic_id), body, (ret) => {
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