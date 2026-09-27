/**
 * Mock Git commit data.
 * Replace with real Git log output during Phase 1.
 */
export const mockCommits = [
  {
    hash: 'a3f8c21',
    message: 'feat: add user authentication middleware',
    author: 'Alex Kim',
    authorInitials: 'AK',
    date: '2026-09-23T16:42:00Z',
    relativeDate: '8 hours ago',
    additions: 142,
    deletions: 12,
    changedFiles: ['src/middleware/auth.js', 'src/routes/user.js', 'tests/auth.test.js'],
    branch: 'main',
  },
  {
    hash: 'b1e2d44',
    message: 'refactor: extract API client into separate service',
    author: 'Sam Lee',
    authorInitials: 'SL',
    date: '2026-09-22T14:10:00Z',
    relativeDate: 'yesterday',
    additions: 87,
    deletions: 210,
    changedFiles: ['src/services/api.js', 'src/components/Dashboard.jsx'],
    branch: 'main',
  },
  {
    hash: 'c9d7f03',
    message: 'fix: resolve race condition in data fetching',
    author: 'Jordan Patel',
    authorInitials: 'JP',
    date: '2026-09-21T09:55:00Z',
    relativeDate: '2 days ago',
    additions: 23,
    deletions: 8,
    changedFiles: ['src/hooks/useData.js'],
    branch: 'main',
  },
  {
    hash: 'd2a4b17',
    message: 'chore: upgrade dependencies to latest stable',
    author: 'Alex Kim',
    authorInitials: 'AK',
    date: '2026-09-20T11:20:00Z',
    relativeDate: '3 days ago',
    additions: 5,
    deletions: 5,
    changedFiles: ['package.json', 'package-lock.json'],
    branch: 'main',
  },
  {
    hash: 'e5c8a92',
    message: 'feat: implement repository tree explorer component',
    author: 'Sam Lee',
    authorInitials: 'SL',
    date: '2026-09-19T15:00:00Z',
    relativeDate: '4 days ago',
    additions: 316,
    deletions: 0,
    changedFiles: ['src/components/RepositoryTree.jsx', 'src/styles/tree.css'],
    branch: 'main',
  },
];

export const MOCK_DIFF = `diff --git a/src/middleware/auth.js b/src/middleware/auth.js
index 4f2a1c3..9b8d7e2 100644
--- a/src/middleware/auth.js
+++ b/src/middleware/auth.js
@@ -12,8 +12,18 @@ const jwt = require('jsonwebtoken');
 
 module.exports = function authMiddleware(req, res, next) {
   const token = req.headers['authorization']?.split(' ')[1];
-  if (!token) return res.status(401).json({ error: 'Unauthorized' });
+  if (!token) {
+    return res.status(401).json({
+      error: 'Unauthorized',
+      message: 'A valid Bearer token is required',
+    });
+  }
 
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.user = decoded;
+    req.user.isAdmin = decoded.role === 'admin';
     next();
   } catch (err) {
-    res.status(403).json({ error: 'Invalid token' });
+    res.status(403).json({
+      error: 'Forbidden',
+      message: 'Token is invalid or expired',
+    });
   }
 };
`;
