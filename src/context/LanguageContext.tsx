import { useState, useEffect } from 'react';
import i18n from '../i18n';
import { LanguageContext } from './LanguageContextInstance';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(i18n.language || 'ru');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Получаем текущие переводы из i18n
    const currentLang = i18n.language || 'ru';
    const currentTranslations = i18n.getResourceBundle(currentLang, 'translation') || {};
    setTranslations(currentTranslations);
    setLang(currentLang);
  }, []);

  // Слушаем изменения языка в i18n
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setLang(lng);
      const currentTranslations = i18n.getResourceBundle(lng, 'translation') || {};
      setTranslations(currentTranslations);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
    setLang(newLang);
    const currentTranslations = i18n.getResourceBundle(newLang, 'translation') || {};
    setTranslations(currentTranslations);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}
