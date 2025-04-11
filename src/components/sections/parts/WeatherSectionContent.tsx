import { WeatherStatsContainer } from "../../containers/WeatherStatsContainer";
import { WeatherIconList } from "../../../data/listObjects/WeatherIconList";
import { TransformedWeatherDataProps } from "../../../data/types/ClothesTypes";

interface WeatherSectionContentPros {
  weatherArray: TransformedWeatherDataProps;
}
export const WeatherSectionContent = ({
  weatherArray,
}: WeatherSectionContentPros) => {
  return (
    <>
      <WeatherStatsContainer label={"weather icon"}>
        <img
          aria-label={weatherArray.description}
          src={WeatherIconList[weatherArray.icon] || WeatherIconList["01d"]}
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
          src={WeatherIconList.wind || "x"}
          className="w-full h-1/2"
        />
        <p>{weatherArray.windSpeed} km/h</p>
      </WeatherStatsContainer>
    </>
  );
};
