import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Repositories from './pages/Repositories';
import RepositoryOverview from './pages/RepositoryOverview';
import Search from './pages/Search';
import DependencyGraph from './pages/DependencyGraph';
import GitIntelligence from './pages/GitIntelligence';
import ImpactAnalysis from './pages/ImpactAnalysis';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

/*
 * Route → page title mapping for the Topbar.
 * AppShell receives title/subtitle props from each route wrapper.
 */
function DashboardShell()    { return <AppShell title="Dashboard" subtitle="Overview" />; }
function ReposShell()        { return <AppShell title="Repositories" />; }
function RepoDetailShell()   { return <AppShell title="Repository" />; }
function SearchShell()       { return <AppShell title="Search" />; }
function GraphShell()        { return <AppShell title="Dependency Graph" />; }
function GitShell()          { return <AppShell title="Git Intelligence" />; }
function ImpactShell()       { return <AppShell title="Impact Analysis" />; }
function SettingsShell()     { return <AppShell title="Settings" />; }

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {/* Main app routes — all wrapped in AppShell */}
          <Route element={<DashboardShell />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route element={<ReposShell />}>
            <Route path="/repositories" element={<Repositories />} />
          </Route>

          <Route element={<RepoDetailShell />}>
            <Route path="/repositories/:id" element={<RepositoryOverview />} />
          </Route>

          <Route element={<SearchShell />}>
            <Route path="/search" element={<Search />} />
          </Route>

          <Route element={<GraphShell />}>
            <Route path="/graph" element={<DependencyGraph />} />
          </Route>

          <Route element={<GitShell />}>
            <Route path="/git" element={<GitIntelligence />} />
          </Route>

          <Route element={<ImpactShell />}>
            <Route path="/impact" element={<ImpactAnalysis />} />
          </Route>

          <Route element={<SettingsShell />}>
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* 404 — standalone, no AppShell */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
