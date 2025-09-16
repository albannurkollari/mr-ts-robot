// biome-ignore-all lint/suspicious/noExplicitAny: Any is allowed here.
// biome-ignore-all lint/correctness/noUnusedVariables: It's an ambient file.

type Lang = "English" | "Swedish";

type Primitive<Nullable extends boolean = false> = Nullable extends true
  ? string | number | boolean | bigint | null | undefined
  : string | number | boolean | bigint;

type Prettify<T> = { [Key in keyof T]: T[Key] } & unknown;

type LiteralUnion<LiteralType, BaseType = string> =
  | LiteralType
  | (BaseType & Record<never, never>);

/** Omits keys from an object and suggests all possible keys as you type. */
type OmitKeys<T, K extends keyof NonNullable<T>> = Omit<T, K>;

/** Picks keys from an object and suggests all possible keys as you type. */
type PickKeys<T, K extends keyof NonNullable<T>> = Pick<T, K>;

/** Disallow keys in an object, by marking them as "never" */
type DisallowKeys<T, K extends keyof any> = Prettify<
  Omit<T, K> & { [P in K]?: never }
>;

/** Overwrites keys in an object and suggests all possible keys as you type. */
type Overwrite<T, U extends Partial<Record<keyof T, any>>> = Prettify<{
  [K in keyof T]: K extends keyof U ? U[K] : T[K];
}>;

type Initial<S extends string> = S extends `${infer F}${string}` ? F : never;

type CombinationOf<T extends string> = T extends string
  ? `${T}${CombinationOf<T>}` | T
  : never;

type ToCamelCase<
  S extends string,
  Delimiter extends string = "",
> = S extends `${infer First}${Delimiter}${infer Rest}`
  ? `${Lowercase<First>}${Delimiter extends ""
      ? Rest
      : Capitalize<ToCamelCase<Rest, Delimiter>>}`
  : Lowercase<S>;

type CamelCaseUnion<T extends string, Delimiter = ""> = T extends T
  ? ToCamelCase<T, Delimiter>
  : never;

type CamelCaseObj<T, Delimiter = ""> = {
  [k in keyof NonNullable<T> as ToCamelCase<
    k & string,
    Delimiter
  >]: NonNullable<T>[k];
};

// Require at least N elements
type MinArrayOf<
  T,
  N extends number,
  Acc extends T[] = [],
> = Acc["length"] extends N
  ? [...Acc, ...T[]] // once Acc has N, allow more
  : MinArrayOf<T, N, [...Acc, T]>; // keep building Acc

type NonEmptyArray<T> = [T, ...T[]];

type NumbersUpTo<
  Max extends number,
  R extends Array<number> = [],
> = R["length"] extends Max ? R[number] : NumbersUpTo<Max, [...R, R["length"]]>;

type Blank = "" | " " | undefined | null;

type IsBlankOrString<T, Fallback = "-"> = T extends Blank ? Fallback : T;

type Delimiter = LiteralUnion<" " | ", " | "-" | " / " | "_" | "=" | ".">;

type JoinStrings<
  T extends string[],
  D extends Delimiter = " ",
  Acc extends string = "",
> = T extends [infer F extends string, ...infer R extends string[]]
  ? JoinStrings<R, D, Acc extends "" ? F : `${Acc}${D}${F}`>
  : Acc;

type Nullify<T> = T extends object
  ? { [K in keyof T]: Nullify<T[K]> }
  : T | null;

type NoneOrAll<T extends object> = T | DisallowKeys<T, keyof T>;

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
