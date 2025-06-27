import { WeatherApiResponseType } from "../../types/weather/weather.types";

export const transformedClimateData = (data: WeatherApiResponseType) => {
  const {
    current_weather: { is_day, temperature, weathercode, windspeed },
  } = data;

  return {
    ...{ is_day, temperature, weathercode, windspeed },
  };
};
