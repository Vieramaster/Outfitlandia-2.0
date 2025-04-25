export const isNonEmptyArray = (array: unknown): array is unknown[] =>
  Array.isArray(array) && array.length > 0;
