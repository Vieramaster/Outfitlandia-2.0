import { ClothesProps } from "../../../data/types/ClothesTypes";

/**
 * 
 * @param array - The array to validate.
 * @returns true if the array is valid, false otherwise.
 * Validates that each item in the array is an object with a 'garment' key of type string.
 * 
 * @example
 * const isValid = validateKeys([{ garment: 'shirt' }, { garment: 'pants' }]);
 * console.log(isValid); // true
 * 
 * const isInvalid = validateKeys([{ garment: 123 }, { garment: 'pants' }]);
 * console.log(isInvalid); // false

 */
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
