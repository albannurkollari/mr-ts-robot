// If origo (0,0) is bottom-left, use Cartesian coordinates
// If origo (0,0) is top-left, use Matrix coordinates
export const DELTAS = {
  en: {
    cartesian: {
      N: [0, 1], // up
      E: [1, 0], // right
      S: [0, -1], // down
      W: [-1, 0], // left
    },
    matrix: {
      N: [0, -1], // up = decreasing y
      E: [1, 0],
      S: [0, 1], // down = increasing y
      W: [-1, 0],
    },
  },
  sv: {
    cartesian: {
      N: [0, 1], // up
      Ö: [1, 0], // right
      S: [0, -1], // down
      V: [-1, 0], // left
    },
    matrix: {
      N: [0, -1], // up = decreasing y
      Ö: [1, 0],
      S: [0, 1], // down = increasing y
      V: [-1, 0],
    },
  },
} as const;

// Moving to the right, increase the index + 1, e.g. COMPASS.at(lastIndex + 1)
// Moving to the left, decrease the index - 1, e.g. COMPASS.at(lastIndex - 1)
export const COMPASS = {
  en: ["N", "E", "S", "W"],
  sv: ["N", "Ö", "S", "V"],
} as const;

export const COMPASS_TRANSLATION = {
  en: { N: "N", Ö: "E", S: "S", V: "W", L: "H", R: "V", F: "G" },
  sv: { N: "N", E: "Ö", S: "S", W: "V", H: "L", V: "R", G: "F" },
} as const;
