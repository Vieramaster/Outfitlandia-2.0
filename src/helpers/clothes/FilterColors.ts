import { GarmentKeyType } from "../../data/types/ClothesTypes";
import { CombineColorsProps } from "../../data/types/ColorCombineTypes";

/**
 *
 * @param array - The array of CombineColorsProps to search within.
 * @param key - The property of CombineColorsProps to compare.
 * @param name - The value to match against the selected key.
 * @returns An array of CombineColorsProps that match the given key and name.
 */

const FilterColors = (
  array: CombineColorsProps[] | undefined,
  key: GarmentKeyType,
  name: string
): CombineColorsProps[] => {
  if (!array) return [];

  return array.filter(({ clothes }) => {
    return clothes[key] === name;
  });
};
export default FilterColors;
