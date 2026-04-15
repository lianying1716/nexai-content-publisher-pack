#!/usr/bin/env node
"use strict";

const fs = require("fs/promises");
const os = require("os");
const path = require("path");

function parseArgs(argv) {
  const result = {
    copy: false,
    codexHome: ""
  };
  for (let index = 0; index < argv.length; index += 1) {
    const part = argv[index];
    if (part === "--copy") {
      result.copy = true;
      continue;
    }
    if (part === "--codex-home" && argv[index + 1]) {
      result.codexHome = String(argv[index + 1]);
      index += 1;
    }
  }
  return result;
}

async function pathExists(targetPath) {
  try {
    await fs.lstat(targetPath);
    return true;
  } catch (error) {
    return false;
  }
}

async function removeTargetIfSafe(targetPath, sourcePath) {
  if (!(await pathExists(targetPath))) {
    return;
  }
  const stat = await fs.lstat(targetPath);
  if (stat.isSymbolicLink()) {
    const linkedPath = await fs.readlink(targetPath);
    const resolvedLinkedPath = path.resolve(path.dirname(targetPath), linkedPath);
    if (resolvedLinkedPath === sourcePath) {
      await fs.unlink(targetPath);
      return;
    }
  }
  throw new Error(`Target already exists and is not this pack's skill link: ${targetPath}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot = path.resolve(__dirname, "..");
  const sourcePath = path.join(repoRoot, "skills", "nexai-content-publisher");
  const codexHome = args.codexHome
    ? path.resolve(args.codexHome)
    : process.env.CODEX_HOME
      ? path.resolve(process.env.CODEX_HOME)
      : path.join(os.homedir(), ".codex");
  const skillsDir = path.join(codexHome, "skills");
  const targetPath = path.join(skillsDir, "nexai-content-publisher");

  await fs.mkdir(skillsDir, { recursive: true });
  await removeTargetIfSafe(targetPath, sourcePath);

  if (args.copy) {
    await fs.cp(sourcePath, targetPath, { recursive: true });
    process.stdout.write(`Installed by copy: ${targetPath}\n`);
    return;
  }

  const linkType = process.platform === "win32" ? "junction" : "dir";
  await fs.symlink(sourcePath, targetPath, linkType);
  process.stdout.write(`Installed by symlink: ${targetPath}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message || String(error)}\n`);
  process.exit(1);
});
