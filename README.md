# Nyama

**From recipes to your weekly grocery list**

Nyama is a full-stack MERN web application that bridges the gap between discovering recipes and grocery shopping. Users can browse and save recipes, then automatically generate a weekly grocery list based on their saved recipes with ingredients merged and quantities totalled across every dish.

The name **Nyama** means "meat" or "food" in Swahili, reflecting the app's focus on real, everyday cooking.

---

## Features

- **Browse and search recipes** with filters by category and difficulty, and sorting options
- **Create, edit, and delete recipes** with image URL, ingredients, steps, and cook time
- **Save recipes** to a personal favourites collection
- **Generate a grocery list** automatically from saved recipes, with ingredients aggregated across all dishes
- **Manage your grocery list** by checking off purchased items, clearing completed items, or resetting the full list
- **User profiles** with editable username, bio, and avatar URL
- **JWT authentication** with protected routes for all personal data
- **Responsive design** that works on desktop and mobile

---

## Tech Stack

**Frontend**
- React 18, React Router v6, Vite
- Chakra UI, Framer Motion
- Axios

**Backend**
- Node.js, Express.js
- Mongoose, MongoDB Atlas
- JSON Web Tokens (JWT), bcryptjs
- express-validator, express-mongo-sanitize, Helmet, Morgan, dotenv

**Tooling**
- Git and GitHub (version control)
- Thunder Client / Postman (API testing)
- Render (deployment)

---

## Project Structure

```
recipe_mern_app/
├── client/                       # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── auth/             # LoginForm, RegisterForm
│       │   ├── layout/           # Navbar, Footer, ProtectedRoute
│       │   ├── recipe/           # RecipeCard, RecipeForm, RecipeGrid
│       │   └── ui/               # Shared components (Spinner, Alert, SearchBar)
│       ├── context/              # AuthContext (global auth state)
│       ├── hooks/                # useRecipes, useFavorites
│       ├── pages/                # One file per route
│       ├── services/             # Axios API calls (auth, recipe, favorite, grocery, user)
│       └── utils/                # Helpers (formatTime, etc.)
└── server/                       # Node.js + Express backend
    ├── config/                   # MongoDB connection
    ├── controllers/              # Route handler logic
    ├── middleware/               # Auth, error handling, validation
    ├── models/                   # Mongoose schemas (User, Recipe, Favorite, GroceryItem)
    ├── routes/                   # Express route definitions
    ├── seed.js                   # Database seed script
    └── server.js                 # App entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account and cluster

### 1. Clone the repository

```bash
git clone https://github.com/your-username/recipe_mern_app.git
cd recipe_mern_app
```

### 2. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure environment variables

```bash
cd server
cp .env.example .env
```

Open `server/.env` and fill in your values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/recipe-app?retryWrites=true&w=majority
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
```

### 4. (Optional) Seed the database

```bash
cd server
node seed.js
```

This populates the database with sample recipes so the app has content to display immediately.

### 5. Run in development

Open two terminals:

```bash
# Terminal 1: backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2: frontend (http://localhost:5173)
cd client
npm run dev
```

---

## API Endpoints

All endpoints are prefixed with `/api`.

### Auth

| Method | Endpoint         | Auth     | Description               |
|--------|------------------|----------|---------------------------|
| POST   | /auth/register   | Public   | Register a new user       |
| POST   | /auth/login      | Public   | Login and receive a JWT   |
| GET    | /auth/me         | Required | Get the current user      |

### Recipes

| Method | Endpoint        | Auth     | Description                         |
|--------|-----------------|----------|-------------------------------------|
| GET    | /recipes        | Public   | List recipes (search, filter, sort) |
| GET    | /recipes/:id    | Public   | Get a single recipe                 |
| POST   | /recipes        | Required | Create a recipe                     |
| PUT    | /recipes/:id    | Required | Update own recipe                   |
| DELETE | /recipes/:id    | Required | Delete own recipe                   |

### Favourites

| Method | Endpoint                  | Auth     | Description                        |
|--------|---------------------------|----------|------------------------------------|
| GET    | /favorites                | Required | Get the current user's saved recipes |
| POST   | /favorites/:recipeId      | Required | Toggle save or unsave a recipe     |
| GET    | /favorites/:recipeId/status | Required | Check if a recipe is saved       |

### Grocery List

| Method | Endpoint             | Auth     | Description                                     |
|--------|----------------------|----------|-------------------------------------------------|
| GET    | /grocery             | Required | Get the current user's grocery list             |
| POST   | /grocery/generate    | Required | Generate a grocery list from saved recipes      |
| PUT    | /grocery/:id/toggle  | Required | Mark an item as complete or incomplete          |
| DELETE | /grocery/clear       | Required | Remove all completed items from the list        |
| PUT    | /grocery/reset       | Required | Reset the entire grocery list                   |

### Users

| Method | Endpoint    | Auth     | Description                              |
|--------|-------------|----------|------------------------------------------|
| GET    | /users/me   | Required | Get the current user's profile           |
| PUT    | /users/me   | Required | Update username, bio, or avatar URL      |
| GET    | /users/:id  | Public   | Get a public user profile and their recipes |

---

## Team

| Member  | Contributions                                                         |
|---------|-----------------------------------------------------------------------|
| Amanda  | GitHub setup, MongoDB Atlas, Recipe CRUD, Grocery list, Logo, UI polish, Responsive design |
| Oludare | Project proposal, Design, Auth (backend + frontend), Favourites, Profile page, Deployment |

---

## Deployment

The app is deployed on [Render](https://render.com):
- Frontend hosted as a **Static Site**
- Backend hosted as a **Web Service**

> Note: Render's free tier spins down inactive services. The first request after a period of inactivity may take up to 30 seconds while the backend restarts.

---

## Institution

**Course:** Interactive Development
**Institution:** Assiniboine College
**Submitted:** April 28, 2026
