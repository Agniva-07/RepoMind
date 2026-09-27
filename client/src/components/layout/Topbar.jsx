import { useNavigate } from 'react-router-dom';
import './Topbar.css';

export default function Topbar({ title, subtitle }) {
  const navigate = useNavigate();

  return (
    <header className="topbar" role="banner">
      {/* Page title */}
      <div className="topbar__title-group">
        <h1 className="topbar__title">{title}</h1>
        {subtitle && <span className="topbar__subtitle">{subtitle}</span>}
      </div>

      {/* Search */}
      <div className="topbar__search-wrapper">
        <label htmlFor="global-search" className="sr-only">
          Search repositories, files, symbols
        </label>
        <div className="topbar__search">
          <svg className="topbar__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8.5 8.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input
            id="global-search"
            type="search"
            className="topbar__search-input"
            placeholder="Search repositories, files, symbols..."
            autoComplete="off"
            spellCheck="false"
          />
          <span className="topbar__search-hint" aria-hidden="true">⌘K</span>
        </div>
      </div>

      {/* Right actions */}
      <div className="topbar__actions">
        {/* Avatar placeholder */}
        <button
          className="topbar__avatar"
          aria-label="User profile"
          title="User profile"
        >
          <span aria-hidden="true">D</span>
        </button>
      </div>
    </header>
  );
}
