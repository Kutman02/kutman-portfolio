# Portfolio Client

React + TypeScript + Vite приложение для портфолио.

## Установка

```bash
npm install
```

## Разработка

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

## Сборка для production

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

## Деплой на Vercel

### Настройка переменных окружения

В настройках проекта Vercel добавьте переменную окружения:

- `VITE_API_URL` - URL вашего backend API (например: `https://your-backend.com/api`)

### Автоматический деплой

Vercel автоматически определит настройки из `vercel.json`:
- Все маршруты (кроме `/api` и `/uploads`) будут перенаправлены на `index.html` для работы React Router
- Это решает проблему 404 ошибок при перезагрузке страницы

### Ручной деплой

1. Установите Vercel CLI: `npm i -g vercel`
2. Выполните: `vercel`
3. Следуйте инструкциям

## Структура проекта

- `src/` - исходный код приложения
- `src/components/` - React компоненты
- `src/store/` - Redux store и slices
- `src/types/` - TypeScript типы
- `public/` - статические файлы
- `vercel.json` - конфигурация для Vercel

## Переменные окружения

Создайте файл `.env` в корне проекта:

```
VITE_API_URL=http://localhost:8081/api
```

Для production укажите URL вашего backend сервера.
