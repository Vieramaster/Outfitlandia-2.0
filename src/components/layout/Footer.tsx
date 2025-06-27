//TYPES
import { WeatherApiResponseType } from "../../types/weather/weather.types";
//HOOKS
import { consumeAPI } from "../../api/consumeAPI";
//FUNCTIONS
import { weatherApiValidator } from "../../api/weather/validators/weatherApiValidator";
import { useGeolocation } from "../../hooks/useGeolocation";
import { WeatherCard } from "../ui/cards/WeatherCard";
import { StandardButton } from "../ui/buttons/StandardButton";
import { GeoLocationIcon } from "../icons/GeoLocationIcon";
import { transformedClimateData } from "../../helpers/weather/transformedClimateData";

import { FogDayIcon } from "../icons/weather/day/fogDayIcon";
import { LightDrizzleDayIcon } from "../icons/weather/day/LightDrizzleDayIcon";
import { LightFreezingDrizzleDayIcon } from "../icons/weather/day/LightFreezingDrizzleDayIcon";
import { MainlyClearDayIcon } from "../icons/weather/day/MainlyClearDayIcon";
import { ModerateDrizzleDayIcon } from "../icons/weather/day/ModerateDrizzleDayIcon";
import { PartyCloudyDayIcon } from "../icons/weather/day/PartyCloudyDay";
import { DenseFreezingDrizzleDayIcon } from "../icons/weather/day/DenseFreezingDrizzleDayIcon";
import { RainIcon } from "../icons/weather/both/RainIcon";
import { OvercastRainIcon } from "../icons/weather/both/OvercastRainIcon";
import { ClearSkyDayIcon } from "../icons/weather/day/ClearSkyDayIcon";
import { HeavyRainIcon } from "../icons/weather/both/HeavyRainIcon";

export const Footer = () => {
  const buildWeatherUrl = (latitude: number, longitude: number): string =>
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

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

  const {
    error: weatherError,
    loading: weatherLoading,
    validatedData: weatherData,
  } = consumeAPI<WeatherApiResponseType>(weatherURL, weatherApiValidator);

  if (!weatherData) return;

  const transformWeatherData = transformedClimateData(weatherData);
  //falta freezing rain y de imagenes seatshirt de camel
  console.log(transformWeatherData);
  return (
    <footer className="bg-footer h-20 flex gap-5 justify-center items-center lg:h-26">
      <ul className="flex gap-5">
        <li className="bg-background rounded-lg size-12 lg:size-14">
          <StandardButton variant="geoLocation" isEnabled={true}>
            <GeoLocationIcon className="fill-background w-full h-full " />
          </StandardButton>
        </li>
        <WeatherCard children={<HeavyRainIcon className="h-full" />} />
        <WeatherCard children={`${transformWeatherData.temperature} °C`} />
        <WeatherCard children={`${transformWeatherData.windspeed} km/h`} />
      </ul>
    </footer>
  );
};

/** */
