import {
  getRepositoryRoot,
  getCurrentBranch,
  getHeadCommit,
} from "./git.js";

const cwd = ".";

console.log("Repository root:", await getRepositoryRoot(cwd));

console.log("Current branch:", await getCurrentBranch(cwd));

console.log("HEAD commit:", await getHeadCommit(cwd));