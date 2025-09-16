import { select } from "@inquirer/prompts";
import { COMMAND_MAP } from "#constants";

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
