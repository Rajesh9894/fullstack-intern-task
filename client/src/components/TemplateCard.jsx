// components/TemplateCard.jsx
import api from '../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TemplateCard({ template, onFavoriteToggle }) {
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(!!template.is_favorited);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleFavorite = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`/favorites/${template.id}`);
      setIsFav(res.data.is_favorited);
      if (onFavoriteToggle) onFavoriteToggle(template.id, res.data.is_favorited);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card animate-fadeInUp overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={template.thumbnail_url}
          alt={template.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x250/e0e9ff/4f6ef7?text=${encodeURIComponent(template.name)}`;
          }}
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 px-2.5 py-1 rounded-full border border-gray-200">
          {template.category}
        </span>
        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          disabled={loading}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            isFav
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-400 hover:scale-110'
          }`}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {loading ? (
            <span className="animate-spin text-xs">⟳</span>
          ) : (
            <span className="text-sm">{isFav ? '❤️' : '🤍'}</span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-gray-900 mb-1 leading-snug">
          {template.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {template.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleFavorite}
            disabled={loading}
            className={`text-sm font-medium transition-colors ${
              isFav ? 'text-red-500 hover:text-red-600' : 'text-brand-500 hover:text-brand-700'
            }`}
          >
            {isFav ? '♥ Saved' : '♡ Save'}
          </button>
          <span className="text-xs text-gray-400">#{template.id}</span>
        </div>
      </div>
    </div>
  );
}
