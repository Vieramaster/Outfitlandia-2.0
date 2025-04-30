//TYPES & MESSAGES
import {
  ColorNameArrayType,
  colorNameKeys,
} from "../../data/types/ClothesTypes";
import { ERROR_CLOTHES_MESSAGE } from "../../data/types/ErrorMessages";
//VALIDATORS
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";
import { isOneOf } from "../genericValidators/isOneOf";

const isValidShoesKey = (shoesArray: unknown[]) =>
  shoesArray.every(
    (item: unknown) => typeof item === "string" && isOneOf(item, colorNameKeys)
  );

export const isValidCombineShoes = (
  shoesData: unknown,
  objectData: Record<"shoes", unknown>
): shoesData is ColorNameArrayType => {
  if (!isNonEmptyArray(shoesData)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_ARRAY, objectData);
    return false;
  }

  if (!isValidShoesKey(shoesData)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_KEYS_VALUE, objectData);
    return false;
  }
  return true;
};
