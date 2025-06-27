export type WeatherApiResponseType = {
  current_weather: WeatherCurrentType;
};

export type WeatherCurrentType = {
  is_day: 0 | 1;
  temperature: number;
  windspeed: number;
  weathercode: number;
};
