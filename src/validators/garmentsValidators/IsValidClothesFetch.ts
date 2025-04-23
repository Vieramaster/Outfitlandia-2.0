import { ClothesProps } from "../../data/types/ClothesTypes";
import IsValidArray from "../genericValidators/isNonEmptyArray";
import IsValidClothesObject from "./IsValidClothesObject";

const IsValidClothesArray = (
  clothesArray: unknown
): clothesArray is ClothesProps[] => {
  if (!IsValidArray(clothesArray)) return false;

  return clothesArray.every(IsValidClothesObject);
};

export default IsValidClothesArray;
