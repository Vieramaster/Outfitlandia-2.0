import { WeatherDataProps } from "../../data/types";
//HOOKS
import { useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useTransformWeatherData } from "../../hooks/useTransformWeatherData";
//COMPONENTS
import { WeatherSectionContainer } from "../containers/WeatherSectionContainer";
import { WeatherStatsContainer } from "../containers/WeatherStatsContainer";
import { GeolocationButton } from "../buttons/GeolocationButton";
import { WeatherErrorAndLoading } from "../../loadingsAndErrors/WeatherErrorAndLoading";
import { Spinner } from "../../loadingsAndErrors/Spinner";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string | undefined;

const buildWeatherUrl = (latitude: number, longitude: number): string => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&mode=cors`;
};

const WeatherSection = () => {
  const { coordinates, error: geoError, getCurrentPosition } = useGeolocation();
  const { latitude, longitude } = coordinates;
  const weatherUrl = useMemo(
    () => (coordinates ? buildWeatherUrl(latitude, longitude) : null),
    [coordinates]
  );
  const { data, loading, error } = useFetch<WeatherDataProps>(weatherUrl);
  const weatherData = useMemo(
    () => (data ? useTransformWeatherData(data) : null),
    [data]
  );

  if (!API_KEY)
    return (
      <WeatherErrorAndLoading
        label="Configuración incompleta"
        children={<p>x</p>}
      />
    );
  if (geoError)
    return <WeatherErrorAndLoading label={geoError} children={<p>x</p>} />;
  if (error)
    return (
      <WeatherErrorAndLoading
        label="Error cargando clima"
        children={<p>x</p>}
      />
    );
  if (loading || !weatherData) return <Spinner />;

  return (
    <WeatherSectionContainer>
      <GeolocationButton
        onClick={getCurrentPosition}
        loading={loading}
        aria-label="b"
      />
      <WeatherStatsContainer
        label="Temperatura"
        children={`${weatherData.temperature}°C`}
      />
      <WeatherStatsContainer
        children={weatherData.icon}
        label={weatherData.description}
      />
      <WeatherStatsContainer
        label="Viento"
        children={`${weatherData.windSpeed} km/h`}
      />
    </WeatherSectionContainer>
  );
};

export default WeatherSection;
