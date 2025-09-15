// biome-ignore-all lint/suspicious/noExplicitAny: Any is allowed here.
// biome-ignore-all lint/correctness/noUnusedVariables: It's an ambiient file.

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

type OneOrTheOther<A extends string, B extends string, AVal, BVal = AVal> =
  | ({ [K in A]?: AVal } & { [K in B]?: never })
  | ({ [K in B]?: BVal } & { [K in A]?: never });
