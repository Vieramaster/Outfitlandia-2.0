import { ClothesProps, GarmentType } from "../data/types";

const validateKeys = (array: unknown[]) =>
  array.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "garment" in item &&
      typeof item.garment === "string"
  );

const isValidateArray = (
  validateArray: unknown
): validateArray is ClothesProps[] => {
  if (
    !validateArray ||
    !Array.isArray(validateArray) ||
    validateArray.length === 0 ||
    !validateKeys(validateArray)
  )
    return false;

  return true;
};

export const garmentFilter = (array: unknown, clothes: GarmentType) => {
  if (!isValidateArray(array)) return undefined;

  return array.filter(({ garment }) => garment === clothes);
};
