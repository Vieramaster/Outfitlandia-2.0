// TYPES
import { WeatherMainDataType } from "../../data/types/WeatherTypes";

// VALIDATORS
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";

// Define the required keys for the  mainData object
const requiredMainKeys = ["temp"] as const;

/**
 * Validates if the provided data is a valid weather main object.
 *
 * Checks that the object contains the required key `"temp"` and that its value is a number.
 *
 * @param mainData - The data to validate.
 * @returns True if the data is a valid WeatherMainDataType object.
 */
export const isValidMainApiResponse = (
  mainData: unknown
): mainData is WeatherMainDataType =>
  isObjectWithRequiredKeys(mainData, requiredMainKeys) &&
  typeof mainData.temp === "number";
