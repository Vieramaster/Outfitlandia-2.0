import { ClothesProps } from "../../data/types/ClothesTypes";
import GarmentFilterValidator from "../validators/GarmentFilterValidator";

/**
 * Filters an array of ClothesProps by a given key and value.
 *
 * @param array - The array  to filter.
 * @param key - The property of ClothesProps to compare.
 * @param value - The value to match against the selected key.
 * @param excludes - If true, includes items that match the value; if false, excludes them. Default is false.
 * @returns A filtered array of ClothesProps or undefined if input is invalid.
 */

const SearchFilter = <K extends keyof ClothesProps>(
  array: ClothesProps[] | undefined,
  key: K,
  value: ClothesProps[K],
  excludes: boolean = false
): ClothesProps[] | [] => {
  if (!GarmentFilterValidator(array)) {
    console.error("SearchFilter: array is undefined or invalid.");
    return [];
  }

  return array.filter((item) =>
    excludes ? item[key] !== value : item[key] === value
  );
};

export default SearchFilter;
