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
  const { coordinates, error: geoError, getCurrentPosition } = useGeolocation();
  geoError ? console.error("geoError", geoError) : null;

  const { latitude, longitude } = coordinates;

  const weatherUrl = useMemo(() => {
    if (!latitude || !longitude) return null;
    return buildWeatherUrl(latitude, longitude);
  }, [latitude, longitude]);

  if (!weatherUrl) return console.error("No se pudo obtener la URL del clima");

  const {
    data,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch<WeatherDataProps>(weatherUrl);

  const transformedData = useMemo(() => {
    if (!data) return null;
    return TransformWeatherData(data);
  }, [data]);

  const renderContent = () => {
    if (!API_KEY || geoError || fetchError)
      return (
        <WeatherErrorAndLoading children={<p>x</p>} label={"api faliure"} />
      );

    if (fetchLoading)
      return (
        <WeatherErrorAndLoading children={<Spinner />} label={"loading"} />
      );
    return transformedData ? (
      <>
        <WeatherStatsContainer
          label={"weather icon"}
          children={
            <image
              aria-label={transformedData.description}
              href={transformedData.icon}
              className="w-full h-full"
            />
          }
        />
        <WeatherStatsContainer
          label={"temperature"}
          children={<p>{transformedData.temperature}°C</p>}
        />
        <WeatherStatsContainer
          label={"winter speed"}
          children={
            <>
              <image
                aria-label={"winter icon"}
                href={WeatherIconList.wind}
                className="w-full h-1/2"
              />
              <p>{transformedData.windSpeed} km/h</p>
            </>
          }
        />
      </>
    ) : null;
  };

  return (
    <WeatherSectionContainer>
      <GeolocationButton
        onClick={getCurrentPosition}
        loading={false}
        aria-label="Actualizar ubicación"
      />
      {renderContent()}
    </WeatherSectionContainer>
  );
};

export default WeatherSection;
