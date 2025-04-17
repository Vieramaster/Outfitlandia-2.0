import { ClothesProps } from "../../../data/types/ClothesTypes";
import {
  isValidArray,
  isValidObjects,
} from "../GenericArrayAndObjectValidator";
import {
  isValidArrayColor,
  isValidColorClothesObject,
} from "./GarmentColorsValidator";



const isValidClothesObject = (item: unknown): item is ClothesProps => {
  if (!isValidObjects(item)) return false;

  const obj = item as Record<string, unknown>;
  const objKeys: (keyof ClothesProps)[] = [
    "garment",
    "id",
    "name",
    "image",
    "style",
    "weather",
    "colors",
  ];
  const allObjKeys = objKeys.every((key) => key in obj);
  if (!allObjKeys) return false;
  const arrayObj = obj as Record<string, unknown>;

  return (
    typeof arrayObj.garment === "string" &&
    typeof arrayObj.id === "string" &&
    typeof arrayObj.name === "string" &&
    typeof arrayObj.image === "string" &&
    
    
    isValidArrayColor(arrayObj.colors) &&
    isValidColorClothesObject(arrayObj.colors) &&
    
  );
};

const ValidateObjectKeys = (array: unknown[]): array is ClothesProps[] => {
  if (!isValidArray(array)) return false;

  return array.every(isValidClothesObject);
};

export default ValidateObjectKeys;
