/**
 * Checks if the given value is a plain object and contains all the required keys.
 *
 * @param objectData - The value to check.
 * @param requiredKeys - An array of string keys that must exist in the object.
 * @returns True if objectData is a plain object containing all required keys.
 */
export const isObjectWithRequiredKeys = <const K extends ReadonlyArray<string>>(
  objectData: unknown,
  requiredKeys: K
): objectData is Record<K[number], unknown> =>
  isPlainObject(objectData) &&
  requiredKeys.every((key) =>
    Object.prototype.hasOwnProperty.call(objectData, key)
  );

/* -------------------- Internal Helper -------------------- */

/**
 * Checks if the given value is a plain object (i.e., not null, not an array, and not a function).
 *
 * @param value - The value to check.
 * @returns True if the value is a plain object.
 */
const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  Object.prototype.toString.call(value) === "[object Object]";
