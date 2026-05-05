// db/seed.js — Seeds 8 sample templates
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { initDB, queryOne, execute } = require('./database');

const templates = [
  { name: 'Startup Landing Page', description: 'A modern, conversion-focused landing page for SaaS startups. Includes hero, features, pricing, and CTA sections.', thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop', category: 'Landing Page' },
  { name: 'E-Commerce Store', description: 'Full-featured online store template with product grid, cart, and checkout flow. Mobile-first design.', thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop', category: 'E-Commerce' },
  { name: 'Developer Portfolio', description: 'Minimal portfolio for developers and designers. Showcases projects, skills, and contact form.', thumbnail_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop', category: 'Portfolio' },
  { name: 'SaaS Dashboard', description: 'Clean admin dashboard with charts, tables, and KPI cards. Perfect for analytics applications.', thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop', category: 'Dashboard' },
  { name: 'Blog & Magazine', description: 'Editorial-style blog with featured posts, categories, and newsletter signup. Great typography.', thumbnail_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop', category: 'Blog' },
  { name: 'Restaurant Website', description: 'Elegant restaurant site with menu, reservations, gallery, and location map integration.', thumbnail_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop', category: 'Business' },
  { name: 'Fitness & Wellness App', description: 'Health tracking dashboard with workout logs, nutrition charts, and progress streaks.', thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop', category: 'Dashboard' },
  { name: 'Real Estate Listings', description: 'Property listing site with advanced filters, map view, and inquiry forms. Clean and professional.', thumbnail_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop', category: 'Business' },
];

async function seed() {
  await initDB();
  const existing = queryOne('SELECT COUNT(*) as count FROM templates');
  if (existing && existing.count > 0) {
    console.log(`✅ Already seeded (${existing.count} templates). Skipping.`);
    process.exit(0);
  }
  for (const t of templates) {
    execute(
      'INSERT INTO templates (name, description, thumbnail_url, category) VALUES (?, ?, ?, ?)',
      [t.name, t.description, t.thumbnail_url, t.category]
    );
  }
  console.log(`✅ Seeded ${templates.length} templates!`);
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
