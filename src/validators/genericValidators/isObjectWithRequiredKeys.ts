import { isObject } from "./IsObject";
import { isValidKeys } from "./IsValidKeys";

export const isObjectWithRequiredKeys = <const K extends ReadonlyArray<string>>(
  data: unknown,
  keys: K
): data is Record<K[number], unknown> =>
  isObject(data) && isValidKeys(keys, data);
