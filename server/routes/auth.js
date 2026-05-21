const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { query, queryOne, run } = require('../db/knex')

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  // basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  try {
    // check if email already exists
    const existingUser = queryOne('SELECT * FROM users WHERE email = ?', [email])
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    res.status(201).json({ message: 'Account created successfully!' })

  } catch (err) {
    console.log('register error:', err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    // find user by email
    const user = queryOne('SELECT * FROM users WHERE email = ?', [email])

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // create jwt token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })

  } catch (err) {
    console.log('login error:', err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
