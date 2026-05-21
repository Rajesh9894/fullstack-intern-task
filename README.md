# TemplateHub — Mini SaaS Template Store

A full-stack web app where users can browse templates, register/login, and save their favorites.

**Built by:** Your Name  
**Contact:** your@email.com

---

## Tech Stack

**Frontend:** React.js (Vite), Tailwind CSS, Axios, React Router DOM  
**Backend:** Node.js, Express.js, SQLite (node-sqlite3-wasm), JWT Auth, bcryptjs

---

## Project Structure

    fullstack-intern-task/
    ├── client/               React frontend
    │   └── src/
    │       ├── pages/        Register, Login, Templates, Favorites
    │       └── components/   Navbar, TemplateCard
    └── server/               Express backend
        ├── routes/           auth.js, templates.js, favorites.js
        ├── middleware/       auth.js (JWT check)
        └── db/               knex.js, migrate.js, seed.js

---

## Setup Instructions

### 1. Clone the repo

    git clone https://github.com/Rajesh9894/fullstack-intern-task.git
    cd fullstack-intern-task

### 2. Setup and run the backend

    cd server
    npm install
    node db/seed.js
    npm run dev

Server runs on http://localhost:5000

### 3. Setup and run the frontend

    cd client
    npm install
    npm run dev

Frontend runs on http://localhost:3000

---

## API Routes

| Method | Route | Auth? | Description |
|--------|-------|-------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login and get JWT token |
| GET | /api/templates | No | List all templates |
| GET | /api/templates/:id | No | Get single template |
| POST | /api/favorites/:templateId | Yes | Toggle favorite |
| GET | /api/favorites | Yes | Get user's favorites |

---

## Features

- User registration and login with JWT
- Passwords hashed with bcrypt
- Browse 7 pre-seeded templates
- Search templates by name or description
- Filter templates by category
- Add or remove favorites (heart button toggles)
- Protected favorites page (redirects to login if not logged in)
- Logout button clears session

---

## Notes

- SQLite database file is created at `server/db/database.sqlite`
- JWT token is stored in localStorage
- Tables are auto-created on first run
- Run `node db/seed.js` once to populate template data

---

## Deployment

**Backend on Render:**
1. Create a new Web Service
2. Set root directory to `server`
3. Build command: `npm install && node db/seed.js`
4. Start command: `node index.js`
5. Add environment variable: `JWT_SECRET=yoursecretkey`

**Frontend on Vercel:**
1. Import the repo on Vercel
2. Set root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Update the API variable in each page to your Render backend URL