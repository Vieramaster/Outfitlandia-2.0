// TYPES
import {
  WeatherArrayType,
  descriptionWeatherArray,
  iconWeatherArray,
} from "../../data/types/WeatherTypes";

// VALIDATORS
import { isOneOf } from "../genericValidators/isOneOf";
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";

// Define the required keys for the  data object in weather array
const requiredWeatherKeys = ["icon", "description"] as const;

/**
 * Validates whether a given array contains valid weather description objects.
 *
 * Each item must be an object containing `icon` and `description` properties, where:
 * - `icon` matches one of the expected icon codes.
 * - `description` matches one of the expected weather descriptions.
 *
 * @param weatherArray - The array to validate, typically from the weather API.
 * @returns True if the array matches the WeatherArrayType[], false otherwise.
 */
export const isValidWeatherArrayApiResponse = (
  weatherArray: unknown
): weatherArray is WeatherArrayType[] =>
  isNonEmptyArray(weatherArray) && isValidObjectKeysArray(weatherArray);

/* ------------------------ Internal Helper ------------------------ */

/**
 * Checks if every object in the array has the required keys and valid values.
 */
const isValidObjectKeysArray = (data: unknown[]): data is WeatherArrayType[] =>
  data.every(
    (object) =>
      isObjectWithRequiredKeys(object, requiredWeatherKeys) &&
      isOneOf(object.description, descriptionWeatherArray) &&
      isOneOf(object.icon, iconWeatherArray)
  );
