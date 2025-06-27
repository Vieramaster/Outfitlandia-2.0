//TYPES
import {
  ValidationIssue,
  ValidationResult,
} from "../../../types/validationApi.types";
import {
  WeatherApiResponseType,
  WeatherCurrentType,
} from "../../../types/weather/weather.types";
import { isPlainObject } from "../../../utils/validators/isPlainObject";
//MESSAGE
import {
  ERROR_MESSAGE_API,
  ERROR_MESSAGE,
} from "../../../constants/messageErrors";
//SCHEMAS
import {
  WEATHER_API_SCHEMA,
  WEATHER_CURRENT_SCHEMA,
} from "../schemas/weather.schema";
//FUNCTIONS
import {
  createIssue,
  dataValidationResult,
} from "../../validators/utils_validations/validationUtils";
import { validateSchemaKeys } from "../../validators/object_validations/validateSchemaKeys";

/**
 * Validates a single raw weather API response and returns either a typed result or detailed validation issues.
 *
 * Validation workflow:
??
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
): ValidationResult<WeatherApiResponseType> => {
  const issues: ValidationIssue[] = [];

  if (!isPlainObject(data)) {
    issues.push(
      createIssue(ERROR_MESSAGE_API.WEATHER, ERROR_MESSAGE.INVALID_ROOT)
    );
    return dataValidationResult(data, issues);
  }

  const isValidMain = validateSchemaKeys<WeatherApiResponseType>(
    data,
    WEATHER_API_SCHEMA,
    issues,
    [0],
    "current_weather"
  );

  if (!isValidMain) {
    issues.push(
      createIssue(ERROR_MESSAGE_API.WEATHER, ERROR_MESSAGE.INVALID_OBJECT)
    );
    return dataValidationResult(data, issues);
  }

  const isValidCurrent = validateSchemaKeys<WeatherCurrentType>(
    data.current_weather,
    WEATHER_CURRENT_SCHEMA,
    issues,
    [1],
    "general data"
  );

  if (!isValidCurrent) {
    issues.push(
      createIssue(ERROR_MESSAGE_API.WEATHER, ERROR_MESSAGE.INVALID_OBJECT)
    );
    return dataValidationResult(data, issues);
  }
  // If there are issues, return result with errors; otherwise, return validated array
  return isValidCurrent
    ? { valid: true, value: data }
    : dataValidationResult(data, issues);
};
