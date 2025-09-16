type CycleNumberOptions = NoneOrAll<{
  /**
  The maximum value (exclusive) for the cycle.
  @default Infinity
  */
  max: number;
  /** The step to increment or decrement the number.
  @default 1
  */
  step: number;
}>;

/**
 * Cycle a number within a range [0, max].
 * If the number exceeds the `max`, it wraps around to `0`.
 * If the number is less than `0`, it wraps around to `max - 1`.
 *
 * @param {number} value The current number to be cycled.
 * @param {CycleNumberOptions=} [options={ max = Infinity, step = 1 }] Options for cycling the number.
 */
export function cycleNumber(
  value: number,
  { max = Infinity, step = 1 }: CycleNumberOptions = {},
): number {
  const newValue = (value + step + max) % max;

  return newValue;
}

/**
 * Validate if the given coordinates (x, y)
 * are within the bounds of the specified room type and size.
 *
 * @param {Room} type The type of room (`square_room` or `circle_room`).
 * @param {number} size The size of the room.
 * @param {number} x The x-coordinate to validate.
 * @param {number} y The y-coordinate to validate.
 * @throws Will throw an error if the room type is unknown.
 */
export function validateBounds(
  type: Room,
  size: number,
  x: number,
  y: number,
): boolean {
  if (type === "square_room") {
    return 0 <= x && x <= size && 0 <= y && y <= size;
  } else if (type === "circle_room") {
    return x * x + y * y <= size * size;
  }

  // This should never happen during compiling (TS)
  // but during runtime it might if the input is tampered with.
  throw new Error(`Unknown room type: ${type}`);
}
