export const isStringArray = (array: unknown): array is string[] =>
  Array.isArray(array) && array.every((value) => typeof value === "string");
