//TYPES
import { WeatherApiResponseType } from "../../types/weather/weather.types";
//HOOKS
import { consumeAPI } from "../../api/consumeAPI";
//FUNCTIONS
import { weatherApiValidator } from "../../api/weather/validators/weatherApiValidator";
import { useGeolocation } from "../../hooks/useGeolocation";
import { StandardButton } from "../ui/buttons/StandardButton";
import { GeoLocationIcon } from "../icons/GeoLocationIcon";
//COMPONENTS
import { ValidFooterContent } from "../sections/ValidFooterContent";
import { LoadingAndErrorFooter } from "../sections/LoadingAndErrorFooter";
import { NotAvaliableIcon } from "../icons/weather/NotAvaliableIcon";
import { LoaderIcon } from "../icons/LoaderIcon";
import { FooterSignature } from "../sections/FooterSignature";

export const Footer = () => {
  const buildWeatherUrl = (latitude: number, longitude: number): string =>
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const {
    coordinates: currentCoors,
    error: geoError,
    loading: geoLoading,
    getCurrentPosition,
  } = useGeolocation();
  console.log(currentCoors);
  const weatherURL = buildWeatherUrl(
    currentCoors.latitude,
    currentCoors.longitude
  );

  const {
    error: weatherError,
    loading: weatherLoading,
    validatedData: weatherData,
  } = consumeAPI<WeatherApiResponseType>(weatherURL, weatherApiValidator);

  const FooterContent = () => {
    if (weatherLoading || geoLoading)
      return (
        <LoadingAndErrorFooter component={<LoaderIcon className="h-5/6" />} />
      );
    if (weatherError || geoError || !currentCoors || !weatherData)
      return <LoadingAndErrorFooter component={<NotAvaliableIcon />} />;
    //Final
    return <ValidFooterContent data={weatherData} />;
  };

  return (
    <footer className="relative bg-layout min-h-26 flex flex-col gap-1 justify-end items-center place-content-center lg:justify-center">
      <ul className="flex gap-5">
        <li className="bg-background rounded-lg size-12 lg:size-14">
          <StandardButton
            variant="geoLocation"
            isEnabled={true}
            onClick={getCurrentPosition}
            children={
              <GeoLocationIcon
                className="fill-background size-5/6 lg:size-3/5 "
                aria-label="Use my current location"
              />
            }
          />
        </li>
        {<FooterContent />}
      </ul>
      <FooterSignature />
    </footer>
  );
};

/** */
