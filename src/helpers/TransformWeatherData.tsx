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
} as const;

export const TransformWeatherData = (
  data: WeatherDataProps | undefined
): TransformedWeatherDataProps => {
  const isWeatherData = (
    obj: WeatherDataProps | undefined
  ): obj is WeatherDataResponseProps => {
    if (typeof obj !== "object" || obj === null) return false;

    const hasMain = "main" in obj && typeof obj.main === "object";
    const hasWeather = "weather" in obj && Array.isArray(obj.weather);
    const hasWind = "wind" in obj && typeof obj.wind === "object";

    const hasValidWeatherData =
      (obj.weather?.length ?? 0) > 0 &&
      obj.weather.every(
        (entry) =>
          typeof entry.icon === "string" &&
          typeof entry.description === "string"
      );
    const hasIco = "icon" in obj.weather && ("icon" as string);
    const hasWindSpeed =
      "speed" in obj.wind &&
      typeof obj.wind.speed === "number" &&
      !Number.isNaN(obj.wind.speed);

    const hasTemp =
      "temp" in obj.main &&
      typeof obj.main.temp === "number" &&
      !Number.isNaN(obj.main.temp);
    return (
      hasMain &&
      hasWeather &&
      hasWind &&
      hasValidWeatherData &&
      hasWindSpeed &&
      hasTemp
    );
  };

  const transformData = (): TransformedWeatherDataProps => {
    if (!isWeatherData(data)) {
      return DEFAULT_OBJECT;
    }
    return {
      temperature: Math.round(data.main.temp),
      icon: data.weather[0].icon,
      windSpeed: Math.round((data.wind.speed || 0) * 3.6),
      description: data.weather[0]?.description || DEFAULT_DESCRIPTION,
    };
  };

  return transformData();
};
