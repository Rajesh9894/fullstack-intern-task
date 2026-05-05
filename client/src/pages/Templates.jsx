// pages/Templates.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import TemplateCard from '../components/TemplateCard';

const CATEGORIES = ['All', 'Landing Page', 'E-Commerce', 'Portfolio', 'Dashboard', 'Blog', 'Business'];

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await api.get('/templates');
      setTemplates(res.data);
    } catch (err) {
      setError('Failed to load templates. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Filter on the frontend (we also support backend filtering via query params)
  const filtered = templates.filter((t) => {
    const matchesCategory = category === 'All' || t.category === category;
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFavoriteToggle = (templateId, isFav) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === templateId ? { ...t, is_favorited: isFav ? 1 : 0 } : t))
    );
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-gray-900">Browse Templates</h1>
        <p className="text-gray-500 mt-2">Discover and save your favorite design templates</p>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            className="input pl-9"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category dropdown */}
        <select
          className="input sm:w-48 bg-white cursor-pointer"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-7">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === c
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-gray-400 mb-5">
          Showing <span className="font-medium text-gray-700">{filtered.length}</span> templates
          {search && ` for "${search}"`}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-48 w-full" />
              <div className="p-4 space-y-2">
                <div className="bg-gray-200 h-4 rounded w-3/4" />
                <div className="bg-gray-200 h-3 rounded w-full" />
                <div className="bg-gray-200 h-3 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Template Grid */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-medium text-gray-600">No templates found</p>
              <p className="text-sm mt-1">Try a different search term or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
