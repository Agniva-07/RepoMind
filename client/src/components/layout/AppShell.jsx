import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './AppShell.css';

/**
 * AppShell — persistent application frame.
 * Renders Sidebar + (Topbar + page content).
 * All authenticated/main app routes are nested inside this.
 *
 * @param {object} props
 * @param {string} props.title - Page title shown in Topbar
 * @param {string} [props.subtitle] - Optional subtitle
 */
export default function AppShell({ title, subtitle }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__main">
        <Topbar title={title} subtitle={subtitle} />
        <div className="app-shell__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
