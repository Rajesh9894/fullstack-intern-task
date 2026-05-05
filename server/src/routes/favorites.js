// routes/favorites.js — Protected favorite routes
const express = require('express');
const { query, queryOne, execute } = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// GET /api/favorites
router.get('/', (req, res) => {
  const favorites = query(`
    SELECT t.*, 1 AS is_favorited
    FROM templates t
    JOIN favorites f ON f.template_id = t.id
    WHERE f.user_id = ?
    ORDER BY f.created_at DESC
  `, [req.user.id]);
  res.json(favorites);
});

// POST /api/favorites/:templateId — toggle favorite
router.post('/:templateId', (req, res) => {
  const { templateId } = req.params;
  const userId = req.user.id;

  const template = queryOne('SELECT id FROM templates WHERE id = ?', [templateId]);
  if (!template) return res.status(404).json({ message: 'Template not found.' });

  const existing = queryOne(
    'SELECT id FROM favorites WHERE user_id = ? AND template_id = ?',
    [userId, templateId]
  );

  if (existing) {
    execute('DELETE FROM favorites WHERE user_id = ? AND template_id = ?', [userId, templateId]);
    return res.json({ message: 'Removed from favorites.', is_favorited: false });
  } else {
    execute('INSERT INTO favorites (user_id, template_id) VALUES (?, ?)', [userId, templateId]);
    return res.status(201).json({ message: 'Added to favorites!', is_favorited: true });
  }
});

// DELETE /api/favorites/:templateId
router.delete('/:templateId', (req, res) => {
  execute(
    'DELETE FROM favorites WHERE user_id = ? AND template_id = ?',
    [req.user.id, req.params.templateId]
  );
  res.json({ message: 'Removed from favorites.', is_favorited: false });
});

module.exports = router;
