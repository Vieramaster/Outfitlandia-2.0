//TYPES
import { ClothesProps } from "../../data/types/ClothesTypes";
//VALIDATORS
import IsValidClothesObjectArray from "./IsValidClothesObjectArray";
import IsValidObject from "../genericValidators/IsValidObject";
import IsValidKeys from "../genericValidators/IsValidKeys";

const requiredClothesKeys = [
  "id",
  "garment",
  "name",
  "image",
  "style",
  "weather",
  "colors",
];

const IsValidClothesObject = (
  clothesObject: unknown
): clothesObject is ClothesProps => {
  if (!IsValidObject(clothesObject)) return false;
  const obj = clothesObject as Record<string, unknown>;
  if (!IsValidKeys(requiredClothesKeys, obj)) return false;

  const { id, garment, name, image, style, weather, colors } =
    clothesObject as ClothesProps;

  const stringProps = [garment, name, image];
  const areStrings = stringProps.every((key) => typeof key === "string");

  return (
    areStrings &&
    typeof id === "number" &&
    IsValidClothesObjectArray(style, "string") &&
    IsValidClothesObjectArray(weather, "string") &&
    IsValidClothesObjectArray(colors, "object")
  );
};

export default IsValidClothesObject;
