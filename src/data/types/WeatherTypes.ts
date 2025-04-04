export interface WeatherDataProps {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: WeatherCoordinatesProps;
  dt: number;
  id: number;
  main: WeatherDataMainProps;
  name: string;
  sys: WeatherDataSysProps;
  timezone: number;
  visibility: number;
  weather: WeatherGeneralWeatherDataProps[];
  wind: WeatherWindDataProps;
}

export interface WeatherCoordinatesProps {
  lon: number;
  lat: number;
}

export interface WeatherDataMainProps {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherDataSysProps {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherGeneralWeatherDataProps {
  id: number;
  main: string;
  description: string;
  icon: WeatherIconKey;
}

export interface WeatherWindDataProps {
  speed: number;
  deg: number;
  gust: number;
}

import { WeatherIconKey } from "../listObjects/WeatherIconList";
//WEATHER ICONS
export interface TransformedWeatherDataProps {
  temperature: number;
  icon: WeatherIconKey;
  windSpeed: number;
  description: string;
}
