import locales from 'i18next';
import {initReactI18next} from 'react-i18next';

import translationEN from './en/translation.json';
import translationES from './es/translation.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    es: {
        translation: translationES
    }
};

locales
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        react: {
            useSuspense: true
        }
    });

export default locales;
