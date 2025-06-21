import {
  descriptionWeatherKeys,
  iconWeatherKeys,
} from "../../constants/weatherConstants";

export type WeatherApiResponseType = {
  current: WeatherCurrentType;
};

export type WeatherCurrentType = {
  temp: number;
  wind_speed: number;
  weather: WeatherVisualType[];
};

export type WeatherVisualType = {
  description: WeatherDescriptionType;
  icon: WeatherIconType;
};

export type WeatherDescriptionType = (typeof descriptionWeatherKeys)[number];
export type WeatherIconType = (typeof iconWeatherKeys)[number];
