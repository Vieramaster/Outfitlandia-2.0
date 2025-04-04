export const WeatherIconList = {
  "01d": "images/icons/01d.svg",
  "01n": "images/icons/01n.svg",
  "02d": "images/icons/02d.svg",
  "02n": "images/icons/02n.svg",
  "03d": "images/icons/03d.svg",
  "03n": "images/icons/03n.svg",
  "04d": "images/icons/04d.svg",
  "04n": "images/icons/04n.svg",
  "09d": "images/icons/09d.svg",
  "10d": "images/icons/10d.svg",
  "10n": "images/icons/10n.svg",
  "11d": "images/icons/11d.svg",
  "11n": "images/icons/11n.svg",
  "13d": "images/icons/13d.svg",
  "13n": "images/icons/13n.svg",
  "50d": "images/icons/50d.svg",
  "50n": "images/icons/50n.svg",
  wind: "images/icons/wind.svg",
} as const;

export type WeatherIconKey = keyof typeof WeatherIconList;
