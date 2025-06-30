import { WeatherApiResponseType } from "../../types/weather/weather.types";
//CONSTANTS
import { weatherIcons } from "../../constants/weatherIconsConstants";
import { NotAvaliableIcon } from "../../components/icons/weather/NotAvaliableIcon";

export const transformedClimateData = (data: WeatherApiResponseType) => {
  const {
    current_weather: { is_day, temperature, weathercode, windspeed },
  } = data;
  const weatherIcon = getWeatherIcon(weathercode, is_day);
  return {
    ...{ temperature, windspeed, weatherIcon },
  };
};

//INTERNAL HELPER

const DefaultIcon = { title: "n/a", SvgIcon: NotAvaliableIcon };

export const getWeatherIcon = (code: number, time: number) => {
  const iconEntry = weatherIcons[code];
  if (!iconEntry) return DefaultIcon;

  if (iconEntry.shared) {
    return { title: iconEntry.title, SvgIcon: iconEntry.shared };
  }

  const SvgIcon = time === 1 ? iconEntry.day : iconEntry.night;

  if (!SvgIcon) return DefaultIcon;

  return {
    title: iconEntry.title,
    SvgIcon,
  };
};
