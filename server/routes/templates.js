const express = require('express')
const router = express.Router()
const { query, queryOne } = require('../db/knex')

// GET /api/templates - get all templates
router.get('/', (req, res) => {
  try {
    const templates = query('SELECT * FROM templates')
    res.json(templates)
  } catch (err) {
    console.log('error getting templates:', err)
    res.status(500).json({ message: 'Could not get templates' })
  }
})

// GET /api/templates/:id - get one template
router.get('/:id', (req, res) => {
  try {
    const template = queryOne('SELECT * FROM templates WHERE id = ?', [req.params.id])

    if (!template) {
      return res.status(404).json({ message: 'Template not found' })
    }

    res.json(template)
  } catch (err) {
    console.log('error getting template:', err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
