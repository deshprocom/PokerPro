/**
 * Created by lorne on 2016/12/23.
 */
import {create} from 'apisauce';
import Api from '../configs/ApiConfig';
import {clearLoginUser} from '../utils/ComonHelper';
import StorageKey from '../configs/StorageKey';
import {NetworkInfo} from 'react-native-network-info';
import {Platform} from 'react-native';
import I18n from 'react-native-i18n';


let TAG = 'PuKeHttp:';


// define the api
const client = create({
    baseURL: Api.production,
    headers: {
        'X-DP-APP-KEY': '467109f4b44be6398c17f6c058dfa7ee',
        'X-DP-CLIENT-IP': '192.168.2.231'
    },
    timeout: 20000,
});

export function setDpLang(lang) {
    client.setHeader('X-DP-LANG', lang)
}

export function getApiType() {
    let type = 'production';
    let ret = client.getBaseURL();

    if (ret === Api.dev)
        type = 'dev';
    else if (ret === Api.test)
        type = 'test';
    else if (ret === Api.production)
        type = 'production';

    return type;
}

function setDpIp() {
    if (Platform.OS === 'ios')
        NetworkInfo.getIPAddress(ip => {
            if (ip !== 'error') {
                client.setHeader('X-DP-CLIENT-IP', ip);
            }
        });
    else
        NetworkInfo.getIPV4Address(ip => {
            if (ip !== 'error') {
                client.setHeader('X-DP-CLIENT-IP', ip);
            }
        });
}

export function getBaseURL() {
    setDpIp();
    storage.load({key: StorageKey.ApiSever})
        .then((ret) => {
            client.setBaseURL(ret)
        }).catch(err => {
        client.setBaseURL(Api.production)
        setBaseURL(Api.production)
    });
}

export function setBaseURL(api) {
    client.setBaseURL(api);
    storage.save({
        key: StorageKey.ApiSever,
        rawData: api
    });

}

export function setAccessToken(token) {
    client.setHeader('X-DP-ACCESS-TOKEN', token)
}

export function removeToken() {
    delete client.headers['X-DP-ACCESS-TOKEN']
}


if (__DEV__) {

    const naviMonitor = (response) => console.log(TAG, response)
    client.addMonitor(naviMonitor);
    client.addRequestTransform(request => {
        console.log(TAG, request)
    })
}


export function post(url, body, resolve, reject) {

    router.log(url, body)
    client.post(url, body)
        .then((response) => {

            if (response.ok) {
                const {code, msg} = response.data;
                if (code === 0) {
                    resolve(response.data);
                } else {
                    reject(msg);
                }
            } else {
                netError(response, reject);
            }


        }).catch((error) => {
        router.log(TAG, error);
        reject('Network response was not ok.');
    });
}


export function del(url, body, resolve, reject) {
    router.log(url, body);
    client.delete(url, body)
        .then((response) => {
            if (response.ok) {
                const {code, msg} = response.data;
                if (code === 0) {
                    resolve(response.data);
                } else {
                    reject(msg);
                }
            } else {
                netError(response, reject);
            }

        }).catch((error) => {

        router.log(TAG, error);
        reject('Network response was not ok.');
    });
}


export function put(url, body, resolve, reject) {
    router.log(url, body)
    client.put(url, body)
        .then((response) => {
            if (response.ok) {
                const {code, msg} = response.data;
                if (code === 0) {
                    resolve(response.data);
                } else {
                    reject(msg);
                }
            } else {
                netError(response, reject);
            }

        }).catch((error) => {
        router.log(TAG, error);
        reject('Network response was not ok.');
    });
}

export function get(url, resolve, reject) {
    router.log(url)
    client.get(url)
        .then((response) => {
            if (response.ok) {
                const {code, msg} = response.data;
                if (code === 0) {
                    resolve(response.data);
                } else {
                    reject(msg);
                }
            } else {
                netError(response, reject);
            }

        }).catch((error) => {
        router.log(TAG, error);
        reject('Network response was not ok.');
    });
}

/*token过期*/
function netError(response, reject) {
    if (response.status === 804 ||
        response.status === 805 ||
        response.status === 809) {
        clearLoginUser();
        router.popToLoginFirstPage();
    }
    if (response.status === 809)
        reject(I18n.t('net_809'));
    else
        reject(response.problem);
}



