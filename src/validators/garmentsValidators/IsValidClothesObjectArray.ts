import IsValidArray from "../genericValidators/isNonEmptyArray";

type PrimitiveType = "string" | "number" | "boolean" | "object" | "function";

const IsValidClothesObjectArray = (
  input: unknown,
  primitive: PrimitiveType
): boolean => {
  return IsValidArray(input) && input.every((val) => typeof val === primitive);
};

export default IsValidClothesObjectArray;
