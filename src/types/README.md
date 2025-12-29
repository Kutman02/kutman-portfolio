# Типы проекта

Эта папка содержит все типы данных для проекта Portfolio, определенные с использованием JSDoc комментариев.

## Структура

### `models.js`
Типы для моделей данных, соответствующих MongoDB схемам:
- `Project` - Проект портфолио
- `Skill` - Навык
- `Contact` - Контакт
- `Profile` - Профиль пользователя
- `Resume` - Резюме
- `Translation` - Перевод
- `Admin` - Администратор
- `AuthResponse` - Ответ аутентификации
- `LoginCredentials` - Учетные данные для входа

### `redux.js`
Типы для Redux Store:
- `AuthState` - Состояние аутентификации
- `ProjectsState` - Состояние проектов
- `SkillsState` - Состояние навыков
- `ContactsState` - Состояние контактов
- `ProfileState` - Состояние профиля
- `ResumeState` - Состояние резюме
- `TranslationsState` - Состояние переводов
- `RootState` - Корневое состояние Redux

### `api.js`
Типы для API запросов и ответов:
- `ApiResponse<T>` - Обобщенный ответ API
- `ErrorResponse` - Ответ с ошибкой
- `UploadResponse` - Ответ загрузки файла
- `ProjectsApiResponse` - Ответ с проектами
- `SkillsApiResponse` - Ответ с навыками
- `ContactsApiResponse` - Ответ с контактами
- `TranslationsApiResponse` - Ответ с переводами

### `components.js`
Типы для пропсов компонентов:
- `ProjectCardProps` - Пропсы карточки проекта
- `SkillBadgeProps` - Пропсы бейджа навыка
- `ResumeButtonsProps` - Пропсы кнопок резюме
- `ContactMethod` - Метод контакта

### `index.js`
Главный файл, экспортирующий все типы.

## Использование

Типы определены с использованием JSDoc, что позволяет IDE (VS Code, WebStorm и др.) предоставлять автодополнение и проверку типов.

### Пример использования:

```javascript
/**
 * @typedef {import('../types/models.js').Project} Project
 */

/**
 * @param {Project} project - Проект для отображения
 */
function displayProject(project) {
  console.log(project.title);
}
```

### В Redux компонентах:

```javascript
/**
 * @typedef {import('../types/redux.js').RootState} RootState
 */

const projects = useAppSelector((state) => state.projects.items);
```

## Примечания

- Все типы используют JSDoc синтаксис для совместимости с JavaScript
- Типы автоматически подхватываются IDE с поддержкой JSDoc
- Для полной поддержки TypeScript можно переименовать файлы в `.ts` и использовать TypeScript синтаксис

