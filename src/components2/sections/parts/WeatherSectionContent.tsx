import { WeatherStatsContainer } from "../../containers/WeatherStatsContainer";
import { CurrentWeatherAPI } from "../../../data/types/WeatherTypes";
//DATA
import { iconWeathers } from "../../../constants/weatherIconsConstants";

interface WeatherSectionContentPros {
  weatherArray: CurrentWeatherAPI;
}
export const WeatherSectionContent = ({
  weatherArray,
}: WeatherSectionContentPros) => {
  const { description, icon, windSpeed, temperature } = weatherArray;
  return (
    <>
      <WeatherStatsContainer label={"weather icon"}>
        <img
          aria-label={description}
          src={iconWeathers[icon]}
          alt={description}
          className="w-5/6 h-5/6"
        />
      </WeatherStatsContainer>

      <WeatherStatsContainer label={"temperature"}>
        <p>{temperature}°C</p>
      </WeatherStatsContainer>

      <WeatherStatsContainer label={"wind speed"}>
        <img
          aria-label={"winter icon"}
          src={iconWeathers.wind}
          className="w-full h-1/2"
        />
        <p>{windSpeed} km/h</p>
      </WeatherStatsContainer>
    </>
  );
};
