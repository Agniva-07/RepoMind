import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const NAV_ITEMS = [
  {
    to: '/',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    to: '/repositories',
    label: 'Repositories',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M1.5 5.5h13" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 2.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5.5 9l1.5 1.5L5.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: '/search',
    label: 'Search',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: '/graph',
    label: 'Dependency Graph',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="3" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="13" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 4.5v3M8 7.5L3 10.5M8 7.5L13 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: '/git',
    label: 'Git Intelligence',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="4" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="4" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 5.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 5.5C4 5.5 4 3.5 6 3.5h2.5a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: '/impact',
    label: 'Impact Analysis',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5v5M8 1.5L5.5 4M8 1.5L10.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 14c0-1.5 1-2.5 2.5-2.5h5c1.5 0 2.5 1 2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.9 2.9l1.1 1.1M12 12l1.1 1.1M2.9 13.1l1.1-1.1M12 4l1.1-1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar" aria-label="Main navigation">
      {/* Brand */}
      <div className="sidebar__brand">
        <div className="sidebar__logo" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="var(--color-soft-gold)" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="4" fill="var(--color-soft-gold)" opacity="0.2"/>
            <circle cx="12" cy="12" r="2" fill="var(--color-soft-gold)"/>
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="var(--color-soft-gold)" strokeWidth="1.2" opacity="0.6"/>
          </svg>
        </div>
        <div className="sidebar__brand-text">
          <span className="sidebar__brand-name">Project Brain</span>
          <span className="sidebar__brand-sub">Codebase Intelligence</span>
        </div>
      </div>

      <div className="sidebar__divider" />

      {/* Navigation */}
      <nav className="sidebar__nav" aria-label="Primary navigation">
        <ul className="sidebar__nav-list" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`
                }
                aria-current={
                  location.pathname === item.to ||
                  (item.to !== '/' && location.pathname.startsWith(item.to))
                    ? 'page'
                    : undefined
                }
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span className="sidebar__nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        <div className="sidebar__version">v0.1.0 — Stage 0</div>
      </div>
    </aside>
  );
}
