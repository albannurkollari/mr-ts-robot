export const ENGLISH = "English";
export const SWEDISH = "Swedish";
export const BOTH = "Both";
export const LANG_EN = "en";
export const LANG_SV = "sv";
export const LANG_BOTH = "both";
export const CMD_EN = "Use English commands (L, R, F)";
export const CMD_SV = "Use Swedish commands (V, H, G)";
export const CMD_BOTH = "Use both English and Swedish commands";

export const COMMAND_MAP = {
  [ENGLISH]: {
    short: LANG_EN,
    description: CMD_EN,
  },
  [SWEDISH]: {
    short: LANG_SV,
    description: CMD_SV,
  },
  [BOTH]: {
    short: LANG_BOTH,
    description: CMD_BOTH,
  },
} as const;
