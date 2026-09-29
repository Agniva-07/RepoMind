# Server Codebase Summary

This document contains a comprehensive overview of the `server` folder in "Project Brain", including the directory structure and the complete contents of all relevant source code files. This is intended to be used as context for AI assistance.

## Directory Structure

```text
server/
├── package.json
├── src/
│   ├── .env
│   ├── app.js
│   ├── server.js
│   ├── lib/
│   │   ├── filesystem.js
│   │   └── git.js
│   ├── routes/
│   │   ├── health.routes.js
│   │   └── repository.routes.js
│   └── services/
│       └── repository.service.js
```

## File Contents

### `server/package.json`
Configuration and dependencies for the Node.js/Express server.
```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node --watch src/server.js",
    "start": "node src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^18.0.3",
    "express": "^5.2.1"
  }
}
```

### `server/src/.env`
Environment variables file (currently empty template).
```env

```

### `server/src/server.js`
Entry point for starting the server.
```javascript
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Project Brain server running on port ${PORT}`);
});
```

### `server/src/app.js`
Express application setup, middleware configuration (including CORS), and route registration.
```javascript
import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes.js";
import repositoryRouter from "./routes/repository.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/repository", repositoryRouter);

export default app;
```

### `server/src/routes/health.routes.js`
Simple health check endpoint.
```javascript
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Project Brain API is running",
  });
});

export default router;
```

### `server/src/routes/repository.routes.js`
API routes for repository operations. Handles the `GET /api/repository` request, input validation, and maps service errors to proper HTTP status codes.
```javascript
import express from "express";
import path from "path";
import { getRepositorySnapshot } from "../services/repository.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const repositoryPath = req.query.path;

    if (!repositoryPath) {
      return res.status(400).json({
        success: false,
        error: "Repository path is required.",
      });
    }

    const absolutePath = path.resolve(repositoryPath);

    const repository = await getRepositorySnapshot(absolutePath);

    return res.status(200).json({
      success: true,
      data: repository,
    });
  } catch (error) {
    console.error("Repository route error:", error);

    if (error.message === "NOT_A_DIRECTORY") {
      return res.status(400).json({
        success: false,
        error: "Path is not a directory.",
      });
    }

    if (error.message === "NOT_FOUND") {
      return res.status(404).json({
        success: false,
        error: "Repository path does not exist.",
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze repository.",
    });
  }
});

export default router;
```

### `server/src/services/repository.service.js`
Business logic orchestrator for repository analysis. Uses the filesystem and git libraries to build a complete snapshot of the repository.
```javascript
import fs from "fs/promises";
import path from "path";

import { scanDirectory } from "../lib/filesystem.js";
import {
  getRepositoryRoot,
  getCurrentBranch,
  getHeadCommit,
} from "../lib/git.js";

export async function getRepositorySnapshot(repositoryPath) {
  const absolutePath = path.resolve(repositoryPath);

  try {
    const stats = await fs.stat(absolutePath);
    if (!stats.isDirectory()) {
      throw new Error("NOT_A_DIRECTORY");
    }
  } catch (error) {
    if (error.message === "NOT_A_DIRECTORY") {
      throw error;
    }
    throw new Error("NOT_FOUND");
  }

  const files = await scanDirectory(absolutePath);

  const repositoryRoot = await getRepositoryRoot(absolutePath);
  const currentBranch = await getCurrentBranch(absolutePath);
  const headCommit = await getHeadCommit(absolutePath);

  const fileCount = files.filter((item) => item.type === "file").length;
  const directoryCount = files.filter((item) => item.type === "directory").length;

  return {
    root: repositoryRoot,
    branch: currentBranch,
    head: headCommit,
    gitAvailable: repositoryRoot !== null,
    files,
    fileCount,
    directoryCount,
  };
}
```

### `server/src/lib/git.js`
Utility module for safely executing Git commands via `child_process.execFile`. Captures errors safely and returns null if a directory is not a Git repository or has no commits.
```javascript
import { execFile } from "child_process";
import { promisify } from "util";

const execGit = promisify(execFile);

export async function runGitCommand(args, cwd) {
  try {
    const { stdout } = await execGit("git", args, {
      cwd,
    });
    return stdout.trim();
  } catch (error) {
    return null;
  }
}

export async function getRepositoryRoot(cwd) {
  return runGitCommand(
    ["rev-parse", "--show-toplevel"],
    cwd
  );
}

export async function getCurrentBranch(cwd) {
  return runGitCommand(
    ["branch", "--show-current"],
    cwd
  );
}

export async function getHeadCommit(cwd) {
  return runGitCommand(
    ["rev-parse", "HEAD"],
    cwd
  );
}
```

### `server/src/lib/filesystem.js`
Utility module for recursively scanning directories and returning basic file metadata. Configured to ignore common generated/noise directories like `node_modules` and `.git`.
```javascript
import fs from "fs/promises";
import path from "path";

const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
]);

const IGNORED_FILES = new Set([
  ".DS_Store",
]);

export async function scanDirectory(directoryPath, relativePath = "") {
  const entries = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });

  const results = [];

  for (const entry of entries) {
    if (IGNORED_FILES.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(directoryPath, entry.name);
    const entryRelativePath = path
      .join(relativePath, entry.name)
      .replaceAll(path.sep, "/");

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) {
        continue;
      }

      results.push({
        name: entry.name,
        path: entryRelativePath,
        type: "directory",
      });

      const children = await scanDirectory(
        fullPath,
        entryRelativePath
      );

      results.push(...children);
    } else {
      const stats = await fs.stat(fullPath);

      results.push({
        name: entry.name,
        path: entryRelativePath,
        type: "file",
        extension: path.extname(entry.name),
        size: stats.size,
      });
    }
  }

  return results;
}
```
