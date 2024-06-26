import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import pkgJson from './package.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    debug: false,
    fallbackLng: 'en',
    load: 'languageOnly',
    // lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `/locales/{{lng}}-{{ns}}.json?ver=${pkgJson.version}`,
    },
  });

export default i18n;
