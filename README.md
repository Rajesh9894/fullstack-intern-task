# 🧩 TemplateHub — Mini SaaS Template Store

TemplateHub is a simple full-stack web application where users can create an account, log in, explore templates, and save their favorites.

This project was built as part of the **Gnxtace Technologies Software Engineer Intern Technical Task**.

---

## 👤 Developer Details

- **Name:** Rajesh M  
- **Email:** raj3sh.dev@gmail.com  
- **GitHub:** https://github.com/Rajesh9894  

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite) + Tailwind CSS  
- **Backend:** Node.js + Express.js  
- **Database:** SQLite (better-sqlite3)  
- **Authentication:** JWT + bcryptjs  
- **HTTP Client:** Axios  

> Note: I used `better-sqlite3` to write raw SQL queries and better understand database operations instead of using an ORM.

---

## 📁 Project Structure
fullstack-intern-task/
├── client/
│ ├── src/
│ │ ├── api/axios.js
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ └── TemplateCard.jsx
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Templates.jsx
│ │ │ └── Favorites.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
├── server/
│ ├── src/
│ │ ├── db/
│ │ │ ├── database.js
│ │ │ └── seed.js
│ │ ├── middleware/auth.js
│ │ ├── routes/
│ │ │ ├── auth.js
│ │ │ ├── templates.js
│ │ │ └── favorites.js
│ │ └── index.js
│ ├── data/
│ └── package.json
│
└── README.md


---

## 🚀 Setup & Run Locally

### Prerequisites

- Node.js (v18 or higher)
- npm

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/fullstack-intern-task.git
cd fullstack-intern-task

Setup Backend
cd server
npm install
cp .env.example .env

Edit .env file:

JWT_SECRET=your_secret_key

Run backend:

npm run dev

Backend runs at: http://localhost:5000

Database is created automatically
Sample templates are seeded automatically
Step 3: Setup Frontend

Open a new terminal:

cd client
npm install
npm run dev

Frontend runs at: http://localhost:5173

Step 4: Use the App
Register a new account
Login
Browse templates
Click ❤️ to save favorites
View them in "My Favorites"
📡 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Templates
GET /api/templates
GET /api/templates/:id
Favorites (Protected)
GET /api/favorites
POST /api/favorites/:templateId
DELETE /api/favorites/:templateId
✨ Features
User registration & login
Password hashing (bcryptjs)
JWT authentication
Browse templates (public)
Add/remove favorites
Protected routes
Search templates
Filter by category
Responsive UI
Auto database setup
Clean error handling
🌐 Deployment
Backend (Render)
Deploy server/
Set environment variables:
PORT
JWT_SECRET

