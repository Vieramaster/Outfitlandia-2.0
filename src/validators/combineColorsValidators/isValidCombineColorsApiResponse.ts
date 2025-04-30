//TYPES & ARRAYS & MESSAGES
import { ERROR_CLOTHES_MESSAGE } from "../../data/types/ErrorMessages";
import { CombineColorsApiResponse } from "../../data/types/ColorCombineTypes";

//VALIDATORS
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";

//FUNCTIONS
import { isValidCombineClothes } from "./isValidCombineItem";
import { isValidCombineShoes } from "./isValidCombineShoes";

const requiredCombineKeys = ["clothes", "shoes"] as const;

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
  }

  return true;
};

export const isValidCombineColorsApiResponse = (
  data: unknown
): data is CombineColorsApiResponse[] => {
  if (!isNonEmptyArray(data) || data.every(isValidCombineItem)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_ARRAY, data);
    return false;
  }
  return true;
};
