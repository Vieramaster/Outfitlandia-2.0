import { useState, useEffect } from "react";
import { WeatherStatsContainer } from "../containers/WheaterStatsContainer";

export const WeatherSection = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocalización no es compatible con este navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({
          lat: coords.latitude,
          lon: coords.longitude,
        });
        setError(null);
      },
      ({ code, PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT }) => {
        switch (code) {
          case PERMISSION_DENIED:
            setError(
              "Permiso denegado. Habilita la geolocalización en el navegador."
            );
            break;
          case POSITION_UNAVAILABLE:
            setError("Ubicación no disponible.");
            break;
          case TIMEOUT:
            setError("Tiempo de espera agotado. Inténtalo de nuevo.");
            break;
          default:
            setError("Error desconocido al obtener la ubicación.");
        }
      }
    );
  };
useEffect(() => {console.log(location)}, [location]);

  return (
    <section className="bg-violet-600 w-full flex gap-5 justify-center items-center h-22 lg:w-1/12 lg:h-full lg:flex-col ">
      <WeatherStatsContainer>
        <button className="w-full h-full" onClick={handleWeather}>
          cambiar
        </button>
      </WeatherStatsContainer>
      <WeatherStatsContainer>
        <p>20°C</p>
      </WeatherStatsContainer>
      <WeatherStatsContainer>nublado</WeatherStatsContainer>
      <WeatherStatsContainer>viento</WeatherStatsContainer>
    </section>
  );
};

/**
 *   const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

  const weatherLocation = `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${APIKEY}`;
 */
