/**
 * Checks if a given value is a string and exists within the list of allowed values.
 *
 * @param value - The value to validate.
 * @param allowedValues - A readonly array of allowed string values.
 * @returns True if value is a string and one of the allowed values.
 */
export const isOneOf = <T extends readonly string[]>(
  value: unknown,
  object: Record<string, unknown>,
  allowedValues: T
): value is T[number] =>
  typeof value === "string" && value in object && allowedValues.includes(value);
