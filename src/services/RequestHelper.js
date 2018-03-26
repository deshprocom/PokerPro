/**
 * Created by lorne on 2016/12/23.
 */
import {create, SERVER_ERROR, TIMEOUT_ERROR, NETWORK_ERROR} from 'apisauce';
import Api from '../configs/ApiConfig';
import {clearLoginUser, showToast, strNotNull} from '../utils/ComonHelper';
import StorageKey from '../configs/StorageKey';
import I18n from 'react-native-i18n';


let TAG = 'PuKeHttp:';


// define the api
const client = create({
    baseURL: Api.production,
    headers: {
        'X-DP-APP-KEY': '467109f4b44be6398c17f6c058dfa7ee',
        'X-DP-CLIENT-IP': '192.168.2.231'
    },
    timeout: 30000,
});

export function setDpLang(lang) {
    client.setHeader('X-DP-LANG', lang)
}

export function getDpLang() {
    return client.headers['X-DP-LANG'];
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


export function getBaseURL(callback) {
    storage.load({
        key: StorageKey.ApiSever,
        autoSync: true,
        syncInBackground: false
    })
        .then((ret) => {
            client.setBaseURL(ret);
            callback();
        }).catch(err => {
        client.setBaseURL(Api.production);
        setBaseURL(Api.production);
        callback();
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

export function getAccessToken() {
    let token = client.headers['X-DP-ACCESS-TOKEN'];

    return strNotNull(token) ? token : '';
}

export function removeToken() {
    delete client.headers['X-DP-ACCESS-TOKEN']
}


if (__DEV__) {

    const naviMonitor = (response) => console.log('HttpResponse', response)
    client.addMonitor(naviMonitor);
    client.addRequestTransform(request => {
        console.log('HttpRequest', request)
    })
}


export function post(url, body, resolve, reject) {

    console.log(url, body)
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
        console.log(TAG, error);
        showToast(error);
        reject('Network response was not ok.');
    });
}


export function del(url, body, resolve, reject) {
    console.log(url, body);
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
        showToast(error);
        console.log(TAG, error);
        reject('Network response was not ok.');
    });
}


export function put(url, body, resolve, reject) {
    console.log(url, body)
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
        console.log(TAG, error);
        reject('Network response was not ok.');
    });
}

export function get(url, resolve, reject, params = {}) {
    console.log(url)
    client.get(url, params)
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
        showToast(error);
        console.log(TAG, error);
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

    let msgErr = '';
    if (response.status === 809)
        msgErr = I18n.t('net_809');
    else if (response.problem === SERVER_ERROR)
        msgErr = I18n.t('SERVER_ERROR');
    else if (response.problem === TIMEOUT_ERROR)
        msgErr = I18n.t('TIMEOUT_ERROR');
    else if (response.problem === NETWORK_ERROR)
        msgErr = I18n.t('NETWORK_ERROR');

    showToast(msgErr);
    reject(msgErr);

}



