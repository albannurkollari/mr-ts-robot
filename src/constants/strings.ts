// Movement
export const Left = "L";
export const Right = "R";
export const Forward = "F";
export const Vänster = "V";
export const Höger = "H";
export const Gå = "G";

// Labels
export const ENGLISH = "English";
export const SWEDISH = "Swedish";
export const BOTH = "Both";
export const LANG_EN = "en";
export const LANG_SV = "sv";
export const LANG_BOTH = "both";
export const ENGLISH_CMD = `${Left}, ${Right}, ${Forward}`;
export const SWEDISH_CMD = `${Vänster}, ${Höger}, ${Gå}`;
export const BOTH_CMD = `${ENGLISH_CMD} and/or ${SWEDISH_CMD}`;
export const EN_CMD_DESC = `Use ${ENGLISH} commands (${ENGLISH_CMD})`;
export const SV_CMD_DESC = `Use ${SWEDISH} commands (${SWEDISH_CMD})`;
export const BOTH_CMD_DESC = `Use ${LANG_BOTH} ${BOTH_CMD} commands`;

export const COMMAND_MAP = {
  [ENGLISH]: {
    short: LANG_EN,
    description: EN_CMD_DESC,
  },
  [SWEDISH]: {
    short: LANG_SV,
    description: SV_CMD_DESC,
  },
  [BOTH]: {
    short: LANG_BOTH,
    description: BOTH_CMD_DESC,
  },
} as const;
