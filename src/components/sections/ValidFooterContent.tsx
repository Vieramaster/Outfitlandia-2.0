//TYPES
import { WeatherApiResponseType } from "../../types/weather/weather.types";
//COMPONENTS
import { WeatherCard } from "../ui/cards/WeatherCard";
import { WindCard } from "../ui/cards/WindCard";
import { WindIcon } from "../icons/weather/WindIcon";
//HELPERS
import { transformedClimateData } from "../../helpers/weather/transformedClimateData";

interface ValidFooterContentProps {
  data: WeatherApiResponseType;
}
export const ValidFooterContent = ({ data }: ValidFooterContentProps) => {
  const {
    temperature,
    windspeed,
    weatherIcon: { title, SvgIcon },
  } = transformedClimateData(data);

  return (
    <>
      <WeatherCard key="icon" description={title}>
        <SvgIcon aria-labelledby={title} className="h-[140%]" />
      </WeatherCard>

      <WeatherCard key="temperature" description="temperature">
        <p className=" text-xl md:text-3xl xl:text-4xl text-white">
          {temperature} °C
        </p>
      </WeatherCard>

      <WeatherCard column={true} key="wind"  description="wind speed">
        <WindCard size="icon">
          <WindIcon className="h-[110%] md:h-[150%]" />
        </WindCard>
        <WindCard size="speed">
          <p className="text-lg md:text-2xl text-white">{windspeed} k/m</p>
        </WindCard>
      </WeatherCard>
    </>
  );
};
