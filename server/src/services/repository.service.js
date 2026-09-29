    import path from "path";

    import { scanDirectory } from "../lib/filesystem.js";
    import {
    getRepositoryRoot,
    getCurrentBranch,
    getHeadCommit,
    } from "../lib/git.js";

    export async function getRepositorySnapshot(repositoryPath) {
    const absolutePath = path.resolve(repositoryPath);

    const files = await scanDirectory(absolutePath);

    const repositoryRoot = await getRepositoryRoot(absolutePath);
    const currentBranch = await getCurrentBranch(absolutePath);
    const headCommit = await getHeadCommit(absolutePath);

    const fileCount = files.filter(
        (item) => item.type === "file"
    ).length;

    const directoryCount = files.filter(
        (item) => item.type === "directory"
    ).length;

    return {
        root: repositoryRoot,
        branch: currentBranch,
        head: headCommit,
        files,
        fileCount,
        directoryCount,
    };
    }