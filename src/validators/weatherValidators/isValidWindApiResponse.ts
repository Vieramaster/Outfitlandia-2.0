import { WindWeatherDataProps } from "../../data/types/WeatherTypes";
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";

const requiredWindKeys = ["windspeed"] as const;

export const isValidWindApiResponse = (
  windData: unknown
): windData is WindWeatherDataProps =>
  isObjectWithRequiredKeys(windData, requiredWindKeys) &&
  typeof windData.windspeed === "number";
