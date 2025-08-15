import { ListStructureType } from "../../../types/clothes/clothes.types";

/**
 * Determines whether every garment group in the selection shares
 * at least one style and at least one weather condition.
 *
 * @param groups – An object whose keys are garment categories and whose values
 *                 are the selected garment item for that category.
 * @returns True if there is a non‑empty intersection of all styles AND of all weathers.
 */
export const hasCommonStyleAndWeather = (
  groups: ListStructureType
): boolean => {
  const styleLists = Object.values(groups).map((item) => item.style);
  const weatherLists = Object.values(groups).map((item) => item.weather);

  const commonStyles = intersectArrays(styleLists);
  const commonWeathers = intersectArrays(weatherLists);

  return commonStyles.length > 0 && commonWeathers.length > 0;
};

/* ------------------------ Internal helpers ------------------------ */

/**
 * Returns the intersection of an array of arrays—i.e. the values
 * present in every sub-array. If the input is empty, returns [].
 *
 * @param arrays – A list of arrays to intersect.
 * @returns A new array containing only the elements that appear in all input arrays.
 */
const intersectArrays = <T>(arrays: T[][]): T[] => {
  if (arrays.length === 0) return [];
  return arrays.reduce((acc, curr) =>
    acc.filter((value) => curr.includes(value))
  );
};
