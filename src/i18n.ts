import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import api from './utils/api';
import type { AxiosError } from 'axios';

// Дефолтные переводы (минимальные, используются только если API недоступен)
const defaultTranslations = {
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', contact: 'Contact' },
    hero: { greeting: "Hi, I'm", profession: 'Frontend Developer', description: 'Loading...' },
    about: { title: 'About Me', skills: 'Skills' },
    projects: { title: 'Projects' },
    contact: { title: 'Contact Me' }
  },
  ru: {
    nav: { home: 'Главная', about: 'Обо мне', projects: 'Проекты', contact: 'Контакты' },
    hero: { greeting: 'Привет, я', profession: 'Frontend-разработчик', description: 'Загрузка...' },
    about: { title: 'Обо мне', skills: 'Навыки' },
    projects: { title: 'Проекты' },
    contact: { title: 'Связаться со мной' }
  }
};

// Функция для загрузки переводов с API
const loadTranslationsFromAPI = async () => {
  try {
    const [enRes, ruRes] = await Promise.all([
      api.get('/translations/en').catch((error: AxiosError) => {
        // Тихая обработка 404 - переводы могут еще не существовать на сервере
        // Это нормальная ситуация, не требует логирования
        return { data: { data: null } };
      }),
      api.get('/translations/ru').catch((error: AxiosError) => {
        // Тихая обработка 404 - переводы могут еще не существовать на сервере
        // Это нормальная ситуация, не требует логирования
        return { data: { data: null } };
      })
    ]);

    const resources = {
      en: {
        translation: enRes.data?.data || defaultTranslations.en,
      },
      ru: {
        translation: ruRes.data?.data || defaultTranslations.ru,
      },
    };

    // Обновляем ресурсы i18n
    Object.keys(resources).forEach(lang => {
      i18n.addResourceBundle(lang, 'translation', resources[lang].translation, true, true);
    });
  } catch (error) {
    // Используем дефолтные переводы как fallback
    i18n.addResourceBundle('en', 'translation', defaultTranslations.en, true, true);
    i18n.addResourceBundle('ru', 'translation', defaultTranslations.ru, true, true);
  }
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: defaultTranslations.en,
    },
    ru: {
      translation: defaultTranslations.ru,
    },
  },
  lng: 'ru', // язык по умолчанию
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Загружаем переводы с API при инициализации
loadTranslationsFromAPI();

export default i18n;
