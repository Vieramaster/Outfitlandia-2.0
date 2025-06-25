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
import { StandardButton } from "../ui/buttons/StandardButton";
import { GeoLocationIcon } from "../icons/GeoLocationIcon";

export const Footer = () => {
  const API_KEY = "655a7f77968191071fc7f94491ab3d2d";

  const buildWeatherUrl = (latitude: number, longitude: number): string =>
    `https: //api.openweathermap.org/data/2.5/onecall?lat=-38.00042&lon=-57.5562&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`;

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
          <StandardButton variant="geoLocation">
            <GeoLocationIcon className="fill-background w-full h-full " />
          </StandardButton>
        </li>
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
      </ul>
    </footer>
  );
};
