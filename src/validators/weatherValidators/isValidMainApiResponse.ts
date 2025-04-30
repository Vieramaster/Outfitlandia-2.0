//TYPES
import { WeatherMainDataType } from "../../data/types/WeatherTypes";
//VALIDATORS
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";

const requiredMainKeys = ["temp"] as const;

export const isValidMainApiResponse = (
  mainData: unknown
): mainData is WeatherMainDataType =>
  isObjectWithRequiredKeys(mainData, requiredMainKeys) &&
  typeof mainData.temp === "number";
