import { input, number, select } from "@inquirer/prompts";
import pc from "picocolors";
import {
  COMMAND_MAP,
  EN_CMD_DESC,
  ENGLISH_CMD,
  SV_CMD_DESC,
  SWEDISH_CMD,
} from "#constants";
import { validateBounds } from "./numbers.ts";
import { command } from "./predicates.ts";

type Choices<T> = Parameters<typeof select<T>>[0]["choices"];
type WhichLanguageOpts<C extends Lang> = {
  message?: string;
  choices: MinArrayOf<C, 2>;
  defaultChoice: C;
};

const defaultOptions: Required<WhichLanguageOpts<Lang>> = {
  message: "Which language?",
  choices: ["English", "Swedish"],
  defaultChoice: "Swedish",
};

const getOptionalMsg = (msg: string) => `${pc.italic("(optional)")} ${msg}`;

export const whichLanguage = <O extends Lang>(
  options: Partial<
    WhichLanguageOpts<O>
  > = defaultOptions as WhichLanguageOpts<O>,
) => {
  const message = options.message ?? defaultOptions.message;
  const defaultChoice = options.defaultChoice as O;
  const choices = options.choices as ReadonlyArray<O>;
  const selected = choices.includes(defaultChoice) ? defaultChoice : choices[0];
  const mappedChoices: Choices<O> = choices.map((item) => ({
    ...COMMAND_MAP[item as Lang],
    value: item,
    name: item,
  }));

  return select<O>({
    message,
    choices: mappedChoices,
    default: selected,
    loop: true,
  });
};

export const getMoveCommand = (lang: Lang, room: Room = "square_room") => {
  const defaultValue = room === "square_room" ? "HGHGGHGHG" : "RRFLFFLRF";
  const isCommandInvalid = (value: string) => {
    const predicate =
      lang === "English" ? command.isEnglish : command.isSwedish;

    return [...value].some((char) => !predicate(char));
  };

  const validate = (value: string) => {
    if (isCommandInvalid(value.trim())) {
      return lang === "English"
        ? `${EN_CMD_DESC} only.`
        : `${SV_CMD_DESC} only.`;
    }

    return true;
  };

  const commands = lang === "English" ? ENGLISH_CMD : SWEDISH_CMD;
  const message =
    `Insert command to move Mr TS Robot (use keys: ${commands}, then press Enter)` as const;

  return input({
    default: defaultValue,
    prefill: "editable",
    message,
    required: true,
    validate,
  });
};

export const setupEnvironment = async (lang: Lang = "Swedish") => {
  const env: Environment<number, Lang> = {
    lang,
    size: 5,
    type: "square_room",
    yAxisInverted: true,
  };

  const shouldAdjustEnvironment = await select<boolean>({
    message: getOptionalMsg("Would you like to adjust the environment?"),
    choices: [
      {
        name: "No, use defaults",
        value: false,
        short: "n",
        description: `Defaults: ${JSON.stringify(env)}`,
      },
      { name: "Yes, let me choose", value: true, short: "y" },
    ],
    default: false,
  });

  if (!shouldAdjustEnvironment) {
    return env;
  }

  const room = await select<Room>({
    message: getOptionalMsg("Select room type:"),
    choices: [
      { name: "Square Room", value: "square_room" },
      { name: "Circle Room", value: "circle_room" },
    ],
    default: "square_room",
  });

  const isCircleRoom = room === "circle_room";
  const extension = isCircleRoom
    ? "radius (unit: square)"
    : "size (unit: block)";

  const size = await number({
    message: getOptionalMsg(`Enter room ${extension}:`),
    min: 1,
    step: 1,
    default: isCircleRoom ? 10 : 5,
  });

  const yAxisInverted = await select<boolean>({
    message: getOptionalMsg("Is Y axis inverted?"),
    default: true,
    choices: [
      {
        name: "No",
        value: false,
        short: "n",
        description: "Y increases upward (standard math/cartesian-normal).",
      },
      {
        name: "Yes",
        value: true,
        short: "y",
        description: "Y increases downward (screen/cartesian-flipped).",
      },
    ],
  });

  const outputLang = await whichLanguage({
    message: getOptionalMsg("Select output language:"),
    choices: ["English", "Swedish"],
  });

  return { lang, size, type: room, outputLang, yAxisInverted } as Environment<
    number,
    Lang
  >;
};

export const setStartingPosition = async ({
  size,
  type,
}: Environment<number, Lang>) => {
  const isCircleRoom = type === "circle_room";
  const defaultValue = isCircleRoom ? "0 0" : "1 2";
  const value = await input({
    message: `Enter starting position in <x> <y> format (e.g. ${defaultValue}):`,
    default: defaultValue,
    prefill: "editable",
    required: true,
    validate: (value) => {
      const [x, y] = value.split(" ").map(Number) as [number, number];

      if (!validateBounds(type, size, x, y)) {
        const boundaries =
          type === "circle_room" ? `-${size} <-> ${size}` : `0 <-> ${size}`;

        return `Coordinates must be within the boundaries: ${boundaries}.`;
      }

      return true;
    },
  });
  const [x, y] = value.split(" ").map(Number);

  return { x, y, dir: "N" } as Position<Lang>;
};
