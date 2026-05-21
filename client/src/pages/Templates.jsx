import { useState, useEffect } from 'react'
import axios from 'axios'
import TemplateCard from '../components/TemplateCard'

const API = 'http://localhost:5000/api'

function Templates() {
  const [templates, setTemplates] = useState([])
  const [favorites, setFavorites] = useState([]) // list of favorited template ids
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchTemplates()
    if (token) {
      fetchFavorites()
    }
  }, [])

  async function fetchTemplates() {
    try {
      const res = await axios.get(`${API}/templates`)
      setTemplates(res.data)
    } catch (err) {
      console.log('error loading templates', err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchFavorites() {
    try {
      const res = await axios.get(`${API}/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // just store the template ids
      const ids = res.data.map((f) => f.id)
      setFavorites(ids)
    } catch (err) {
      console.log('error loading favorites', err)
    }
  }

  async function handleFavoriteClick(templateId) {
    if (!token) {
      alert('Please login to save favorites!')
      return
    }

    try {
      const res = await axios.post(
        `${API}/favorites/${templateId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (res.data.favorited) {
        setFavorites([...favorites, templateId])
      } else {
        setFavorites(favorites.filter((id) => id !== templateId))
      }
    } catch (err) {
      console.log('favorite error', err)
      alert('Something went wrong')
    }
  }

  // get unique categories from templates
  const categories = ['All', ...new Set(templates.map((t) => t.category))]

  // filter by search text and category
  const filtered = templates.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === 'All' || t.category === selectedCategory
    return matchSearch && matchCategory
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Loading templates...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Browse Templates</h1>
        <p className="text-gray-500 text-sm">Find the perfect template for your next project</p>
      </div>

      {/* search and filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search templates..."
          className="border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400 flex-1"
        />

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-2 rounded border transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No templates found for "{search}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isFavorited={favorites.includes(template.id)}
              onFavoriteClick={handleFavoriteClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Templates
