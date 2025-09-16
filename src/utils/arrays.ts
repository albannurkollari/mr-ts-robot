import { cycleNumber } from "./numbers.ts";

/**
 * Cycles through an array and returns the item at the new index.
 *
 * @template T
 * @param {T[]} array The array to cycle through.
 * @param {number=} [currentIndex=0] The current index in the array.
 * @param {number=} [step=1] The number of steps to cycle (can be negative).
 */
export function cycleArrayItem<T>(
  array: T[] | readonly T[],
  currentIndex: number = 0,
  step: number = 1,
): T {
  const newIndex = cycleNumber(currentIndex, { max: array.length, step });

  return array[newIndex];
}
