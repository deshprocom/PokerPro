// @flow

import I18n from 'react-native-i18n';


export function setLanguage(language) {
    I18n.locale = language;
    switch (language) {
        case 'en':
            I18n.translations.en = require('./english.json')
            break;
        case 'zh':
            I18n.translations.zh = require('./zh.json')
            break
    }

}

I18n.fallbacks = true;

I18n.translations = {
    en: require('./english.json')
};

let languageCode = I18n.locale.substr(0, 2);

global.language = languageCode;
switch (languageCode) {
    case 'zh':
        I18n.translations.zh = require('./zh.json');
        break;
    case 'en':
        I18n.translations.en = require('./english.json');
        break;
    default:
        global.language = 'en';
        I18n.translations.en = require('./english.json')
}