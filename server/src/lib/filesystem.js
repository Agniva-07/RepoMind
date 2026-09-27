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