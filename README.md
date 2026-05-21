# TemplateHub — Mini SaaS Template Store

A full-stack web app where users can browse templates, register/login, and save their favorites.

**Built by:** [Your Name]  
**Contact:** [your@email.com]

---

## Tech Stack

**Frontend:** React.js (Vite), Tailwind CSS, Axios, React Router DOM  
**Backend:** Node.js, Express.js, SQLite (node-sqlite3-wasm), JWT Auth, bcryptjs

---

## Project Structure

```
fullstack-intern-task/
├── client/          → React frontend
│   └── src/
│       ├── pages/   → Register, Login, Templates, Favorites
│       └── components/ → Navbar, TemplateCard
└── server/          → Express backend
    ├── routes/      → auth.js, templates.js, favorites.js
    ├── middleware/  → auth.js (JWT check)
    └── db/          → knex.js, migrate.js, seed.js
```

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/fullstack-intern-task.git
cd fullstack-intern-task
```

### 2. Setup & run the backend

```bash
cd server
npm install
node db/seed.js      # creates tables and seeds 7 templates
npm run dev          # starts server on http://localhost:5000
```

### 3. Setup & run the frontend

```bash
cd client
npm install
npm run dev          # starts frontend on http://localhost:3000
```

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
- Search templates by name/description
- Filter templates by category
- Add/remove favorites (heart button toggles)
- Protected favorites page (redirects to login if not logged in)
- Logout button clears session

---

## Notes

- SQLite database file is at `server/db/database.sqlite`
- JWT token is stored in localStorage
- The database auto-creates tables on first run
- Run `node db/seed.js` once to populate template data

---

## Deployment

**Backend → Render:**
1. Create a new Web Service on Render
2. Set root directory to `server`
3. Build command: `npm install && node db/seed.js`
4. Start command: `node index.js`
5. Add environment variable: `JWT_SECRET=yoursecretkey`

**Frontend → Vercel:**
1. Import the repo on Vercel
2. Set root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Update the `API` variable in each page to your Render backend URL
