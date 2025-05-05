import { WeatherStatsContainer } from "../../containers/WeatherStatsContainer";
import {
  CurrentWeatherAPI,
  iconWeatherArray,
} from "../../../data/types/WeatherTypes";

interface WeatherSectionContentPros {
  weatherArray: CurrentWeatherAPI;
}
export const WeatherSectionContent = ({
  weatherArray,
}: WeatherSectionContentPros) => (
  <>
    <WeatherStatsContainer label={"weather icon"}>
      <img
        aria-label={weatherArray.description}
        src={iconWeatherArray[weatherArray.icon]}
        alt={weatherArray.description}
        className="w-5/6 h-5/6"
      />
    </WeatherStatsContainer>

    <WeatherStatsContainer label={"temperature"}>
      <p>{weatherArray.temperature}°C</p>
    </WeatherStatsContainer>

    <WeatherStatsContainer label={"wind speed"}>
      <img
        aria-label={"winter icon"}
        src={iconWeatherArray.wind || "x"}
        className="w-full h-1/2"
      />
      <p>{weatherArray.windSpeed} km/h</p>
    </WeatherStatsContainer>
  </>
);
