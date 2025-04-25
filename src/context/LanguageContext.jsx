import { useState } from 'react';
import enTranslations from '../locales/en/translation.json';
import ruTranslations from '../locales/ru/translation.json';
import { LanguageContext } from './LanguageContextInstance';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ru');
  const translations = lang === 'ru' ? ruTranslations : enTranslations;

  const toggleLanguage = () => {
    setLang(lang === 'ru' ? 'en' : 'ru');
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}
