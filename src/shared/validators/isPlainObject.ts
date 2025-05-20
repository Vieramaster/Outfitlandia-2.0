export const isPlainObject = (
  value: unknown
): value is Record<string, unknown> =>
  value !== null &&
  typeof value === "object" &&
  Object.getPrototypeOf(value) === Object.prototype;

export const isOneOf = <T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number] =>
  typeof value === "string" && allowedValues.includes(value);
