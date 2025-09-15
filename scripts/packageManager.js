/**
 * Detects the package manager used to run the current script.
 *
 * @return {"npm" | "pnpm" | "yarn" | "bun"} The detected package manager.
 */
export function detectPackageManager() {
  const ua = process.env.npm_config_user_agent || "";

  if (/^pnpm/i.test(ua)) return "pnpm";
  if (/^yarn/i.test(ua)) return "yarn";
  if (/^bun/i.test(ua)) return "bun";

  return "npm";
}
