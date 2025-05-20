//FUNCTIONS
import { isOneOf } from "./isOneOf";
export const validateStringArray = <T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number][] => {
  return (
    Array.isArray(value) && value.every((item) => isOneOf(item, allowedValues))
  );
};
