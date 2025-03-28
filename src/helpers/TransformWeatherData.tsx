import { WeatherDataProps, TransformedWeatherDataProps } from "../data/types";

//handles weather fetch errors to return objects that are used in the app
//data is considered unknown until it is known to be

type WeatherDataResponseProps = Pick<
  WeatherDataProps,
  "main" | "weather" | "wind"
>;

const DEFAULT_ICON = "02d";
const DEFAULT_DESCRIPTION = "actual conditions";

const DEFAULT_OBJECT = {
  temperature: 0,
  icon: DEFAULT_ICON,
  windSpeed: 0,
  description: DEFAULT_DESCRIPTION,
};

export const TransformWeatherData = (
  data: unknown
): TransformedWeatherDataProps => {
  const isWeatherData = (obj: unknown): obj is WeatherDataResponseProps => {
    if (typeof obj !== "object" || obj === null) return false;

    const hasMain = "main" in obj && typeof obj.main === "object";
    const hasWeather = "weather" in obj && Array.isArray(obj.weather);
    const hasWind = "wind" in obj && typeof obj.wind === "object";

    return hasMain && hasWeather && hasWind;
  };

  const transformData = (): TransformedWeatherDataProps => {
    if (!isWeatherData(data)) {
      return DEFAULT_OBJECT;
    }
    return {
      temperature: Math.round(data.main.temp),
      icon: data.weather[0]?.icon ?? DEFAULT_ICON,
      windSpeed: Math.round((data.wind.speed || 0) * 3.6),
      description: data.weather[0]?.description || DEFAULT_DESCRIPTION,
    };
  };

  return transformData();
};
