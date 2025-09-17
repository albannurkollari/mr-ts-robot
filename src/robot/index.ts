import pc from "picocolors";
import { COMPASS, COMPASS_TRANSLATION, DELTAS } from "#constants";
import { cycleArrayItem, validateBounds } from "#utils";

enum Direction {
  Left = -1,
  Forward = 0,
  Right = 1,
}

type Movement = {
  value: Direction;
  label: string;
};

type Result<L extends Lang> = Position<L> & { toString: () => string };

const movementEn: Record<EnglishCommand, Movement> = {
  L: { value: Direction.Left, label: "Turn left" },
  F: { value: Direction.Forward, label: "Move forward" },
  R: { value: Direction.Right, label: "Turn right" },
};

const movementSv: Record<SwedishCommand, Movement> = {
  V: { value: Direction.Left, label: "Sväng vänster" },
  G: { value: Direction.Forward, label: "Gå framåt" },
  H: { value: Direction.Right, label: "Sväng höger" },
};

function compassFor<L extends Lang>(lang: L): readonly Compass<L>[] {
  if (lang === "English") return COMPASS.en as readonly Compass<L>[];
  if (lang === "Swedish") return COMPASS.sv as readonly Compass<L>[];

  throw new Error("Unsupported compass");
}

function positionToString<L extends Lang>({ x, y, dir }: Position<L>) {
  return `${x} ${y} ${dir}`;
}

export function move<S extends number, L extends Lang>(
  environment: Environment<S, L>,
  key: InputKey<L>,
  currentPosition: Position<L>,
): Result<L> {
  const { lang, size, type, yAxisInverted } = environment;
  const langCode = lang === "English" ? "en" : "sv";
  const outputLangCode =
    (environment.outputLang ?? lang) === "English" ? "en" : "sv";
  const deltas = yAxisInverted
    ? DELTAS[langCode].cartesian
    : DELTAS[langCode].matrix;
  const { value, label } =
    lang === "English"
      ? movementEn[key as EnglishCommand]
      : movementSv[key as SwedishCommand];
  const actionLabel = (() => {
    if (lang === "English" && outputLangCode === "sv") {
      const dirs = COMPASS_TRANSLATION.en;
      const flippedKey = dirs[key as keyof typeof dirs];
      const flippedLabel = movementSv[flippedKey as SwedishCommand].label;

      return `${flippedLabel} (${flippedKey})`;
    } else if (lang === "Swedish" && outputLangCode === "en") {
      const dirs = COMPASS_TRANSLATION.sv;
      const flippedKey = dirs[key as keyof typeof dirs];
      const flippedLabel = movementEn[flippedKey as EnglishCommand].label;

      return `${flippedLabel} (${flippedKey})`;
    }

    return `${label} (${key})`;
  })();

  if (value === undefined) {
    throw new Error(`Invalid command key: ${key}`);
  }

  const position = (() => {
    if (value === Direction.Left || value === Direction.Right) {
      const directions = compassFor(lang);
      const currIndex = directions.indexOf(currentPosition.dir);
      const dir = cycleArrayItem(directions, currIndex, value);

      return { ...currentPosition, dir };
    }

    // Move forward
    const dir = currentPosition.dir as keyof typeof deltas;
    const [dx, dy] = deltas[dir];
    const x = currentPosition.x + dx;
    const y = currentPosition.y + dy;

    if (validateBounds(type, size, x, y)) {
      return { x, y, dir } as Position<L>;
    }

    return currentPosition;
  })();

  // Due to the input !== output language possibility, we need to
  // create a new toString function that translates the direction
  // to the output language, if specified.
  const posToString = (() => {
    if (langCode !== outputLangCode) {
      const directions = COMPASS_TRANSLATION[outputLangCode];
      const dir = directions[
        position.dir as keyof typeof directions
      ] as Compass<L>;

      return positionToString.bind(null, { ...position, dir });
    }

    return positionToString.bind(null, position);
  })();

  const message = pc.blue(posToString());
  const action = pc.magenta(actionLabel);

  if (outputLangCode === "en") {
    console.log(`•  Action: ${action}`);
    console.log(`-> New position: ${message}`);
  } else {
    console.log(`•  Aktion: ${action}`);
    console.log(`-> Ny position: ${message}`);
  }

  return { ...position, toString: posToString };
}

export function moveInSeries({
  command,
  environment,
  startingPosition,
}: {
  command: string;
  environment: Environment<number, Lang>;
  startingPosition: Position<Lang>;
}) {
  const coords = [startingPosition];

  for (let i = 0; i < command.length; i++) {
    const key = command[i] as EnglishCommand | SwedishCommand;
    const currentPosition = coords[i];
    const position = move(environment, key, currentPosition);

    coords.push(position);
  }

  return coords;
}
