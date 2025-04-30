//TYPES
import { WeatherApiResponse } from "../../data/types/WeatherTypes";

//VALIDATORS
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";
import { isValidMainApiResponse } from "./isValidMainApiResponse";
import { isValidWindApiResponse } from "./isValidWindApiResponse";
import { isValidWeatherArrayApiResponse } from "./isValidWeatherArray";

const requiredWeatherKeys = ["main", "wind", "weather"] as const;

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
