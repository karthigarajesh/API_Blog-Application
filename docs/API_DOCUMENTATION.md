# API Documentation

Base URL: `http://localhost:5000/api`

---

## Authentication

### POST /auth/register

Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Response (409):**
```json
{
  "message": "Email already registered"
}
```

---

### POST /auth/login

Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

---

### GET /auth/me

Get current authenticated user profile.

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2026-04-06T12:00:00.000Z"
  }
}
```

---

## Posts

### GET /posts

Get all posts (public).

**Success Response (200):**
```json
{
  "posts": [
    {
      "id": 1,
      "title": "My First Post",
      "content": "This is the content...",
      "author_id": 1,
      "author_username": "johndoe",
      "created_at": "2026-04-06T12:00:00.000Z",
      "updated_at": "2026-04-06T12:00:00.000Z"
    }
  ]
}
```

---

### GET /posts/:id

Get a single post by ID (public).

**Success Response (200):**
```json
{
  "post": {
    "id": 1,
    "title": "My First Post",
    "content": "This is the content...",
    "author_id": 1,
    "author_username": "johndoe",
    "created_at": "2026-04-06T12:00:00.000Z",
    "updated_at": "2026-04-06T12:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Post not found"
}
```

---

### GET /posts/mine

Get authenticated user's posts.

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "posts": [...]
}
```

---

### POST /posts

Create a new post (authenticated).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "My New Post",
  "content": "This is the post content..."
}
```

**Success Response (201):**
```json
{
  "message": "Post created successfully",
  "post": {
    "id": 2,
    "title": "My New Post",
    "content": "This is the post content...",
    "author_id": 1
  }
}
```

---

### PUT /posts/:id

Update a post (authenticated, owner only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

**Success Response (200):**
```json
{
  "message": "Post updated successfully",
  "post": { ... }
}
```

**Error Response (403):**
```json
{
  "message": "You can only edit your own posts"
}
```

---

### DELETE /posts/:id

Delete a post (authenticated, owner only).

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "message": "Post deleted successfully"
}
```

---

## Comments

### GET /comments?post_id=1

Get all comments for a post (public).

**Success Response (200):**
```json
{
  "comments": [
    {
      "id": 1,
      "post_id": 1,
      "content": "Great post!",
      "author_id": 2,
      "author_username": "janedoe",
      "created_at": "2026-04-06T13:00:00.000Z"
    }
  ]
}
```

---

### GET /comments/:id

Get a single comment by ID (public).

**Success Response (200):**
```json
{
  "comment": { ... }
}
```

---

### POST /comments

Add a comment to a post (authenticated).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "post_id": 1,
  "content": "This is a great article!"
}
```

**Success Response (201):**
```json
{
  "message": "Comment added successfully",
  "comment": {
    "id": 1,
    "post_id": 1,
    "content": "This is a great article!",
    "author_id": 1,
    "author_username": "johndoe",
    "created_at": "2026-04-06T13:00:00.000Z"
  }
}
```

---

### PUT /comments/:id

Update a comment (authenticated, owner only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "Updated comment text"
}
```

**Success Response (200):**
```json
{
  "message": "Comment updated successfully",
  "comment": { ... }
}
```

---

### DELETE /comments/:id

Delete a comment (authenticated, owner only).

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "message": "Comment deleted successfully"
}
```

---

## Error Responses

### Validation Errors (400)
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "message": "Access denied. No token provided."
}
```

### Forbidden (403)
```json
{
  "message": "You can only edit your own posts"
}
```

### Not Found (404)
```json
{
  "message": "Post not found"
}
```

### Conflict (409)
```json
{
  "message": "Email already registered"
}
```

### Server Error (500)
```json
{
  "message": "Server error during registration"
}
```

---

## Database Schema

### users
| Column     | Type         | Constraints          |
|------------|--------------|----------------------|
| id         | INT          | PK, AUTO_INCREMENT   |
| username   | VARCHAR(50)  | NOT NULL, UNIQUE     |
| email      | VARCHAR(100) | NOT NULL, UNIQUE     |
| password   | VARCHAR(255) | NOT NULL             |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

### posts
| Column     | Type         | Constraints          |
|------------|--------------|----------------------|
| id         | INT          | PK, AUTO_INCREMENT   |
| title      | VARCHAR(255) | NOT NULL             |
| content    | TEXT         | NOT NULL             |
| author_id  | INT          | FK → users(id)       |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP    | ON UPDATE CURRENT_TIMESTAMP |

### comments
| Column     | Type         | Constraints          |
|------------|--------------|----------------------|
| id         | INT          | PK, AUTO_INCREMENT   |
| post_id    | INT          | FK → posts(id) CASCADE |
| content    | TEXT         | NOT NULL             |
| author_id  | INT          | FK → users(id) CASCADE |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
