import { TransformedWeatherDataProps } from "../../data/types/WeatherTypes";
import WeatherDataValidator from "../../data/validators/WeatherDataValidator";

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
  if (!WeatherDataValidator(data) || !data.weather[0]) return DEFAULT_OBJECT;

  return {
    temperature: Math.round(data.main.temp),
    icon: data.weather[0].icon,
    windSpeed: Math.round(data.wind.speed * 3.6),
    description: data.weather[0].description || DEFAULT_DESCRIPTION,
  };
};
