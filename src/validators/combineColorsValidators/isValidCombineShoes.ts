// TYPES & MESSAGES
import {
  ColorNameArrayType,
  colorNameKeys,
} from "../../data/types/ClothesTypes";
import { ERROR_CLOTHES_MESSAGE } from "../../data/types/ErrorMessages";

// VALIDATORS
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";
import { isOneOf } from "../genericValidators/isOneOf";

/**
 * Checks if every item in the shoes array is a valid color name.
 *
 * @param shoesArray – The array to validate.
 * @returns true if all items are strings and valid color names.
 */
const isValidShoesKey = (shoesArray: unknown[]): boolean =>
  shoesArray.every(
    (item: unknown) => typeof item === "string" && isOneOf(item, colorNameKeys)
  );

/**
 * Validates the "shoes" section of a combined color object.
 * Ensures the value is a non-empty array of valid color names.
 *
 * @param shoesData – The raw data to validate (e.g. ["black", "white"]).
 * @param objectData – The full parent object (used for error logging).
 * @returns true if shoesData is a valid ColorNameArrayType.
 */
export const isValidCombineShoes = (
  shoesData: unknown,
  objectData: Record<"shoes", unknown>
): shoesData is ColorNameArrayType => {
  if (!isNonEmptyArray(shoesData)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_ARRAY, objectData);
    return false;
  }

  if (!isValidShoesKey(shoesData)) {
    console.error(
      ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_KEYS_VALUE,
      objectData
    );
    return false;
  }

  return true;
};


