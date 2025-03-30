//UTILITIES
import { TransformWeatherData } from "../../helpers/TransformWeatherData";
import { WeatherDataProps } from "../../data/types";
import { WeatherIconList } from "../../data/WeatherIconList";
//HOOKS
import { useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useGeolocation } from "../../hooks/useGeolocation";
//COMPONENTS
import { WeatherSectionContainer } from "../containers/WeatherSectionContainer";
import { GeolocationButton } from "../buttons/GeolocationButton";
import { Spinner } from "../loadingsAndErrors/Spinner";
import { WeatherErrorAndLoading } from "../loadingsAndErrors/WeatherErrorAndLoading";
import { WeatherStatsContainer } from "../containers/WeatherStatsContainer";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string | undefined;

const buildWeatherUrl = (
  latitude: number,
  longitude: number
): string | null => {
  if (!latitude || !longitude || !API_KEY) return null;
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&mode=cors`;
};

const WeatherSection = () => {
  const {
    coordinates,
    error: geoError,
    loading: geoLoading,
    getCurrentPosition,
  } = useGeolocation();
  const { latitude, longitude } = coordinates;

  const weatherUrl = useMemo(
    () => buildWeatherUrl(latitude, longitude),
    [latitude, longitude]
  );

  const {
    data,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch<WeatherDataProps>(weatherUrl);

  const transformedData = useMemo(
    () => data && TransformWeatherData(data),
    [data]
  );

  const errorContent = useMemo(() => {
    if (!API_KEY || geoError || fetchError)
      return (
        <WeatherErrorAndLoading
          label="API_KEY is missing"
          children={<p>x</p>}
        />
      );

    return null;
  }, [API_KEY, geoError, fetchError]);

  const loadingContent = useMemo(() => {
    if (geoLoading || fetchLoading)
      return (
        <WeatherErrorAndLoading children={<Spinner />} label="Loading..." />
      );
    return null;
  }, [geoLoading, fetchLoading]);

  const weatherContent = useMemo(() => {
    if (!transformedData) return null;
    return (
      <>
        <WeatherStatsContainer label={"weather icon"}>
          <img
            aria-label={transformedData.description}
            src={
              WeatherIconList[transformedData.icon] || WeatherIconList["01d"]
            }
            alt={transformedData.description}
            className="w-5/6 h-5/6"
          />
        </WeatherStatsContainer>

        <WeatherStatsContainer label={"temperature"}>
          <p>{transformedData.temperature}°C</p>
        </WeatherStatsContainer>

        <WeatherStatsContainer label={"wind speed"}>
          <img
            aria-label={"winter icon"}
            src={WeatherIconList.wind || "x"}
            className="w-full h-1/2"
          />
          <p>{transformedData.windSpeed} km/h</p>
        </WeatherStatsContainer>
      </>
    );
  }, [transformedData]);

  return (
    <WeatherSectionContainer>
      <GeolocationButton
        onClick={getCurrentPosition}
        loading={fetchLoading}
        aria-label="Geolocation for the weather"
        title="Geolocation for the weather"
      />
      {errorContent}
      {loadingContent}
      {weatherContent}
    </WeatherSectionContainer>
  );
};

export default WeatherSection;
