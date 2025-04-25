export const isValidKeys = <const Keys extends ReadonlyArray<string>>(
  keys: Keys,
  object: Readonly<Record<string, unknown>>
): object is Record<Keys[number], unknown> =>
  keys.every((key) => key in object);
