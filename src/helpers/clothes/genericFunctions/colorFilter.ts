import { ClothesType } from "../../../data/types/ClothesTypes";

import { ColorClothesType } from "../../../data/types/ClothesTypes";

/**
 * Filters the colors from a list of clothes based on a specific color name.
 *
 * @param array - The array of ClothesProps to search within.
 * @param value - The color name to filter by.
 * @returns An array of ColorClothesProps that match the given color name, or undefined if the input is invalid.
 */

export const colorFilter = (
  array: ClothesType[],
  value: ColorClothesType["colorName"]
): ColorClothesType[] => {
  const filteredColors = array.flatMap(({ colors }) =>
    colors.filter(({ colorName }) => colorName === value)
  );

  return filteredColors;
};

