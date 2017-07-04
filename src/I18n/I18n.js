// @flow

import I18n from 'react-native-i18n';


export function setLanguage(language) {
    I18n.locale = language;
    let languageCode = I18n.locale.substr(0, 2)
    console.log(I18n.locale)
    switch (languageCode) {
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

let languageCode = I18n.locale.substr(0, 2)
switch (languageCode) {
    case 'zh':
        I18n.translations.zh = require('./zh.json')
        break;
    case 'en':
        I18n.translations.en = require('./zh.json')
        break;
    default:
        I18n.translations.zh = require('./zh.json')
}