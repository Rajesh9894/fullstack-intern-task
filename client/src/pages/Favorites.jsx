// pages/Favorites.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import TemplateCard from '../components/TemplateCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await api.get('/favorites');
      setFavorites(res.data);
    } catch (err) {
      setError('Failed to load favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // When user un-favorites from this page, remove it from the list
  const handleFavoriteToggle = (templateId, isFav) => {
    if (!isFav) {
      setFavorites((prev) => prev.filter((t) => t.id !== templateId));
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-gray-900">My Favorites</h1>
        <p className="text-gray-500 mt-2">
          Templates saved by <span className="font-medium text-gray-700">{user?.name}</span>
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-48 w-full" />
              <div className="p-4 space-y-2">
                <div className="bg-gray-200 h-4 rounded w-3/4" />
                <div className="bg-gray-200 h-3 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 text-sm">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && favorites.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-5"></div>
          <h2 className="text-xl font-display font-semibold text-gray-800 mb-2">No favorites yet</h2>
          <p className="text-gray-500 text-sm mb-6">
            Browse templates and click the heart icon to save them here
          </p>
          <Link to="/templates" className="btn-primary inline-block">
            Browse Templates
          </Link>
        </div>
      )}

      {/* Favorites grid */}
      {!loading && !error && favorites.length > 0 && (
        <>
          <p className="text-sm text-gray-400 mb-5">
            You have <span className="font-medium text-gray-700">{favorites.length}</span> saved template{favorites.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favorites.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
