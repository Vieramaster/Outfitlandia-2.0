//TYPES
import { ColorClothesProps } from "../../data/types/ClothesTypes";
//VALIDATORS
import IsValidKeys from "../genericValidators/IsValidKeys";
import IsValidObject from "../genericValidators/IsValidObject";

const colorClothesObjectKeys = ["colorname", "hex", "title", "imagecolor"];

const IsValidColorClothesObject = (
  colorObject: unknown
): colorObject is ColorClothesProps => {
  if (!IsValidObject(colorObject)) return false;

  const obj = colorObject as Record<string, unknown>;

  if (!IsValidKeys(colorClothesObjectKeys, obj)) return false;

  return colorClothesObjectKeys.every((key) => typeof obj[key] === "string");
};

export default IsValidColorClothesObject;
