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