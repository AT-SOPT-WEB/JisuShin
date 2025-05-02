// src/components/GitHubSearch/RecentSearches.jsx
function RecentSearches({ searches, onRemove, onSelect }) {
  if (searches.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">최근검색어</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <div
            key={index}
            className="bg-blue-100 rounded-full px-3 py-1 flex items-center"
          >
            <span
              className="cursor-pointer mr-2"
              onClick={() => onSelect(search)}
            >
              {search}
            </span>
            <button
              onClick={() => onRemove(search)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;