// biome-ignore-all lint/suspicious/noExplicitAny: Any is allowed here.
// biome-ignore-all lint/correctness/noUnusedVariables: It's an ambient file.

type Lang = "English" | "Swedish";

type Prettify<T> = { [Key in keyof T]: T[Key] } & unknown;

type DisallowKeys<T, K extends keyof any> = Prettify<
  Omit<T, K> & { [P in K]?: never }
>;

type NoneOrAll<T extends object> = T | DisallowKeys<T, keyof T>;

type Initial<S extends string> = S extends `${infer F}${string}` ? F : never;

type MinArrayOf<
  T,
  N extends number,
  Acc extends T[] = [],
> = Acc["length"] extends N
  ? [...Acc, ...T[]] // once Acc has N, allow more
  : MinArrayOf<T, N, [...Acc, T]>; // keep building Acc

type Directions<T extends Lang = "English"> = T extends "English"
  ? "Left" | "Right"
  : "Vänster" | "Höger";

type Movement<T extends Lang = "English"> = T extends "English"
  ? "Forward"
  : "Gå";

type Instructions<T extends Lang = "English"> = Directions<T> | Movement<T>;

type Command<T extends Lang = "English"> = Initial<Instructions<T>>;

type EnglishCommand = Command<"English">; // "L" | "R" | "F"

type SwedishCommand = Command<"Swedish">; // "V" | "H" | "G"

type InputKey<L extends Lang> = L extends "English"
  ? EnglishCommand
  : SwedishCommand;

type Room = `${"square" | "circle"}_room`;

type EnglishCompass = "N" | "E" | "S" | "W";

type SwedishCompass = "N" | "Ö" | "S" | "V";

type Compass<L extends Lang> = L extends "English"
  ? EnglishCompass
  : SwedishCompass;

type Position<L extends Lang> = {
  x: number;
  y: number;
  dir: Compass<L>;
};

type Environment<S extends number, L extends Lang> = {
  lang: L;
  outputLang?: L;
  size: S;
  type: Room;
  yAxisInverted?: boolean;
};
