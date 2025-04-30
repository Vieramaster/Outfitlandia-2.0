//TYPES
import { WindWeatherDataType } from "../../data/types/WeatherTypes";
//FUNCTIONS
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";

const requiredWindKeys = ["windspeed"] as const;

export const isValidWindApiResponse = (
  windData: unknown
): windData is WindWeatherDataType =>
  isObjectWithRequiredKeys(windData, requiredWindKeys) &&
  typeof windData.windspeed === "number";
