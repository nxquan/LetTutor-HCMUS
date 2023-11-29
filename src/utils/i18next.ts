import i18next from 'i18next';
import english from '../../locales/english.json';
import vietnamese from '../../locales/vietnamese.json';

import {initReactI18next} from 'react-i18next';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: english,
    },
    vn: {
      translation: vietnamese,
    },
  },
});

export default i18next;
