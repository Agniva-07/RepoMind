import { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import './Search.css';

const FILTERS = ['All', 'Files', 'Functions', 'Classes', 'Imports', 'Exports'];

const TYPE_VARIANT = {
  file: 'neutral',
  function: 'info',
  class: 'blue',
  import: 'neutral',
  export: 'neutral',
};

export default function Search() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [searchResults, setSearchResults] = useState([]); // Will hold real API results

  const filtered = query
    ? searchResults.filter((r) => {
        const matchFilter =
          filter === 'All' ||
          r.type === filter.toLowerCase().replace('s', '');
        return matchFilter;
      })
    : [];

  return (
    <div className="search-page">
      {/* Search input */}
      <div className="search-page__hero">
        <label htmlFor="main-search" className="sr-only">Search codebase</label>
        <div className="search-page__input-wrapper">
          <svg className="search-page__icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            id="main-search"
            className="search-page__input"
            type="search"
            placeholder="Search files, functions, classes, imports..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
          {query && (
            <button
              className="search-page__clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="search-page__filters" role="group" aria-label="Filter results">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`search-page__filter${filter === f ? ' search-page__filter--active' : ''}`}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Results */}
      {!query ? (
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M31 31l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M15 20h10M20 15v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }
          title="Search Across Your Codebase"
          description="Find files, functions, classes, imports, exports and more. Import a repository to start searching."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M31 31l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }
          title="No results found"
          description={`No matches for "${query}" in ${filter.toLowerCase()}. Try a different query.`}
        />
      ) : (
        <div className="search-page__results">
          <p className="search-page__result-count">{filtered.length} results</p>
          {filtered.map((result) => (
            <Card key={result.id} className="search-result" padding="md" hoverable>
              <div className="search-result__header">
                <Badge variant={TYPE_VARIANT[result.type] || 'neutral'}>{result.type}</Badge>
                <h4 className="search-result__name">{result.name}</h4>
              </div>
              <div className="search-result__location">
                <span className="search-result__path text-mono">{result.filePath}</span>
                <span className="search-result__line text-mono">:{result.line}</span>
              </div>
              <pre className="search-result__snippet">
                <code>{result.snippet}</code>
              </pre>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
