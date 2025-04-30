//TYPES & MESSAGES
import { ERROR_CLOTHES_MESSAGE } from "../../data/types/ErrorMessages";
import { CombineColorsClothesType } from "../../data/types/ColorCombineTypes";
import { colorNameKeys } from "../../data/types/ClothesTypes";

//VALIDATORS
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";
import { isOneOf } from "../genericValidators/isOneOf";

const requiredCombineClothesKeys = ["top", "coat", "pants"] as const;

export const isValidCombineClothes = (
  objectClothes: unknown,
  mainObject: Record<"clothes", unknown>
): objectClothes is CombineColorsClothesType => {
  if (!isObjectWithRequiredKeys(objectClothes, requiredCombineClothesKeys)) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_OBJECT, objectClothes);
    return false;
  }
  const { top, coat, pants } = objectClothes;
  if (
    !isOneOf(top, colorNameKeys) ||
    !isOneOf(coat, colorNameKeys) ||
    !isOneOf(pants, colorNameKeys)
  ) {
    console.error(ERROR_CLOTHES_MESSAGE.INVALID_CLOTHES_KEYS_VALUE, mainObject);
    return false;
  }
  return true;
};
