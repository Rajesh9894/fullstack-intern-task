const createTables = require('./migrate')
const { query, run } = require('./knex')

function seedTemplates() {
  createTables()

  // check if already seeded
  const existing = query('SELECT * FROM templates')
  if (existing.length > 0) {
    console.log('templates already seeded')
    return
  }

  const templates = [
    ['Landing Page Pro', 'A clean and modern landing page template great for startups and SaaS products. Has hero section, features, and pricing.', 'https://placehold.co/400x250/6366f1/white?text=Landing+Page', 'Landing Page'],
    ['Dashboard UI Kit', 'Full admin dashboard with sidebar, charts, tables and user management. Perfect for internal tools.', 'https://placehold.co/400x250/0ea5e9/white?text=Dashboard', 'Dashboard'],
    ['E-commerce Store', 'Product listing, cart, and checkout pages. Clean design that works well for any online store.', 'https://placehold.co/400x250/10b981/white?text=E-Commerce', 'E-Commerce'],
    ['Portfolio Template', 'Minimal and stylish portfolio for developers and designers. Includes about, projects, and contact sections.', 'https://placehold.co/400x250/f59e0b/white?text=Portfolio', 'Portfolio'],
    ['Blog Starter', 'Simple blog template with post listing, categories, and author profile. Great for personal or company blogs.', 'https://placehold.co/400x250/ef4444/white?text=Blog', 'Blog'],
    ['SaaS Pricing Page', 'Beautiful pricing page with monthly/yearly toggle, feature comparison table, and FAQ section.', 'https://placehold.co/400x250/8b5cf6/white?text=Pricing', 'Landing Page'],
    ['Agency Website', 'Bold and creative agency site with animated hero, services grid, team section, and contact form.', 'https://placehold.co/400x250/ec4899/white?text=Agency', 'Business']
  ]

  for (const [name, description, thumbnail_url, category] of templates) {
    run(
      'INSERT INTO templates (name, description, thumbnail_url, category) VALUES (?, ?, ?, ?)',
      [name, description, thumbnail_url, category]
    )
  }

  console.log('Templates seeded!')
}

seedTemplates()
