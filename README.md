# 📝 Blog Application — REST API + React Frontend

A full-stack blog application built with **Node.js/Express** backend, **MySQL** database, and a **React + Tailwind CSS** frontend themed as a Web Design Agency ("NovaByte Studios").

---

## 🚀 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | Node.js, Express.js               |
| Database   | MySQL                             |
| Auth       | JWT (jsonwebtoken), bcryptjs      |
| Validation | express-validator                 |
| Frontend   | React 18, React Router v7         |
| Styling    | Tailwind CSS v3                   |
| HTTP       | Axios                             |
| Icons      | Lucide React                      |
| Build Tool | Vite                              |

---

## 📁 Project Structure

```
API_Blog/
├── backend/               # Express REST API
│   ├── config/db.js        # MySQL connection pool
│   ├── controllers/        # Route handlers
│   ├── middleware/          # JWT auth, validation
│   ├── models/             # Database queries
│   ├── routes/             # API route definitions
│   ├── utils/helpers.js    # Token generation
│   ├── database/schema.sql # Database schema
│   ├── server.js           # Entry point
│   └── .env                # Environment variables
├── frontend/               # React SPA
│   ├── src/
│   │   ├── api/            # Axios instance
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Auth context
│   │   └── pages/          # Route pages
│   ├── tailwind.config.js
│   └── vite.config.js
└── docs/                   # Documentation
    ├── API_DOCUMENTATION.md
    └── postman_collection.json
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** v18+ 
- **MySQL** 8.0+ (running locally)
- **npm** or **yarn**

### 1. Set Up the Database

```bash
# Log into MySQL
mysql -u root -p

# Run the schema script
source backend/database/schema.sql;
```

This creates the `blog_db` database with `users`, `posts`, and `comments` tables.

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blog_db
JWT_SECRET=change_this_to_a_random_secret
```

### 3. Start the Backend

```bash
cd backend
npm install
npm run dev
```

Server starts at **http://localhost:5000**

### 4. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at **http://localhost:5173** (API requests are proxied to backend automatically)

---

## 🔑 Authentication Flow

1. **Register** → `POST /api/auth/register` → Returns JWT token
2. **Login** → `POST /api/auth/login` → Returns JWT token
3. Token is stored in `localStorage` and automatically attached to API requests via Axios interceptor
4. Protected routes check for valid JWT in `Authorization: Bearer <token>` header

---

## 📖 API Endpoints

See [API Documentation](docs/API_DOCUMENTATION.md) for full details.

| Method | Endpoint           | Auth | Description         |
|--------|--------------------|------|---------------------|
| POST   | /api/auth/register | No   | Register new user   |
| POST   | /api/auth/login    | No   | Login, get JWT      |
| GET    | /api/auth/me       | Yes  | Get current user    |
| GET    | /api/posts         | No   | List all posts      |
| GET    | /api/posts/:id     | No   | Get single post     |
| GET    | /api/posts/mine    | Yes  | Get user's posts    |
| POST   | /api/posts         | Yes  | Create post         |
| PUT    | /api/posts/:id     | Yes  | Update post (owner) |
| DELETE | /api/posts/:id     | Yes  | Delete post (owner) |
| GET    | /api/comments?post_id=X | No | Get post comments |
| GET    | /api/comments/:id  | No   | Get single comment  |
| POST   | /api/comments      | Yes  | Add comment         |
| PUT    | /api/comments/:id  | Yes  | Update comment (owner) |
| DELETE | /api/comments/:id  | Yes  | Delete comment (owner) |

---

## 🎨 Frontend Pages

| Page          | Route            | Auth Required |
|---------------|------------------|---------------|
| Home          | `/`              | No            |
| Blog          | `/blog`          | No            |
| Login         | `/login`         | No            |
| Register      | `/register`      | No            |
| Dashboard     | `/dashboard`     | Yes           |
| Post Detail   | `/posts/:id`     | No            |
| Edit Post     | `/posts/:id/edit`| Yes           |

---

## 🛡️ Security

- Passwords hashed with **bcryptjs** (12 rounds)
- JWT tokens with configurable expiration
- Input validation on all endpoints via **express-validator**
- Ownership verification for update/delete operations
- CORS configured for frontend origin

---

## 📜 License

MIT
