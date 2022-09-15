import { NativeModules } from 'react-native';
import LocalizedStrings from 'react-native-localization';

import { enLocale } from './enLocale';
import { ruLocale } from './ruLocale';

const DEFAULT_LOCALE = 'en_US';

export const strings = new LocalizedStrings({
  en_US: enLocale,
  ru_RU: ruLocale,
});

export const setLocale = (locale: string) => {
  const availableLocales = strings.getAvailableLanguages();
  if (availableLocales.includes(locale)) {
    strings.setLanguage(locale);
  } else {
    strings.setLanguage(DEFAULT_LOCALE);
  }
};

export const autoLocalize = () => {
  const locale = NativeModules.I18nManager.localeIdentifier;
  setLocale(locale);
};
