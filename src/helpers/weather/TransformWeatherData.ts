import { TransformedWeatherDataProps } from "../../data/types/WeatherTypes";
import IsValidObject from "../../validators/genericValidators/IsObject";
import IsValidWeatherObjects from "../../validators/weatherValidators/isValidWeatherApiResponse";
import IsValidGeneralWeatherArray from "../../validators/weatherValidators/IsValidGeneralWeatherArray";
import IsValidPropertyWeatherObject from "../../validators/weatherValidators/IsValidPropertyWeatherObject";
import IsValidKeys from "../../validators/genericValidators/IsValidKeys";
/**
 * The weather fetch is used to validate the data and then return an object with the data that is required.
 *
 * @param data - Fetched weather data from the API.
 * @returns An object containing the transformed weather data, including temperature, icon, wind speed, and description.
 */

const DEFAULT_ICON = "01d";
const DEFAULT_DESCRIPTION = "Clear sky";

const DEFAULT_OBJECT: TransformedWeatherDataProps = {
  temperature: 0,
  icon: DEFAULT_ICON,
  windSpeed: 0,
  description: DEFAULT_DESCRIPTION,
} as const;

export const TransformWeatherData = (
  data: unknown
): TransformedWeatherDataProps => {
  if (!IsValidObject(data)) return DEFAULT_OBJECT;
  if (!IsValidWeatherObjects(data)) return DEFAULT_OBJECT;

  const { main, wind, weather } = data;

  if (
    !IsValidObject(main) ||
    IsValidKeys(["temp"] as const, data) ||
    !IsValidObject(wind) ||
    IsValidKeys(["windspeed"] as const, data)
  )
    return DEFAULT_OBJECT;

  if (!IsValidGeneralWeatherArray(weather) || !weather[0])
    return DEFAULT_OBJECT;

  const { icon, description } = weather[0];

  /**
   * return {
    temperature: Math.round(temp) || DEFAULT_OBJECT.temperature,
    icon: icon || DEFAULT_OBJECT.icon, yo 
    windSpeed: Math.round(speed * 3.6) || DEFAULT_OBJECT.windSpeed,
    description: description || DEFAULT_OBJECT.description,
  };
   */
  return DEFAULT_OBJECT;
};
