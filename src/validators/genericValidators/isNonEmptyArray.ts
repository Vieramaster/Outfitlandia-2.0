/**
 * Checks if the provided value is a non-empty array.
 *
 * @param value - The value to validate.
 * @returns True if the value is an array with at least one item.
 */
export const isNonEmptyArray = (value: unknown): value is unknown[] =>
  Array.isArray(value) && value.length > 0;
