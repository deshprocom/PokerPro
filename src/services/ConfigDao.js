/**
 * Created by lorne on 2017/1/11.
 */
import StorageKey from '../configs/StorageKey';
import {setLanguage} from '../I18n/I18n';
import I18n from 'react-native-i18n';
import {getSize} from '../utils/ComonHelper';

export function init(resolve) {
    storage.load({key:StorageKey.Language})
        .then(ret=>{
            console.log('Config',ret);
            setLanguage(ret);
            resolve();
        });
    getSize();
}

const config = {
    language: I18n.locale
};

export function setLocalLanguage(language) {
    storage.save({
        key: StorageKey.Language,
        rawData: language
    });
    setLanguage(language);
}

