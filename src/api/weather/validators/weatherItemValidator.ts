//TYPES && MESSAGES
import { ERROR_MESSAGE } from "../../../constants/messageErrors";
import { ValidationIssue } from "../../../types/validationApi.types";
import {
  WeatherApiResponseType,
  WeatherCurrentType,
  WeatherVisualType,
} from "../../../types/weather/weather.types";

//FUNCTIONS
import { isPlainObject } from "../../../utils/validators/isPlainObject";
import { createIssue } from "../../validators/utils_validations/validationUtils";
import { validateSchemaKeys } from "../../validators/object_validations/validateSchemaKeys";

//SCHEMAS
import {
  WEATHER_VISUAL_SCHEMA,
  WEATHER_API_SCHEMA,
  WEATHER_CURRENT_SCHEMA,
} from "../schemas/weather.schema";

export const weatherItemValidator = (
  objectItem: unknown,
  indexItem: number,
  issues: ValidationIssue[]
): objectItem is WeatherApiResponseType => {
  if (!isPlainObject(objectItem)) {
    issues.push(
      createIssue("weather API", ERROR_MESSAGE.INVALID_OBJECT, [indexItem])
    );
    return false;
  }

  const isValidApi = validateSchemaKeys<WeatherApiResponseType>(
    objectItem,

    WEATHER_API_SCHEMA,
    issues,
    [indexItem]
  );

  if (!isValidApi) return false;

  const isValidCurrent = validateSchemaKeys<WeatherCurrentType>(
    objectItem.current,
    WEATHER_CURRENT_SCHEMA,
    issues,
    [indexItem]
  );

  if (!isValidCurrent) return false;

  const visualApi = objectItem.current.weather[0];

  if (!visualApi) {
    issues.push(
      createIssue("weather API, array weather", ERROR_MESSAGE.INVALID_ARRAY, [
        indexItem,
      ])
    );
    return false;
  }
  const isValidVisualWeather = validateSchemaKeys<WeatherVisualType>(
    visualApi,
    WEATHER_VISUAL_SCHEMA,
    issues,
    [indexItem]
  );

  if (!isValidVisualWeather) return false;

  return true;
};
