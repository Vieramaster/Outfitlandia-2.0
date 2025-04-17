//TYPES
import { ColorClothesProps } from "../../data/types/ClothesTypes";
//VALIDATORS
import IsValidColorClothesObject from "./IsValidColorClothesObject";
import IsValidArray from "../genericValidators/IsValidArray";


const IsValidColorClothesArray = (
  colorClothesArray: unknown
): colorClothesArray is ColorClothesProps[] => {
  if (!IsValidArray(colorClothesArray)) return false;

  return colorClothesArray.every(IsValidColorClothesObject);
};

export default IsValidColorClothesArray;
