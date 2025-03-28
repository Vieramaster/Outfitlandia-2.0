import { WeatherDataProps } from "../data/types";
type WeatherDataResponseProps = Pick<
  WeatherDataProps,
  "main" | "weather" | "wind"
>;

export const useTransformWeatherData = (data: unknown) => {
  const isWeatherData = (data: unknown): data is WeatherDataResponseProps => {
    return (
      typeof data === "object" &&
      data !== null &&
      "main" in data &&
      "weather" in data &&
      "wind" in data
    );
  };

  const transformWeatherData = (data: unknown) => {
    if (!isWeatherData(data)) throw new Error("Invalid weather data");

    return {
      temperature: Math.round(data.main.temp),
      icon: data.weather[0]?.icon ?? "02d",
      windSpeed: Math.round(data.wind.speed * 3.6),
      description: data.weather[0]?.description || "Condiciones actuales",
    };
  };

  return transformWeatherData(data);
};
