//TYPES
import { ColorClothesProps } from "../../data/types/ClothesTypes";
import IsValidColorClothesValue from "./isValidColorClothesValue";

//VALIDATORS
import IsValidKeys from "../genericValidators/IsValidKeys";
import IsValidObject from "../genericValidators/IsObject";
import IsValidRecord from "../genericValidators/IsValidRecord";

const colorClothesObjectKeys = ["colorname", "hex", "title", "imagecolor"];

const IsValidColorClothesObject = (
  colorObject: unknown
): colorObject is ColorClothesProps => {
  if (!IsValidObject(colorObject)) return false;

  if (!IsValidRecord(colorObject)) return false;

  if (!IsValidKeys(colorClothesObjectKeys, colorObject)) return false;

  return colorClothesObjectKeys.every((key) =>
    IsValidColorClothesValue(key, colorObject[key])
  );
};

export default IsValidColorClothesObject;
