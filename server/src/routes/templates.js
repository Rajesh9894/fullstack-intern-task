// routes/templates.js — Public template routes
const express = require('express');
const jwt     = require('jsonwebtoken');
const { query, queryOne } = require('../db/database');

const router = express.Router();

// GET /api/templates
router.get('/', (req, res) => {
  // Optional auth — mark favorites if logged in
  let userId = null;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
      userId = decoded.id;
    } catch { /* ignore */ }
  }

  let templates;
  if (userId) {
    templates = query(`
      SELECT t.*, 
             CASE WHEN f.id IS NOT NULL THEN 1 ELSE 0 END AS is_favorited
      FROM templates t
      LEFT JOIN favorites f ON f.template_id = t.id AND f.user_id = ?
      ORDER BY t.id
    `, [userId]);
  } else {
    templates = query('SELECT *, 0 AS is_favorited FROM templates ORDER BY id');
  }

  // Frontend filtering (also works via query params)
  const { category, search } = req.query;
  let filtered = templates;
  if (category && category !== 'All')
    filtered = filtered.filter(t => t.category === category);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }

  res.json(filtered);
});

// GET /api/templates/:id
router.get('/:id', (req, res) => {
  const template = queryOne('SELECT * FROM templates WHERE id = ?', [req.params.id]);
  if (!template) return res.status(404).json({ message: 'Template not found.' });
  res.json(template);
});

module.exports = router;
