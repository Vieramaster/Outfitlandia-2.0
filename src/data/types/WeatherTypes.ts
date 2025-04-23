export interface WeatherDataProps {
  main: WeatherDataMainProps;
  weather: GeneralWeatherDataProps[];
  wind: WeatherWindDataProps;
}
export interface WeatherDataMainProps {
  temp: number;
}
export interface GeneralWeatherDataProps {
  description: string;
  icon: WeatherIconKey;
}

export interface WeatherWindDataProps {
  speed: number;
}

import { WeatherIconKey } from "../listObjects/WeatherIconList";
//WEATHER ICONS
export interface TransformedWeatherDataProps {
  temperature: number;
  icon: WeatherIconKey;
  windSpeed: number;
  description: string;
}
