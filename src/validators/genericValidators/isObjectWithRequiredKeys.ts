const isRecord = (objectData: unknown): objectData is Record<string, unknown> =>
  typeof objectData === "object" &&
  objectData !== null &&
  !Array.isArray(objectData) &&
  Object.prototype.toString.call(objectData) === "[object Object]";

export const isObjectWithRequiredKeys = <const K extends ReadonlyArray<string>>(
  objectData: unknown,
  arrayKeys: K
): objectData is Record<K[number], unknown> =>
  isRecord(objectData) &&
  arrayKeys.every((key) =>
    Object.prototype.hasOwnProperty.call(objectData, key)
  );
