/**
 * Validates whether the given value is an array consisting only of strings.
 *
 * @param array - The value to validate.
 * @returns True if the value is an array and every element is a string.
 */
export const isStringArray = (array: unknown): array is string[] =>
  Array.isArray(array) && array.every((value) => typeof value === "string");
