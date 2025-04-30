//ARRAYTYPES & TYPES
import {
  colorNameKeys,
  hexColorKeys,
  titleColorKeys,
  ColorClothesType,
  ERROR_CLOTHES_MESSAGE,
} from "../../data/types/ClothesTypes";
//VALIDATORS
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";
import { isOneOf } from "../genericValidators/isOneOf";

const requiredColorClothesKeys = [
  "colorName",
  "hex",
  "title",
  "imageColor",
] as const;

export const isValidArrayColorClothes = (
  dataColor: unknown[]
): dataColor is ColorClothesType[] =>
  dataColor.every((colorObject) => {
    if (!isObjectWithRequiredKeys(colorObject, requiredColorClothesKeys)) {
      console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_OBJECT, colorObject);
      return false;
    }

    const { colorName, hex, title, imageColor } = colorObject;

    if (
      !isOneOf(colorName, colorNameKeys) ||
      !isOneOf(hex, hexColorKeys) ||
      !isOneOf(title, titleColorKeys) ||
      !(typeof imageColor === "string")
    ) {
      console.error(
        ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_KEYS_VALUE,
        colorObject
      );
      return false;
    }
    return true;
  });
