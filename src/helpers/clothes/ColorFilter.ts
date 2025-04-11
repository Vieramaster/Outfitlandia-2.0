import { ClothesProps, ColorClothesProps } from "../../data/types/ClothesTypes";
import GarmentFilterValidator from "../validators/GarmentFilterValidator";

/**
 * Filters the colors from a list of clothes based on a specific color name.
 *
 * @param array - The array of ClothesProps to search within.
 * @param value - The color name to filter by.
 * @returns An array of ColorClothesProps that match the given color name, or undefined if the input is invalid.
 */

const ColorFilter = (
  array: ClothesProps[] | undefined,
  value: ColorClothesProps["colorName"]
): ColorClothesProps[] | undefined => {
  if (!array || !GarmentFilterValidator(array)) return undefined;

  const filteredColors = array.flatMap(({ colors }) =>
    colors.filter(({ colorName }) => colorName === value)
  );

  return filteredColors;
};

export default ColorFilter;
