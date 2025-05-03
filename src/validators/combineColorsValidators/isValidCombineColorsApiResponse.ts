// TYPES & ARRAYS & MESSAGES
import { ERROR_CLOTHES_MESSAGE } from "../../data/types/ErrorMessages";
import { CombineColorsApiResponse } from "../../data/types/ColorCombineTypes";

// VALIDATORS
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";

// FUNCTIONS
import { isValidCombineClothes } from "./isValidCombineItem";
import { isValidCombineShoes } from "./isValidCombineShoes";

/**
 * Validates the entire API response array of combined colors.
 * Ensures it's a non‑empty array and that every element
 * passes the isValidCombineItem check.
 *
 * @param data – the raw API response to validate
 * @returns true if data is a non‑empty array of CombineColorsApiResponse
 */
export const isValidCombineColorsApiResponse = (
  data: unknown
): data is CombineColorsApiResponse[] => {
  if (!isNonEmptyArray(data) || !data.every(isValidCombineItem)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_ARRAY, data);
    return false;
  }
  return true;
};

/* ------------------------ Internal helpers ------------------------ */

const requiredCombineKeys = ["clothes", "shoes"] as const;

/**
 * Checks whether a single “combine” object from the API
 * has the required shape and valid clothes & shoes values.
 *
 * @param objectColor – the raw object to validate
 * @returns true if objectColor matches CombineColorsApiResponse
 */
const isValidCombineItem = (
  objectColor: unknown
): objectColor is CombineColorsApiResponse => {
  if (!isObjectWithRequiredKeys(objectColor, requiredCombineKeys)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_OBJECT, objectColor);
    return false;
  }

  const { shoes, clothes } = objectColor;

  if (
    !isValidCombineClothes(clothes, objectColor) ||
    !isValidCombineShoes(shoes, objectColor)
  ) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_OBJECT, objectColor);
    return false;
  }

  return true;
};
