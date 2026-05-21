const express = require('express')
const cors = require('cors')
require('dotenv').config()

const createTables = require('./db/migrate')
const authRoutes = require('./routes/auth')
const templateRoutes = require('./routes/templates')
const favoritesRoutes = require('./routes/favorites')

const app = express()
const PORT = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/templates', templateRoutes)
app.use('/api/favorites', favoritesRoutes)

// just a test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' })
})

// start server after creating tables
async function startServer() {
  await createTables()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()
