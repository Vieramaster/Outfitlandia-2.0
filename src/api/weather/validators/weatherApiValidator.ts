//TYPES
import {
  ValidationIssue,
  ValidationResult,
} from "../../../shared/types/validationApi.types";
import { WeatherApiResponseType } from "../../../shared/types/weather/weather.types";
//FUNCTIONS
import { dataValidationResult } from "../../validators/utils_validations/validationUtils";
import { weatherItemValidator } from "./weatherItemValidator";


export const weatherApiValidator = (
  data: unknown
): ValidationResult<WeatherApiResponseType[]> => {
  const issues: ValidationIssue[] = [];

  const isValid = weatherItemValidator(data, 0, issues);

  return isValid
    ? { valid: true, value: [data] }
    : dataValidationResult(data, issues);
};
