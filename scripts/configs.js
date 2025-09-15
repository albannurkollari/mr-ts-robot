import { readConfigFile, sys } from "typescript";

export const TS_CONFIG_PATH = "tsconfig.json";

export function getTSConfig() {
  const ts = readConfigFile(TS_CONFIG_PATH, sys.readFile);

  if (ts.error) {
    console.error("Failed to read tsconfig:", ts.error.messageText);
    log("Make sure to run the script from the project root.");
    process.exit(1);
  }

  return ts;
}
