import { MainWeatherDataProps } from "../../data/types/WeatherTypes";
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";

const requiredMainKeys = ["temp"] as const;

export const isValidMainApiResponse = (
  mainData: unknown
): mainData is MainWeatherDataProps =>
  isObjectWithRequiredKeys(mainData, requiredMainKeys) &&
  typeof mainData.temp === "number";
