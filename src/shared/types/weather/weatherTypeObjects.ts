export const iconWeatherKeys = [
  "01d",
  "01n",
  "02d",
  "02n",
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
  "wind",
] as const;

export const descriptionWeatherKeys = [
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

export const weatherApiResponseKeys = ["current "];
export const weatherCurrentKeys = ["temp", "wind_speed", "weather"];
export const weatherVisualKeys = ["description", "icon"];

