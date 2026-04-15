# Recipe Sharing App — MERN Stack

A full-stack recipe sharing platform built with MongoDB, Express, React, and Node.js.

## Project Structure

```
recipe-app/
├── server/          # Node.js + Express backend
│   ├── config/      # Database connection
│   ├── controllers/ # Route handler logic
│   ├── middleware/  # Auth, error handling, validation
│   ├── models/      # Mongoose schemas
│   └── routes/      # Express route definitions
└── client/          # React + Vite frontend
    └── src/
        ├── components/
        │   ├── auth/    # Login, Register forms
        │   ├── layout/  # Navbar, Footer, ProtectedRoute
        │   ├── recipe/  # RecipeCard, RecipeForm, RecipeList
        │   └── ui/      # Shared: Spinner, Alert, SearchBar
        ├── context/     # AuthContext (global auth state)
        ├── hooks/       # useRecipes, useFavorites
        ├── pages/       # One file per route/page
        ├── services/    # Axios API calls
        └── utils/       # Helpers (formatTime, etc.)
```

## Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone and install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure environment variables

```bash
cd server
cp .env.example .env
# Edit .env and fill in your MONGO_URI and JWT_SECRET
```

### 3. Run in development

```bash
# Terminal 1 — backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd client
npm run dev
```

## API Endpoints

| Method | Endpoint                        | Auth     | Description              |
|--------|---------------------------------|----------|--------------------------|
| POST   | /api/auth/register              | Public   | Register new user        |
| POST   | /api/auth/login                 | Public   | Login, returns JWT       |
| GET    | /api/auth/me                    | Required | Get current user         |
| GET    | /api/recipes                    | Public   | List/search recipes      |
| GET    | /api/recipes/:id                | Public   | Single recipe            |
| POST   | /api/recipes                    | Required | Create recipe            |
| PUT    | /api/recipes/:id                | Required | Update own recipe        |
| DELETE | /api/recipes/:id                | Required | Delete own recipe        |
| GET    | /api/favorites                  | Required | Get saved recipes        |
| POST   | /api/favorites/:recipeId        | Required | Toggle save/unsave       |
| GET    | /api/users/:id                  | Public   | User profile + recipes   |
| PUT    | /api/users/me                   | Required | Update own profile       |

## Team Contributions

| Task                        | Owner |
|-----------------------------|-------|
| Backend: Auth + User model  |       |
| Backend: Recipe CRUD        |       |
| Backend: Favorites + search |       |
| Frontend: Auth pages        |       |
| Frontend: Recipe pages      |       |
| Frontend: Favorites + Nav   |       |
