//TYPES
import { WeatherArrayProps } from "../../data/types/WeatherTypes";
import { IconWeatherArrayProps } from "../../data/types/WeatherTypes";
//FUNCTIONS
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";

const requiredObjecArraytKeys = ["icon", "description"] as const;


const is =<T (value:ValueKey) =>
const isValidObjectKeysArray = (data: unknown[]) =>
  data.every(
    (object) =>
      isObjectWithRequiredKeys(object, requiredObjecArraytKeys) &&
      typeof object.icon === "string" &&
      typeof object.description === "string"
  );

export const isValidWeatherArrayApiResponse = (
  weatherArray: unknown
): weatherArray is WeatherArrayProps =>
  isNonEmptyArray(weatherArray) && isValidObjectKeysArray(weatherArray);
