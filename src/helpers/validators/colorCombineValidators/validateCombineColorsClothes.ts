import { CombineColorsProps } from "../../../data/types/ColorCombineTypes";

/**
 * @param array  -
 *@return -
 */

const ERROR_MESSAGE_CLOTHES =
  "some clothes objects in CombineColors or some types is undefined or invalid";

const validateCombineColorsClothes = (
  array: CombineColorsProps[]
): array is Required<CombineColorsProps>[] => {
  const allClothesValid = array.every(({ clothes }) => {
    if (!clothes || typeof clothes !== "object") return false;

    const { top, coat, pants } = clothes || {};
    return (
      typeof top === "string" &&
      typeof coat === "string" &&
      typeof pants === "string"
    );
  });

  if (!allClothesValid) {
    console.error(ERROR_MESSAGE_CLOTHES);
    return false;
  }

  return true;
};

export default validateCombineColorsClothes;
