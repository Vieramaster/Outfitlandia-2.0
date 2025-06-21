//REACT
import { useMemo } from "react";
//TYPES
import { WeatherApiResponseType } from "../../types/weather/weather.types";
//HOOKS
import { consumeAPI } from "../../api/consumeAPI";
//FUNCTIONS
import { weatherApiValidator } from "../../api/weather/validators/weatherApiValidator";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useFetch } from "../../hooks/useFetch";
import { WeatherCard } from "../ui/cards/WeatherCard";

export const Footer = () => {
  const API_KEY = "655a7f77968191071fc7f94491ab3d2d";

  const buildWeatherUrl = (latitude: number, longitude: number): string =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&mode=cors`;

  const {
    coordinates: currentCoors,
    error: geoError,
    loading: geoLoading,
    getCurrentPosition,
  } = useGeolocation();

  const weatherURL = buildWeatherUrl(
    currentCoors.latitude,
    currentCoors.longitude
  );
  console.log(weatherURL);
  const lala = useFetch(weatherURL);
  console.log(lala);
  /**
 *   const {
    error: weatherError,
    loading: weatherLoading,
    validatedData: weatherData,
  } = consumeAPI<WeatherApiResponseType>(weatherURL, weatherApiValidator);

 */
  return (
    <footer className="bg-footer h-20 flex gap-5 justify-center items-center lg:h-20">
      <ul className="flex gap-5">
        <li className="bg-background rounded-lg size-12 lg:size-14">
          <button className="size-full bg-detail rounded-lg">b</button>
        </li>
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
      </ul>
    </footer>
  );
};
