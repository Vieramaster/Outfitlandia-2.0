const isValidKeys = <key extends string>(
  arrayKeys: readonly key[],
  obj: Record<string, unknown>
): obj is Record<key, unknown> => {
  return arrayKeys.every((key) => key in obj);
};

export default IsValidKeys;
