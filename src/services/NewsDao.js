/**
 * Created by lorne on 2017/4/20.
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';


export function searchVideos(body, resolve, reject) {
    helper.get(Api.search_video(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

/*获取子视频*/
export function getSubVideo(body, resolve, reject) {
    helper.get(Api.sub_videos(body), ret => {
        resolve(ret.data)
    }, reject)
}

/*获取某个资讯详情*/
export function getVideoDetail(body, resolve, reject) {
    helper.get(Api.video_detail(body), ret => {
        resolve(ret.data)
    }, reject)
}

/*获取某个资讯详情*/
export function getNewsDetail(body, resolve, reject) {
    helper.get(Api.info_detail(body), ret => {
        resolve(ret.data)
    }, reject)
}

/* 获取首页热门资讯*/
export function getHotInfos(resolve, reject, params) {
    helper.get(Api.hot_infos, ret => {
        resolve(ret.data)
    }, reject, params)
}

export function getPukeNews(resolve, reject) {
    helper.get(Api.headlines, ret => {
        resolve(ret.data)
    }, reject)
}

export function getMainBanners(resolve, reject) {
    helper.get(Api.banners, ret => {
        resolve(ret.data)
    }, reject)
}

export function getVideoSearch(body, resolve, reject) {
    helper.get(Api.searchVideo(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

export function getVideoList(body, resolve, reject) {
    helper.get(Api.videoList(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

export function getVideoTypes(body, resolve, reject) {
    helper.get(Api.videoTypes, (ret) => {
        resolve(ret.data)
    }, reject)
}

/*获取资讯类别*/
export function getNewsTypes(resolve, reject) {
    helper.get(Api.news_types, (ret) => {
        resolve(ret.data)
    }, reject)
}

/*获取某个类别下的资讯*/
export function getNewsList(body, resolve, reject) {
    helper.get(Api.news_list(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

/*资讯查询接口*/
export function getNewsSearch(body, resolve, reject) {
    helper.get(Api.news_search(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

// 身份证上传
export function postPasswordImage(body, resolve, reject) {
    helper.post(Api.upload_card_image, body, (ret) => {
        resolve(ret.data)
    }, reject)
}