/**
 * Mock repository data.
 * Replace with real API calls during Phase 1.
 */
export const mockRepositories = [
  {
    id: 'repo-1',
    name: 'my-react-app',
    path: '/home/dev/projects/my-react-app',
    language: 'JavaScript',
    languages: ['JavaScript', 'CSS', 'HTML'],
    fileCount: 142,
    symbolCount: 1240,
    dependencyCount: 34,
    lastAnalyzed: '2026-09-23T18:30:00Z',
    status: 'analyzed', // 'analyzed' | 'pending' | 'error' | 'not-analyzed'
    branch: 'main',
    commitCount: 87,
    size: '4.2 MB',
  },
  {
    id: 'repo-2',
    name: 'api-server',
    path: '/home/dev/projects/api-server',
    language: 'Node.js',
    languages: ['JavaScript', 'JSON'],
    fileCount: 58,
    symbolCount: 430,
    dependencyCount: 18,
    lastAnalyzed: '2026-09-22T11:00:00Z',
    status: 'analyzed',
    branch: 'main',
    commitCount: 212,
    size: '1.8 MB',
  },
  {
    id: 'repo-3',
    name: 'legacy-monolith',
    path: '/home/dev/projects/legacy-monolith',
    language: 'Python',
    languages: ['Python', 'SQL', 'Shell'],
    fileCount: 0,
    symbolCount: 0,
    dependencyCount: 0,
    lastAnalyzed: null,
    status: 'not-analyzed',
    branch: null,
    commitCount: 0,
    size: 'Unknown',
  },
];

export const MOCK_FILE_TREE = [
  {
    name: 'src',
    type: 'dir',
    children: [
      {
        name: 'components',
        type: 'dir',
        children: [
          { name: 'Header.jsx', type: 'file', language: 'jsx' },
          { name: 'Sidebar.jsx', type: 'file', language: 'jsx' },
          { name: 'App.jsx', type: 'file', language: 'jsx' },
        ],
      },
      {
        name: 'pages',
        type: 'dir',
        children: [
          { name: 'Dashboard.jsx', type: 'file', language: 'jsx' },
          { name: 'Profile.jsx', type: 'file', language: 'jsx' },
        ],
      },
      {
        name: 'services',
        type: 'dir',
        children: [
          { name: 'auth.js', type: 'file', language: 'js' },
          { name: 'api.js', type: 'file', language: 'js' },
        ],
      },
      { name: 'index.js', type: 'file', language: 'js' },
    ],
  },
  { name: 'package.json', type: 'file', language: 'json' },
  { name: 'README.md', type: 'file', language: 'md' },
  { name: '.gitignore', type: 'file', language: 'text' },
];

export const MOCK_CODE = `import { useState, useEffect } from 'react';
import { fetchUser } from '../services/api';

/**
 * Dashboard page component.
 * Renders overview statistics and recent activity.
 */
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    repos: 0,
    files: 0,
    symbols: 0,
  });

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  return (
    <main className="dashboard">
      <h1>Welcome back, {user?.name ?? 'Developer'}</h1>
      <div className="stats-grid">
        <StatCard label="Repositories" value={stats.repos} />
        <StatCard label="Files" value={stats.files} />
        <StatCard label="Symbols" value={stats.symbols} />
      </div>
    </main>
  );
}
`;
