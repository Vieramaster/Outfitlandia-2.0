// TYPES & MESSAGES
import {
  garmentsKeys,
  styleKeys,
  weatherKeys,
  RawClothes,
} from "../../data/types/ClothesTypes";
import { ERROR_CLOTHES_MESSAGE } from "../../data/types/ErrorMessages";

// VALIDATORS
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";
import { isOneOf } from "../genericValidators/isOneOf";

const requiredClothesKeys = [
  "id",
  "garment",
  "name",
  "image",
  "style",
  "weather",
  "colors",
] as const;

/**
 * Validates that the API response is a non‑empty array of clothing items
 * matching the RawClothes shape.
 *
 * @param data – The unknown value returned from the clothes API.
 * @returns True if `data` is a non‑empty array of valid RawClothes objects.
 */
export const isValidClothesApiResponse = (
  data: unknown
): data is RawClothes[] => {
  if (!isNonEmptyArray(data) || !data.every(isValidRawClothesObject)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_ARRAY, data);
    return false;
  }
  return true;
};

/* ------------------------ Internal helpers ------------------------ */

/**
 * Checks that an individual clothing object has all required keys
 * and that each property has the correct type or allowed literal value.
 *
 * @param objectData – The object to validate.
 * @returns True if `objectData` matches the RawClothes type.
 */
const isValidRawClothesObject = (
  objectData: unknown
): objectData is RawClothes => {
  if (!isObjectWithRequiredKeys(objectData, requiredClothesKeys)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_OBJECT, objectData);
    return false;
  }

  const { id, garment, name, image, style, weather, colors } =
    objectData as Record<string, unknown>;

  const hasValidPrimitives =
    typeof id === "number" &&
    typeof name === "string" &&
    typeof image === "string";

  const hasValidLiterals =
    isOneOf(garment, garmentsKeys) &&
    isOneOf(style, styleKeys) &&
    isOneOf(weather, weatherKeys);

  const hasValidColorsArray = isNonEmptyArray(colors);

  if (!hasValidPrimitives || !hasValidLiterals || !hasValidColorsArray) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_KEYS_VALUE, objectData);
    return false;
  }

  return true;
};
