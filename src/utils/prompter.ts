import { input, select } from "@inquirer/prompts";
import {
  BOTH_CMD,
  BOTH_CMD_DESC,
  COMMAND_MAP,
  EN_CMD_DESC,
  ENGLISH_CMD,
  SV_CMD_DESC,
  SWEDISH_CMD,
} from "#constants";
import { command } from "./predicates.ts";

type LangChoices = Lang | "Both";
type Choices<T> = Parameters<typeof select<T>>[0]["choices"];
type WhichLanguageOpts<C extends LangChoices> = {
  choices: MinArrayOf<C, 2>;
  defaultChoice: C;
};

const defaultOptions: WhichLanguageOpts<LangChoices> = {
  choices: ["English", "Swedish", "Both"],
  defaultChoice: "Both",
};

export const whichLanguage = <O extends LangChoices>(
  options: Partial<
    WhichLanguageOpts<O>
  > = defaultOptions as WhichLanguageOpts<O>,
) => {
  const defaultChoice = options.defaultChoice as O;
  const choices = options.choices as ReadonlyArray<O>;
  const selected = choices.includes(defaultChoice) ? defaultChoice : choices[0];
  const mappedChoices: Choices<O> = choices.map((item) => ({
    ...COMMAND_MAP[item as Lang],
    value: item,
    name: item,
  }));

  return select<O>({
    message: "Which language?",
    choices: mappedChoices,
    default: selected,
    loop: true,
  });
};

export const moveMrTsRobot = (lang: LangChoices) => {
  const isCommandInvalid = (value: string) => {
    let predicate = command.isBoth;

    if (lang === "English") {
      predicate = command.isEnglish;
    } else if (lang === "Swedish") {
      predicate = command.isSwedish;
    }

    return [...value].some((char) => !predicate(char));
  };

  const validate = (value: string) => {
    if (isCommandInvalid(value.trim())) {
      return lang === "Both"
        ? `${BOTH_CMD_DESC} only.`
        : lang === "English"
          ? `${EN_CMD_DESC} only.`
          : `${SV_CMD_DESC} only.`;
    }

    return true;
  };

  const commands =
    lang === "Both" ? BOTH_CMD : lang === "English" ? ENGLISH_CMD : SWEDISH_CMD;
  const message =
    `Insert command to move Mr TS Robot (use keys: ${commands}, then press Enter)` as const;

  return input({ message, required: true, validate }).then((command) => ({
    command,
    lang,
  }));
};
