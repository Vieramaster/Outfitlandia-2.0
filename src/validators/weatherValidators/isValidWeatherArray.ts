//TYPES
import {
  WeatherArrayType,
  descriptionWeatherArray,
  iconWeatherArray,
} from "../../data/types/WeatherTypes";
//VALIDATORS
import { isOneOf } from "../genericValidators/isOneOf";
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";

const requiredObjecArraytKeys = ["icon", "description"] as const;

const isValidObjectKeysArray = (data: unknown[]): data is WeatherArrayType[] =>
  data.every(
    (object) =>
      isObjectWithRequiredKeys(object, requiredObjecArraytKeys) &&
      isOneOf(object.description, descriptionWeatherArray) &&
      isOneOf(object.icon, iconWeatherArray)
  );

export const isValidWeatherArrayApiResponse = (
  weatherArray: unknown
): weatherArray is WeatherArrayType[] =>
  isNonEmptyArray(weatherArray) && isValidObjectKeysArray(weatherArray);
