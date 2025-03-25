import { WeatherStatsContainer } from "../containers/WeatherStatsContainer";
import { useFetch } from "../../hooks/useFetch";
import { useGeolocation } from "../../hooks/useGeolocation";

interface WeatherData {
  current?: {
    temp?: number;
    weather?: { description: string }[];
    wind_speed?: number;
  };
}

export const WeatherSection = () => {
  const { coordinates, error: geoError, getCurrentPosition } = useGeolocation();

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string | undefined;

  if (!API_KEY) {
    console.error("API_KEY is missing");
    return;
  }
  const { latitude, longitude } = coordinates || {
    latitude: -37.979858,
    longitude: -57.589794,
  };

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&mode=cors`;

  const { data, loading } = useFetch<WeatherData>(weatherUrl);

  console.log(data);

  return (
    <section className="bg-violet-600 w-full flex gap-5 justify-center items-center h-22 lg:w-1/12 lg:h-full lg:flex-col">
      <WeatherStatsContainer>
        <button className="w-full h-full" onClick={getCurrentPosition}>
          Cambiar ubicación
        </button>
      </WeatherStatsContainer>
    </section>
  );
};
