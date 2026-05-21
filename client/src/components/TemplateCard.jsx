// card component for showing a template
function TemplateCard({ template, isFavorited, onFavoriteClick }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={template.thumbnail_url}
        alt={template.name}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-800 text-sm">{template.name}</h3>
          <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full shrink-0">
            {template.category}
          </span>
        </div>

        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{template.description}</p>

        <button
          onClick={() => onFavoriteClick(template.id)}
          className={`w-full text-xs py-2 px-3 rounded border transition-colors ${
            isFavorited
              ? 'bg-pink-50 border-pink-200 text-pink-600 hover:bg-pink-100'
              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
          }`}
        >
          {isFavorited ? '♥ Saved to Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  )
}

export default TemplateCard
