/**
 * Mock search results for the Search page UI.
 * Replace with real search index results during Phase 1.
 */
export const mockSearchResults = [
  {
    id: 'sr-1',
    type: 'function',
    name: 'authMiddleware',
    filePath: 'src/middleware/auth.js',
    line: 12,
    snippet: `module.exports = function authMiddleware(req, res, next) {`,
  },
  {
    id: 'sr-2',
    type: 'class',
    name: 'APIClient',
    filePath: 'src/services/api.js',
    line: 4,
    snippet: `class APIClient {`,
  },
  {
    id: 'sr-3',
    type: 'function',
    name: 'fetchUser',
    filePath: 'src/services/api.js',
    line: 28,
    snippet: `async fetchUser(userId) {`,
  },
  {
    id: 'sr-4',
    type: 'import',
    name: 'import jwt from jsonwebtoken',
    filePath: 'src/middleware/auth.js',
    line: 1,
    snippet: `const jwt = require('jsonwebtoken');`,
  },
  {
    id: 'sr-5',
    type: 'file',
    name: 'Dashboard.jsx',
    filePath: 'src/pages/Dashboard.jsx',
    line: 1,
    snippet: `// Dashboard page — main analytics overview`,
  },
  {
    id: 'sr-6',
    type: 'export',
    name: 'default Dashboard',
    filePath: 'src/pages/Dashboard.jsx',
    line: 42,
    snippet: `export default function Dashboard() {`,
  },
];
