/**
 * Created by lorne on 2017/1/11.
 */
import StorageKey from '../configs/StorageKey';
import {setLanguage} from '../I18n/I18n';
import {getSize, setLang, getCarts} from '../utils/ComonHelper';
import {setDpLang} from '../services/RequestHelper';
import {listVerified} from './AccountDao';

export function init(resolve) {
    storage.load({key: StorageKey.Language})
        .then(ret => {
            switchLang(ret);
            resolve();
        }).catch(err => {

        switchLang(language);
    });
    getSize();
    /*获取购物车*/
    getCarts();
}


export function initLogin() {
    listVerified(data => {
    }, err => {
    })
}

function switchLang(lang) {
    global.language = lang;
    setLanguage(lang);
    setDpLang(lang);
    setLang(lang);
}

export function setLocalLanguage(language) {
    switchLang(language);
    storage.save({
        key: StorageKey.Language,
        rawData: language
    });

}

