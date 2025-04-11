import { WeatherDataProps } from "../../data/types/WeatherTypes";

const WeatherDataValidator = (obj: unknown): obj is WeatherDataProps => {
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

export default WeatherDataValidator;
