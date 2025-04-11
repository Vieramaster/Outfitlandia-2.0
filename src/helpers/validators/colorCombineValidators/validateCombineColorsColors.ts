import { CombineColorsProps } from "../../../data/types/ColorCombineTypes";

/**
 * @param array  -
 *@return -
 */

const ERROR_MESSAGE_COLORS =
  "some colors array in CombineColors is undefined or invalid";

const validateCombineColorsClothes = (
  array: CombineColorsProps[]
): array is Required<CombineColorsProps>[] => {
  const isColorsValid = false;
     
  if (!isColorsValid) {
    console.error(ERROR_MESSAGE_COLORS);
    return false;
  }

  return true;
};

export default validateCombineColorsClothes;
