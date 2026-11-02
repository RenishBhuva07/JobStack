import './FilterBar.css';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  searchQuery: string;
  onCategoryChange: (cat: string) => void;
  onSearchChange: (q: string) => void;
  resultCount: number;
}

export default function FilterBar({
  categories,
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div id="categories" className="filterbar">
      <div className="container">
        {/* Search */}
        <div className="filterbar__search-wrap" id="search-wrap">
          <div className="filterbar__search-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            id="search-input"
            type="text"
            className="filterbar__search"
            placeholder="Search tools, platforms, categories..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search tools"
          />
          {searchQuery && (
            <button
              className="filterbar__clear"
              id="search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="filterbar__categories" id="category-filters" role="tablist" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={`filterbar__cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
              {activeCategory === cat && <span className="filterbar__cat-dot" />}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="filterbar__meta" id="results-meta">
          <span className="filterbar__count">
            Showing <strong>{resultCount}</strong> tool{resultCount !== 1 ? 's' : ''}
            {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
            {searchQuery ? ` for "${searchQuery}"` : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
