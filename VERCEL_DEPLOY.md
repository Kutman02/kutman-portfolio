# Инструкция по деплою на Vercel

## Проблема: 404 ошибка при перезагрузке страницы

Эта проблема возникает потому, что Vercel пытается найти физический файл по URL (например, `/project/123`), но такого файла не существует - это клиентский маршрут React Router.

## Решение

Файл `vercel.json` уже настроен для решения этой проблемы. Он перенаправляет все запросы (кроме `/api` и `/uploads`) на `index.html`, что позволяет React Router обработать маршрут на клиенте.

## Шаги для деплоя

### 1. Подготовка проекта

Убедитесь, что проект собирается без ошибок:

```bash
cd client
npm run build
```

### 2. Настройка переменных окружения в Vercel

1. Откройте ваш проект в Vercel Dashboard
2. Перейдите в Settings → Environment Variables
3. Добавьте переменную:
   - **Name:** `VITE_API_URL`
   - **Value:** URL вашего backend API (например: `https://your-backend.com/api`)
   - **Environment:** Production, Preview, Development (выберите все)

### 3. Настройка Build Settings

В Vercel Dashboard:
1. Settings → General → Build & Development Settings
2. Убедитесь, что:
   - **Framework Preset:** Vite
   - **Root Directory:** `client` (если проект в подпапке)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### 4. Деплой

#### Автоматический деплой (через Git)

1. Закоммитьте изменения:
   ```bash
   git add .
   git commit -m "Configure Vercel deployment"
   git push
   ```

2. Vercel автоматически задеплоит проект при push в основную ветку

#### Ручной деплой

1. Установите Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Войдите в Vercel:
   ```bash
   vercel login
   ```

3. Задеплойте проект:
   ```bash
   cd client
   vercel
   ```

4. Следуйте инструкциям в терминале

### 5. Проверка

После деплоя проверьте:

1. Главная страница работает: `https://your-domain.vercel.app/`
2. Перезагрузка на любом маршруте не дает 404:
   - `https://your-domain.vercel.app/project/123`
   - `https://your-domain.vercel.app/admin/dashboard`
3. API запросы работают (проверьте в Network tab браузера)

## Структура vercel.json

```json
{
  "rewrites": [
    {
      "source": "/((?!api|uploads).*)",
      "destination": "/index.html"
    }
  ]
}
```

Это правило означает:
- Все запросы, которые НЕ начинаются с `/api` или `/uploads`, перенаправляются на `/index.html`
- Это позволяет React Router обработать маршрут на клиенте
- API запросы и загрузки файлов проходят напрямую

## Troubleshooting

### Проблема: Все еще 404 ошибка

1. Убедитесь, что `vercel.json` находится в корне папки `client/`
2. Проверьте, что файл правильно отформатирован (валидный JSON)
3. Перезапустите деплой в Vercel Dashboard

### Проблема: API запросы не работают

1. Проверьте переменную окружения `VITE_API_URL` в Vercel
2. Убедитесь, что backend сервер доступен из интернета
3. Проверьте CORS настройки на backend сервере

### Проблема: Статические файлы не загружаются

1. Убедитесь, что файлы находятся в папке `public/`
2. Используйте абсолютные пути: `/image.png` вместо `./image.png`
3. Проверьте, что файлы включены в сборку

## Дополнительные настройки

### Кастомный домен

1. В Vercel Dashboard: Settings → Domains
2. Добавьте ваш домен
3. Следуйте инструкциям для настройки DNS

### Environment-specific переменные

Вы можете настроить разные значения `VITE_API_URL` для разных окружений:
- **Production:** `https://api.production.com/api`
- **Preview:** `https://api.staging.com/api`
- **Development:** `http://localhost:8081/api`

