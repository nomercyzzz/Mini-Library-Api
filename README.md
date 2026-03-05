# Mini Library API

## 🛠️ Стек технологий

**Frontend:** Vue.js 3, Vite, Tailwind CSS, Axios

**Backend:** Node.js, Express

---

## 📁 Структура проекта

```
Mini-Library-Api/
├── backend/
│   ├── server.js       # Точка входа сервера, настройка Express
│   ├── router.js       # Маршруты API (GET, POST)
│   ├── middleware.js   # Логирование запросов и обработка ошибок
│   └── package.json    # Зависимости и скрипты бэкенда
├── frontend/
│   ├── index.html      # Главный HTML-файл
│   ├── vite.config.js  # Конфигурация Vite и прокси на бэкенд
│   ├── tailwind.config.js  # Конфигурация Tailwind CSS
│   └── src/
│       ├── app.vue     # Главный компонент: книги, поиск, сортировка
│       ├── main.js     # Точка входа Vue-приложения
│       └── style.css   # Глобальные стили
└── README.md
```

---

## 🚀 Запуск

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API

Base URL: `http://localhost:5000/api/books`

| Метод  | Путь             | Описание               |
|--------|------------------|------------------------|
| GET    | `/api/books`     | Получить все книги     |
| GET    | `/api/books/:id` | Получить книгу по ID   |
| POST   | `/api/books`     | Создать новую книгу    |

### 📥 POST `/api/books` — тело запроса

```json
{
  "title": "Мастер и Маргарита",
  "year": 1967
}
```

### ❌ Возможные ошибки

| Код | Описание                      |
|-----|-------------------------------|
| 400 | Некорректное название или год |
| 404 | Книга не найдена              |
| 409 | Книга уже существует          |
| 500 | Внутренняя ошибка сервера     |
