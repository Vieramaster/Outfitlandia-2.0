import { ClothesProps } from "../types/Clothestypes";
const validateKeys = (array: unknown[]) =>
  array.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "garment" in item &&
      typeof item.garment === "string"
  );

const GarmentFilterValidator = (
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
export default GarmentFilterValidator;
