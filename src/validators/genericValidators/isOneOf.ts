export const isOneOf = <T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number] =>
  typeof value === "string" && allowedValues.includes(value);
