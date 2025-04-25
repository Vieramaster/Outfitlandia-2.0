const IconWeatherArray = [
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

const DescriptionWeatherArray = [
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

export type IconWeatherArrayProps = (typeof IconWeatherArray)[number];

export type DescriptionWeatherArrayProps =
  (typeof DescriptionWeatherArray)[number];

export type WindWeatherDataProps = {
  windspeed: number;
};

export type MainWeatherDataProps = {
  temp: number;
};

export type WeatherArrayProps = {
  icon: IconWeatherArrayProps;
  description: DescriptionWeatherArrayProps;
};

export type WeatherApiResponseProps = {
  wind: WindWeatherDataProps;
  main: MainWeatherDataProps;
  weather: WeatherApiResponseProps;
};
