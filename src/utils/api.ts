/**
 * @fileoverview Axios API клиент с автоматической авторизацией
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://kutmanportfolioserver.onrender.com/api';

/**
 * Axios instance с базовой конфигурацией
 */
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('adminToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Убеждаемся, что запросы к /auth/login всегда используют POST метод
  if (config.url?.includes('/auth/login') && config.method?.toLowerCase() !== 'post') {
    console.warn('Invalid method for /auth/login endpoint. Expected POST, got:', config.method);
  }
  
  return config;
});

// Suppress 404 errors for translation endpoints (they may not exist yet)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Если это 404 для эндпоинтов переводов, не логируем ошибку в консоль
    if (error.response?.status === 404 && error.config?.url?.includes('/translations/')) {
      // Возвращаем ошибку, но она будет обработана в catch блоках
      return Promise.reject(error);
    }
    // Для всех остальных ошибок - стандартная обработка
    return Promise.reject(error);
  }
);

export default api;
