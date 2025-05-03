// TYPES
import { WindWeatherDataType } from "../../data/types/WeatherTypes";

// FUNCTIONS
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";

// Define the required keys for the wind data object
const requiredWindKeys = ["windspeed"] as const;

/**
 * Validates the wind data response from the weather API.
 *
 * The response must be an object that contains the key `windspeed`, which should be a number representing the wind speed.
 *
 * @param windData - The wind data object to validate, typically from the weather API.
 * @returns True if the object matches the WindWeatherDataType, false otherwise.
 */
export const isValidWindApiResponse = (
  windData: unknown
): windData is WindWeatherDataType =>
  isObjectWithRequiredKeys(windData, requiredWindKeys) &&
  typeof windData.windspeed === "number";
