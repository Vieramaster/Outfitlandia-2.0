//TYPES
import { WeatherApiResponseProps } from "../../data/types/WeatherTypes";
//FUNCTIONS
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";
import { isValidMainApiResponse } from "./isValidMainApiResponse";
import { isValidWindApiResponse } from "./isValidWindApiResponse";
import { isValidWeatherArrayApiResponse } from "./isValidWeatherArrayApiResponse";

const requiredWeatherKeys = ["main", "wind", "weather"] as const;

export const isValidWeatherApiResponse = (
  data: unknown
): data is WeatherApiResponseProps =>
  isObjectWithRequiredKeys(data, requiredWeatherKeys) &&
  isValidMainApiResponse(data.main) &&
  isValidWindApiResponse(data.wind) &&
  isValidWeatherArrayApiResponse(data.weather);
