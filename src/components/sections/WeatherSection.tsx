//UTILITIES
import { TransformWeatherData } from "../../helpers/weather/TransformWeatherData";
import { WeatherApiResponse } from "../../data/types/WeatherTypes";
//HOOKS
import { useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useGeolocation } from "../../hooks/useGeolocation";
//COMPONENTS
import { WeatherSectionContainer } from "../containers/WeatherSectionContainer";
import { GeolocationButton } from "../buttons/GeolocationButton";
import { Spinner } from "../loadingsAndErrors/Spinner";
import { WeatherErrorAndLoading } from "../loadingsAndErrors/WeatherErrorAndLoading";
import { WeatherSectionContent } from "./parts/WeatherSectionContent";

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
    data: weatherData,
    loading: weatherLoading,
    error: weatherErrror,
  } = useFetch<WeatherApiResponse>(weatherUrl);

  const transformedData = useMemo(
    () => weatherData && TransformWeatherData(weatherData),
    [weatherData]
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
    if (!transformedData || geoLoading || fetchLoading) return null;

    return <WeatherSectionContent weatherArray={transformedData} />;
  }, [transformedData, geoLoading, fetchLoading]);

  return (
    <WeatherSectionContainer>
      <GeolocationButton
        onClick={getCurrentPosition}
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
