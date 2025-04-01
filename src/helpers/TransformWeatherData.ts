import { WeatherDataProps, TransformedWeatherDataProps } from "../data/types";

const DEFAULT_ICON = "01d";
const DEFAULT_DESCRIPTION = "Clear sky";

const DEFAULT_OBJECT: TransformedWeatherDataProps = {
  temperature: 0,
  icon: DEFAULT_ICON,
  windSpeed: 0,
  description: DEFAULT_DESCRIPTION,
} as const;


const isWeatherData = (obj: unknown): obj is WeatherDataProps => {
  if (typeof obj !== "object" || obj === null) return false;

  if (!("main" in obj) || !("weather" in obj) || !("wind" in obj)) return false;

  const { main, weather, wind } = obj as Partial<WeatherDataProps>;

  if (
    typeof main !== "object" ||
    main === null ||
    typeof main.temp !== "number"
  )
    return false;

  if (
    !Array.isArray(weather) ||
    weather.length === 0 ||
    !weather.every(
      (entry) =>
        typeof entry.icon === "string" && typeof entry.description === "string"
    )
  )
    return false;

  if (
    typeof wind !== "object" ||
    wind === null ||
    typeof wind.speed !== "number"
  )
    return false;

  return true;
};

export const TransformWeatherData = (
  data: unknown
): TransformedWeatherDataProps => {
  if (!isWeatherData(data) || !data.weather[0]) return DEFAULT_OBJECT;

  // TypeScript sabe que data.weather[0] existe aquí
  return {
    temperature: Math.round(data.main.temp),
    icon: data.weather[0].icon,
    windSpeed: Math.round(data.wind.speed * 3.6),
    description: data.weather[0].description || DEFAULT_DESCRIPTION,
  };
};
