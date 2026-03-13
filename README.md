# Список пользователей (тестовое задание)

Мини‑приложение на **Vue 3**: загрузка списка пользователей, **поиск**, **фильтрация по компании** и просмотр **деталей пользователя** в модальном окне.

## Функциональность

- **Загрузка пользователей** из публичного API: `https://jsonplaceholder.typicode.com/users`
- **Таблица пользователей** с полями:
  - `name`
  - `email`
  - `phone`
  - `company.name`
- **Состояния UI**:
  - `loading` (скелетон)
  - `error` (алерт)
- **Поиск** (реактивно, без кнопки) по `name` и `email` на клиенте
- **Фильтр по компании** (уникальные компании из данных)
- **Детали пользователя** по клику на строку таблицы (модалка):
  - `name`, `username`, `email`, `phone`, `website`
  - `address.city`, `address.street`
  - `company.name` + `company.catchPhrase`

## Стек

- **Vue 3** + **Vite**
- **TypeScript**
- **Element Plus** (таблица/инпут/select/диалог/скелетон/алерт)
- **Pinia** (состояние модалки)
- **Axios** (HTTP)
- **Tailwind** (минимальная разметка/отступы)

## Запуск проекта

Установить зависимости:

```sh
npm install
```

Запуск dev-сервера:

```sh
npm run dev
```

Сборка:

```sh
npm run build
```

Линт:

```sh
npm run lint
```

## Переменные окружения

По умолчанию API берётся с `jsonplaceholder`. При необходимости можно переопределить base URL:

- **`VITE_API_BASE_URL`** — базовый URL для пользователей (например `https://jsonplaceholder.typicode.com/users`)

Если переменная не задана, используется значение по умолчанию.

## Архитектура и структура проекта

Код разбит на небольшие части, чтобы не складывать всю логику в один файл и не мутировать исходные данные напрямую.

### Структура `src/`

```text
src/
  - assets/
    - logo.svg
    - main.css
  - components/
    - CompanyFilter.vue
    - UserDetailsModal.vue
    - UserSearch.vue
    - UserTable.vue
  - hooks/
    - useGetAllUsers.ts
  - layout/
    - MainLayout.vue
  - services/
    - apiClient.ts
  - stores/
    - useUserModalStore.ts
  - types/
    - User.ts
  - views/
    - MainView.vue
  - App.vue
  - main.ts
```

- **`src/services/apiClient.ts`**
  - Axios‑клиент с `baseURL` (можно переопределить через `VITE_API_BASE_URL`)

- **`src/types/User.ts`**
  - TypeScript‑тип `User` под ответ API

- **`src/hooks/useGetAllUsers.ts`**
  - Загрузка списка пользователей
  - Состояния `isLoading`, `error`, данные `users`

- **`src/views/MainView.vue`**
  - Хранит UI‑состояния для **поиска** и **фильтра**
  - Формирует:
    - `uniqueCompanies` (уникальные компании)
    - `filteredUsers` (результат поиска + фильтра)

- **`src/components/UserSearch.vue`**
  - Поле ввода поиска

- **`src/components/CompanyFilter.vue`**
  - Select фильтра по компании

- **`src/components/UserTable.vue`**
  - Таблица пользователей
  - Отображает `loading`/`error`
  - По клику на строку открывает детали пользователя

- **`src/stores/useUserModalStore.ts`**
  - Pinia‑store модалки: `isOpen`, `selectedUser`, `openModal/closeModal`

- **`src/components/UserDetailsModal.vue`**
  - Модальное окно с деталями выбранного пользователя

- **`src/App.vue`**
  - Подключает `MainView` и глобально рендерит `UserDetailsModal`

## Поток данных

1. `MainView` вызывает `getAllUsers()` из `useGetAllUsers`.
2. Полученные `users` используются для вычисления `uniqueCompanies` и `filteredUsers`.
3. `UserTable` рендерит `filteredUsers`.
4. Клик по строке таблицы → `openModal(user)` в Pinia‑store → `UserDetailsModal` показывает детали.
