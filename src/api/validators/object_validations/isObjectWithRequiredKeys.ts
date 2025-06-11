export const isObjectWithRequiredKeys = <K extends string>(
  objectData: Record<string, unknown>,
  field: K
): objectData is Record<K[number], unknown> =>
  typeof field === "string" &&
  Object.prototype.hasOwnProperty.call(objectData, field);
