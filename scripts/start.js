#!/usr/bin/env node
/*
  Dev note:
  - This script is meant to be run from the project root
  - It supports running TS files directly with Node 24+ or
    compiling with tsc for older versions
  - It reads tsconfig.node.json to determine rootDir and outDir
  - It accepts an optional entrypoint argument, defaulting to src/index.ts
  - It passes any additional arguments to the Node process

  TODO: Remove this script once Node 24+ is the baseline
*/

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";
import { getTSConfig } from "./configs.js";
import { detectPackageManager } from "./packageManager.js";

const pckMng = detectPackageManager();
const isInDebugMode = process.execArgv.some((arg) =>
  arg.startsWith("--inspect"),
);
const log = isInDebugMode ? console.log : () => {};
const opts = { stdio: "inherit" };
const ts = getTSConfig();

// Parse Node version
const [major] = process.versions.node.split(".").map(Number);
const hasNativeTSSupport = major >= 24;

// Entrypoints
const compilerOptions = ts.config.compilerOptions || {};
const rootDir = compilerOptions.rootDir || "src";
const outDir = compilerOptions.outDir || "dist";

// Detect entrypoint: first arg or default
const [possibleEntry, ...restArgs] = argv.slice(2);
const tsEntry = path.resolve(possibleEntry || `${rootDir}/index.ts`);
const jsEntry = (() => {
  // Compute matching dist path
  let relPath = path.relative(rootDir, tsEntry); // e.g. "robot/demo.ts"

  if (!relPath || relPath.startsWith("..")) {
    // If entry is outside rootDir, just fall back
    relPath = possibleEntry || "index.ts";
  }

  return path.resolve(path.join(outDir, relPath.replace(/\.ts$/, ".js")));
})();
const entry = hasNativeTSSupport ? tsEntry : jsEntry;

if (hasNativeTSSupport) {
  log(`Detected Node v${process.versions.node} → running TypeScript natively`);
} else {
  log(
    `Detected Node v${process.versions.node} → compiling with tsc then running`,
  );

  if (!existsSync(jsEntry)) {
    log("No build found → running tsc first...");

    let result = spawnSync(pckMng, ["run", "clean"], opts);

    if (result.status !== 0) process.exit(result.status);

    result = spawnSync(pckMng, ["run", "build"], opts);

    if (result.status !== 0) process.exit(result.status);
  }
}

spawnSync("node", ["--conditions", "dev", entry, ...restArgs], opts);
