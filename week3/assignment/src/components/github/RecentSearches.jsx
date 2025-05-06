import Button from '../common/Button';

function RecentSearches({ searches, onRemove, onSelect }) {
  if (searches.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">최근검색어</h3>
      <div 
        className="flex flex-wrap gap-2"
        role="list"
        aria-labelledby="recent-searches-title"
      >
        {searches.map((search, index) => (
          <div
            key={index}
            className="bg-blue-100 rounded-full px-3 py-1 flex items-center"
            role="listitem"
          >
            <span
              className="cursor-pointer mr-2"
              onClick={() => onSelect(search)}
              role="button"
              tabIndex="0"
              aria-label={`${search} 검색`}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(search)}
            >
              {search}
            </span>
            <Button
              variant="close"
              onClick={() => onRemove(search)}
              className="w-5 h-5 text-sm text-gray-500 hover:text-gray-700"
              aria-label="Remove search"
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;