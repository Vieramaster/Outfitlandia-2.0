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
  description: WeatherDescription;
  icon: WeatherIcon;
};

export type WeatherDescription = (typeof descriptionWeatherKeys)[number];
export type WeatherIcon = (typeof iconWeatherKeys)[number];
