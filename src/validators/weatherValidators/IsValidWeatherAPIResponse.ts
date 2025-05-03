// TYPES
import { WeatherApiResponse } from "../../data/types/WeatherTypes";

// VALIDATORS
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";
import { isValidMainApiResponse } from "./isValidMainApiResponse";
import { isValidWindApiResponse } from "./isValidWindApiResponse";
import { isValidWeatherArrayApiResponse } from "./isValidWeatherArray";

// Define the required keys for the  data object
const requiredWeatherKeys = ["main", "wind", "weather"] as const;

/**
 * Validates whether the given data conforms to the structure of a Weather API response.
 *
 * Ensures the object contains the required keys (`main`, `wind`, `weather`) and that each
 * of those keys points to a valid, properly structured sub-object.
 *
 * @param data - The data to validate, typically a parsed response from the weather API.
 * @returns True if the data matches the WeatherApiResponse type, false otherwise.
 */
export const isValidWeatherApiResponse = (
  data: unknown
): data is WeatherApiResponse => {
  if (!isObjectWithRequiredKeys(data, requiredWeatherKeys)) return false;

  const { main, wind, weather } = data;
  return (
    isValidMainApiResponse(main) &&
    isValidWindApiResponse(wind) &&
    isValidWeatherArrayApiResponse(weather)
  );
};
