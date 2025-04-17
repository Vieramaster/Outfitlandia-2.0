import { ClothesProps } from "../../data/types/ClothesTypes";
import IsValidArray from "../genericValidators/IsValidArray";
import IsValidClothesObject from "./IsValidClothesObject";

// Verificamos un array de objetos ClothesProps
const IsValidClothesArray = (
  clothesArray: unknown
): clothesArray is ClothesProps[] => {
  if (!IsValidArray(clothesArray)) return false;

  return clothesArray.every(IsValidClothesObject);
};

export default IsValidArray