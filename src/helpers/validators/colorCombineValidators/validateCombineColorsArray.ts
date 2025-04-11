import { CombineColorsProps } from "../../../data/types/ColorCombineTypes";

/**
 * @param array
 * @returns
 */

const ERROR_MESSAGES = {
  INVALID_ARRAY: "the combineColors array is undefined or invalid",
  INVALID_OBJECTS:
    "Some objects in the array CombineColors is undefined or invalid",
};

const validateCombineColorsArray = (
  array: unknown
): array is CombineColorsProps[] => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    console.error(ERROR_MESSAGES.INVALID_ARRAY);
    return false;
  }

  const isValid = array.every((item) => {
    return (
      item &&
      typeof item === "object" &&
      "combineClothes" in item &&
      "combineShoes" in item
    );
  });

  if (!isValid) {
    console.error(ERROR_MESSAGES.INVALID_OBJECTS);
    return false;
  }

  return true;
};

export default validateCombineColorsArray;
