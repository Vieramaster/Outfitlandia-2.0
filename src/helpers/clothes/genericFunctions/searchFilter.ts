import { ClothesType } from "../../../shared/types/clothes/clothes.types";

/**
 * Filters an array of ClothesProps by a given key and value.
 *
 * @param array - The array  to filter.
 * @param key - The property of ClothesProps to compare.
 * @param value - The value to match against the selected key.
 * @param excludes - If true, includes items that match the value; if false, excludes them. Default is false.
 * @returns A filtered array of ClothesProps or undefined if input is invalid.
 */

export const searchFilter = <K extends keyof ClothesType>(
  array: ClothesType[],
  key: K,
  value: string | number,
  excludes: boolean = false
): ClothesType[] =>
  array.filter((item) =>
    excludes ? item[key] !== value : item[key] === value
  );
