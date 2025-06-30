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
import { WindIcon } from "../icons/weather/WindIcon";
import { WindCard } from "../ui/cards/WindCard";

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

  const {
    temperature,
    windspeed,
    weatherIcon: { title, SvgIcon },
  } = transformedClimateData(weatherData);

  return (
    <footer className="bg-footer h-20 flex gap-5 justify-center items-center lg:h-26">
      <ul className="flex gap-5">
        <li className="bg-background rounded-lg size-12 lg:size-14">
          <StandardButton
            variant="geoLocation"
            isEnabled={true}
            onClick={getCurrentPosition}
            children={
              <GeoLocationIcon className="fill-background w-full h-full " />
            }
          />
        </li>
        <WeatherCard key="icon">
          <SvgIcon aria-label={title} className="h-[140%]" />
        </WeatherCard>

        <WeatherCard key="temperature">
          <p className="text-4xl text-white">{temperature} °C</p>
        </WeatherCard>

        <WeatherCard column={true} key="wind">
          <WindCard size="icon">
            <WindIcon className="h-[150%]" />
          </WindCard>
          <WindCard size="speed">
            <p className="text-2xl text-white">{windspeed} k/m</p>
          </WindCard>
        </WeatherCard>
      </ul>
    </footer>
  );
};

/** */
