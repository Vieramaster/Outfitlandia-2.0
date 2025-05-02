import {
  ClothesType,
  StyleType,
  WeatherType,
} from "../../data/types/ClothesTypes";

/**
 *
 * @param arrayClothes - The array of clothes to filter.
 * @param styleSearched - The styles to search for.
 * @param weatherSearched - The weather conditions to search for.
 * @returns - A filtered array of clothes that match the specified styles and weather conditions.
 */
export const FilterStyleAndWheater = (
  arrayClothes: ClothesType[],
  styleSearched: StyleType[],
  weatherSearched: WeatherType[]
): ClothesType[] =>
  arrayClothes.filter(
    ({ style, weather }) =>
      style.some((styleItem) => styleSearched.includes(styleItem)) &&
      weather.some((weatherItem) => weatherSearched.includes(weatherItem))
  );
