export const isObjectWithRequiredKeys = <
  F extends string,
  const K extends readonly string[]
>(
  objectData: Record<string, unknown>,
  field: F,
  requiredKeys: K
): objectData is Record<F[number], unknown> =>
  typeof field === "string" &&
  Object.prototype.hasOwnProperty.call(objectData, field) &&
  requiredKeys.includes(field);
