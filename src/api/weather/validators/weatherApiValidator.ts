//TYPES
import {
  ValidationIssue,
  ValidationResult,
} from "../../../types/validationApi.types";
import { WeatherApiResponseType } from "../../../types/weather/weather.types";
//FUNCTIONS
import { dataValidationResult } from "../../validators/utils_validations/validationUtils";
import { weatherItemValidator } from "./weatherItemValidator";

/**
 * Validates a single raw weather API response and returns either a typed result or detailed validation issues.
 *
 * Validation workflow:
 *   1. Invokes `weatherItemValidator` to verify that the `data` matches the expected structure
 *      of a `WeatherApiResponseType`.
 *   2. If validation succeeds, wraps the result in an array and returns it in a `ValidationResult` with `valid: true`.
 *   3. If validation fails, collects any `ValidationIssue`s and returns them using `dataValidationResult`.
 *
 * @param data - The raw input (expected to be an object representing the weather API response).
 * @returns A `ValidationResult<WeatherApiResponseType[]>`:
 *   - If valid: `{ valid: true, value: [data] }`
 *   - If invalid: `{ valid: false, errors: ValidationIssue[] }`, where `errors` includes detailed messages and paths.
 */
export const weatherApiValidator = (
  data: unknown
): ValidationResult<WeatherApiResponseType[]> => {
  const issues: ValidationIssue[] = [];

  // Filter valid item based on `weatherItemValidator`
  const isValid = weatherItemValidator(data, 0, issues);

  // If there are issues, return result with errors; otherwise, return validated array
  return isValid
    ? { valid: true, value: [data] }
    : dataValidationResult(data, issues);
};
