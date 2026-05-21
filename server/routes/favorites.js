const express = require('express')
const router = express.Router()
const { query, queryOne, run } = require('../db/knex')
const authMiddleware = require('../middleware/auth')

// POST /api/favorites/:templateId - toggle favorite
router.post('/:templateId', authMiddleware, (req, res) => {
  const userId = req.user.id
  const templateId = req.params.templateId

  try {
    // check if template exists
    const template = queryOne('SELECT * FROM templates WHERE id = ?', [templateId])
    if (!template) {
      return res.status(404).json({ message: 'Template not found' })
    }

    // check if already favorited
    const existing = queryOne(
      'SELECT * FROM favorites WHERE user_id = ? AND template_id = ?',
      [userId, templateId]
    )

    if (existing) {
      // remove from favorites
      run('DELETE FROM favorites WHERE id = ?', [existing.id])
      return res.json({ message: 'Removed from favorites', favorited: false })
    } else {
      // add to favorites
      run(
        'INSERT INTO favorites (user_id, template_id) VALUES (?, ?)',
        [userId, templateId]
      )
      return res.json({ message: 'Added to favorites', favorited: true })
    }

  } catch (err) {
    console.log('favorites error:', err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET /api/favorites - get all favorites for logged in user
router.get('/', authMiddleware, (req, res) => {
  const userId = req.user.id

  try {
    // join favorites with templates
    const favorites = query(
      `SELECT templates.*, favorites.id as favorite_id 
       FROM favorites 
       JOIN templates ON favorites.template_id = templates.id 
       WHERE favorites.user_id = ?`,
      [userId]
    )

    res.json(favorites)
  } catch (err) {
    console.log('get favorites error:', err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
