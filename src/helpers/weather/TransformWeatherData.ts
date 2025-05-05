//TYPES & MESSAGES
import { CurrentWeatherAPI } from "../../data/types/WeatherTypes";
//VALIDATORS
import { isValidWeatherApiResponse } from "../../validators/weatherValidators/isValidWeatherApiResponse";

/**
 * The weather fetch is used to validate the data and then return an object with the data that is required.
 * @param data - Fetched weather data from the API.
 * @returns An object containing the transformed weather data, including temperature, icon, wind speed, and description.
 */

const DEFAULT_OBJECT: CurrentWeatherAPI = {
  temperature: 0,
  icon: "01d",
  windSpeed: 0,
  description: "clear sky",
} as const;

export const transformWeatherData = (weatherData: unknown) => {
  if (!isValidWeatherApiResponse(weatherData)) return DEFAULT_OBJECT;

  const {
    main: { temp },
    wind: { speed },
    weather,
  } = weatherData;

  const { icon, description } = weather[0];

  return {
    temperature: Math.round(temp),
    icon: icon,
    windSpeed: Math.round(speed * 3.6),
    description: description,
  };
};
