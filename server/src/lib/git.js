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