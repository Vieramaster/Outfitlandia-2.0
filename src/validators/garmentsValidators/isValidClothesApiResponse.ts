//ARRAYTYPES && TYPES
import {
  garmentsKeys,
  styleKeys,
  weatherKeys,
  RawClothes,
} from "../../data/types/ClothesTypes";
import { ERROR_CLOTHES_MESSAGE } from "../../data/types/ErrorMessages";
//VALIDATORS
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

export const isValidClothesApiResponse = (
  data: unknown
): data is RawClothes[] => {
  if (!isNonEmptyArray(data) || !data.every(isValidObjectClothes)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_ARRAY, data);
    return false;
  }
  return true;
};

/* ------------------------ Internal helpers ------------------------ */

const isValidObjectClothes = (
  objectData: unknown
): objectData is RawClothes => {
  if (!isObjectWithRequiredKeys(objectData, requiredClothesKeys)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_OBJECT, objectData);
    return false;
  }

  const { id, garment, name, image, style, weather, colors } = objectData;

  if (
    !(typeof id === "number") ||
    !(typeof name === "string") ||
    !(typeof image === "string") ||
    !isOneOf(garment, garmentsKeys) ||
    !isOneOf(style, styleKeys) ||
    !isOneOf(weather, weatherKeys) ||
    !isNonEmptyArray(colors)
  ) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_KEYS_VALUE, objectData);
    return false;
  }
  return true;
};
