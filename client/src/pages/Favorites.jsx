import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import TemplateCard from '../components/TemplateCard'

const API = 'http://localhost:5000/api'

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchFavorites()
  }, [])

  async function fetchFavorites() {
    try {
      const res = await axios.get(`${API}/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setFavorites(res.data)
    } catch (err) {
      console.log('error getting favorites', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleFavoriteClick(templateId) {
    try {
      await axios.post(
        `${API}/favorites/${templateId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // remove it from the list since we unfavorited it
      setFavorites(favorites.filter((f) => f.id !== templateId))
    } catch (err) {
      console.log('error toggling favorite', err)
      alert('Something went wrong')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Loading favorites...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">My Favorites</h1>
        <p className="text-gray-500 text-sm">Templates you've saved</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">♡</p>
          <p className="text-gray-500 mb-2">No favorites yet</p>
          <Link to="/templates" className="text-indigo-600 text-sm hover:underline">
            Browse templates to get started
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isFavorited={true}
              onFavoriteClick={handleFavoriteClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
