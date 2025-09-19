// Two axis conventions:
// - cartesianNormal: Y+ is upward (math-style Cartesian)
// - cartesianFlipped: Y+ is downward (grid/screen-style)
// Default should be cartesianFlipped, since assignment examples assume that.
export const DELTAS = {
  en: {
    cartesianNormal: {
      N: [0, 1], // up
      E: [1, 0], // right
      S: [0, -1], // down
      W: [-1, 0], // left
    },
    cartesianFlipped: {
      N: [0, -1], // up = decreasing y
      E: [1, 0], // right
      S: [0, 1], // down = increasing y
      W: [-1, 0], // left
    },
  },
  sv: {
    cartesianNormal: {
      N: [0, 1], // upp
      Ö: [1, 0], // höger
      S: [0, -1], // ner
      V: [-1, 0], // vänster
    },
    cartesianFlipped: {
      N: [0, -1], // upp = minskar y
      Ö: [1, 0], // höger
      S: [0, 1], // ner = ökar y
      V: [-1, 0], // vänster
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
