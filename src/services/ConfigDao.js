/**
 * Created by lorne on 2017/1/11.
 */
import StorageKey from '../configs/StorageKey';
import {setLanguage} from '../I18n/I18n';
import {getSize} from '../utils/ComonHelper';
import {setDpLang} from '../services/RequestHelper';

export function init(resolve) {
    storage.load({key: StorageKey.Language})
        .then(ret => {
            console.log('Config', ret);
            setLanguage(ret);
            setDpLang(ret);
            resolve();
        });
    getSize();
}


export function setLocalLanguage(language) {
    setLanguage(language);
    setDpLang(language);
    storage.save({
        key: StorageKey.Language,
        rawData: language
    });

}

