import { ColorClothesProps } from "../../../data/types/ClothesTypes";
import {
  isValidArray,
  isValidObjects,
} from "../GenericArrayAndObjectValidator";

export const isValidColorClothesObject = (
  objectColor: unknown
): objectColor is ColorClothesProps => {
  if (!isValidObjects(objectColor)) return false;

  const hasAllKeys = ["colorName", "hex", "title", "imageColor"].every(
    (key) => key in objectColor
  );

  if (!hasAllKeys) return false;

  const obj = objectColor as Record<string, unknown>;

  return (
    typeof obj.colorName === "string" &&
    typeof obj.hex === "string" &&
    typeof obj.title === "string" &&
    typeof obj.imageColor === "string"
  );
};

export const isValidArrayColor = (
  arrayColor: unknown
): arrayColor is ColorClothesProps[] => {
  if (!isValidArray(arrayColor)) return false;

  return arrayColor.every(isValidColorClothesObject);
};
