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

const buildWeatherUrl = (latitude: number, longitude: number): string => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&mode=cors`;
};

const WeatherSection = () => {
  if (!API_KEY) return console.error("API_KEY is missing");

  const { coordinates, error: geoError, getCurrentPosition } = useGeolocation();
  
  if (geoError) return console.error("geoError", geoError);

  const { latitude, longitude } = coordinates;

  // The URL is created based on the coordinates provided by the useGeolocation hook.
  const weatherUrl = useMemo(() => {
    if (!latitude || !longitude) return null;
    return buildWeatherUrl(latitude, longitude);
  }, [latitude, longitude]);

  if (!weatherUrl) return console.error("Could not get weather URL");

  //the location is searched for using the https://api.openweathermap.org/ API.
  const {
    data,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch<WeatherDataProps>(weatherUrl);

  if (fetchError) return console.error("Fetch error", fetchError);

  // error handling is used to return what we are going to use through the TransformWeatherData function that was imported
  const transformedData = useMemo(() => {
    if (!data) return null;
    return TransformWeatherData(data);
  }, [data]);

  // Renders
  const renderError = () => {
    if (!API_KEY || geoError || fetchError) {
      return (
        <WeatherErrorAndLoading children={<p>x</p>} label={"api failure"} />
      );
    }
    return null;
  };

  const renderLoading = () => {
    if (fetchLoading) {
      return (
        <WeatherErrorAndLoading children={<Spinner />} label={"loading"} />
      );
    }
    return null;
  };

  const renderContent = () => {
    if (transformedData && !fetchLoading) {
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
    }
    return null;
  };

  return (
    <WeatherSectionContainer>
      <GeolocationButton
        onClick={getCurrentPosition}
        loading={false}
        aria-label="Geolocation for the weather"
        title="Geolocation for the weather"
      />
      {renderError()}
      {renderLoading()}
      {renderContent()}
    </WeatherSectionContainer>
  );
};

export default WeatherSection;
