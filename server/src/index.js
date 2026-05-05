// src/index.js — Express server entry point
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Ensure data dir exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const { initDB, queryOne } = require('./db/database');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Start only after DB is ready
initDB().then(async () => {
  console.log('Database ready');

  // Auto-seed if no templates
  const count = queryOne('SELECT COUNT(*) as count FROM templates');
  if (!count || count.count === 0) {
    console.log(' Seeding templates...');
    const { execute } = require('./db/database');
    const templates = [
      { name: 'Startup Landing Page', description: 'A modern, conversion-focused landing page for SaaS startups.', thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop', category: 'Landing Page' },
      { name: 'E-Commerce Store', description: 'Full-featured online store template with product grid and cart.', thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop', category: 'E-Commerce' },
      { name: 'Developer Portfolio', description: 'Minimal portfolio for developers and designers with projects showcase.', thumbnail_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop', category: 'Portfolio' },
      { name: 'SaaS Dashboard', description: 'Clean admin dashboard with charts, tables, and KPI cards.', thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop', category: 'Dashboard' },
      { name: 'Blog & Magazine', description: 'Editorial-style blog with featured posts and newsletter signup.', thumbnail_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop', category: 'Blog' },
      { name: 'Restaurant Website', description: 'Elegant restaurant site with menu, reservations, and gallery.', thumbnail_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop', category: 'Business' },
      { name: 'Fitness & Wellness App', description: 'Health tracking dashboard with workout logs and nutrition charts.', thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop', category: 'Dashboard' },
      { name: 'Real Estate Listings', description: 'Property listing site with advanced filters and map view.', thumbnail_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop', category: 'Business' },
    ];
    for (const t of templates) {
      execute('INSERT INTO templates (name, description, thumbnail_url, category) VALUES (?, ?, ?, ?)',
        [t.name, t.description, t.thumbnail_url, t.category]);
    }
    console.log(` Seeded ${templates.length} templates`);
  }

  // Routes
  app.use('/api/auth',      require('./routes/auth'));
  app.use('/api/templates', require('./routes/templates'));
  app.use('/api/favorites', require('./routes/favorites'));

  app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

  app.use((req, res) => res.status(404).json({ message: `Route ${req.method} ${req.path} not found.` }));
  app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);
    res.status(500).json({ message: 'Internal server error.' });
  });

  app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
