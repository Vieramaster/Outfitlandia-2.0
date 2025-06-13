//TYPES
import { WeatherApiResponseType } from "../../shared/types/weather/weather.types";
//UTILITIES
import { transformWeatherData } from "../../helpers/weather/transformWeatherData";
//HOOKS
import { useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useApiData } from "../../api/consumeAPI";
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

  const weatherURL = useMemo(
    () => buildWeatherUrl(latitude, longitude),
    [latitude, longitude]
  );

  if (!weatherURL) return;

  const {
    validatedData: weatherData,
    loading: weatherLoading,
    error: weatherError,
  } = useApiData<WeatherApiResponseType>(weatherURL, "weather");

  console.log(weatherData);

  const transformedData = useMemo(
    () => weatherData && transformWeatherData(weatherData),
    [weatherData]
  );

  const errorContent = useMemo(() => {
    if (!API_KEY || geoError || weatherError)
      return (
        <WeatherErrorAndLoading
          label="API_KEY is missing"
          children={<p>x</p>}
        />
      );

    return null;
  }, [API_KEY, geoError, weatherError]);

  const loadingContent = useMemo(() => {
    if (geoLoading || weatherLoading)
      return (
        <WeatherErrorAndLoading children={<Spinner />} label="Loading..." />
      );
    return null;
  }, [geoLoading, weatherLoading]);

  const weatherContent = useMemo(() => {
    if (!transformedData || geoLoading || weatherLoading) return null;

    return <WeatherSectionContent weatherArray={transformedData} />;
  }, [transformedData, geoLoading, weatherLoading]);

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
