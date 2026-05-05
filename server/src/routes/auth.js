// routes/auth.js — Register and Login
const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const { queryOne, execute } = require('../db/database');

const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  if (name.trim().length < 2)
    return res.status(400).json({ message: 'Name must be at least 2 characters.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  if (password.length < 6)
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });

  const existing = queryOne('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
  if (existing)
    return res.status(409).json({ message: 'An account with this email already exists.' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name.trim(), email.toLowerCase(), hashedPassword]
  );

  const token = jwt.sign(
    { id: result.lastInsertRowid, email: email.toLowerCase(), name: name.trim() },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    message: 'Account created successfully!',
    token,
    user: { id: result.lastInsertRowid, name: name.trim(), email: email.toLowerCase() },
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' });

  const user = queryOne('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: 'Invalid email or password.' });

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    message: 'Logged in successfully!',
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

module.exports = router;
