export const isEnglishCommand = (key: unknown): key is EnglishCommand => {
  return key === "L" || key === "R" || key === "F";
};

export const isSwedishCommand = (key: unknown): key is SwedishCommand => {
  return key === "V" || key === "H" || key === "G";
};

export const command = {
  isEnglish: isEnglishCommand,
  isSwedish: isSwedishCommand,
};
