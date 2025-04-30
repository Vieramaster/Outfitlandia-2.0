export type CurrentWeatherAPI = {
  temperature: number;
  icon: IconWeatherArrayType;
  windSpeed: number;
  description: DescriptionWeatherArrayType;
};

export type IconWeatherArrayType = (typeof iconWeatherArray)[number];

export type DescriptionWeatherArrayType =
  (typeof descriptionWeatherArray)[number];

export type WindWeatherDataType = {
  windspeed: number;
};

export type WeatherMainDataType = {
  temp: number;
};

export type WeatherArrayType = {
  icon: IconWeatherArrayType;
  description: DescriptionWeatherArrayType;
};

export type WeatherApiResponse = {
  wind: WindWeatherDataType;
  main: WeatherMainDataType;
  weather: [WeatherArrayType, ...WeatherArrayType[]];
};

export const iconWeatherArray = [
  "01d",
  "02d",
  "03d",
  "03n",
  "04d",
  "04n",
  "09d",
  "09n",
  "10d",
  "10n",
  "11d",
  "11n",
  "13d",
  "13n",
  "50d",
  "50n",
] as const;

export const descriptionWeatherArray = [
  "clear sky",
  "few clouds",
  "scattered clouds",
  "broken clouds",
  "shower rain",
  "rain",
  "thunderstorm",
  "snow",
  "mist",
] as const;
