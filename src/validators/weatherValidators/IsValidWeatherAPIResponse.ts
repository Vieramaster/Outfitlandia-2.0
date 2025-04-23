import IsObjectRecord from "../genericValidators/IsObjectRecord";
import IsValidKeys from "../genericValidators/IsValidKeys";
import IsValidWeatherObject from "./IsValidWeatherObject";
import IsValidWeatherArray from "./IsValidWeatherArray";

interface MainWeatherProps {
  temp: number;
}

interface WindWeatherProps {
  windspeed: number;
}

interface WeatherAPIResponse {
  main: MainWeatherProps;
  wind: WindWeatherProps;
  weather: unknown[];
}

const requiredWeatherKeys = ["main", "weather", "wind"] as const;

const IsValidWeatherAPIResponse = (
  objectData: unknown
): objectData is WeatherAPIResponse => {
  if (!IsObjectRecord(objectData)) return false;
  

};

export default IsValidWeatherAPIResponse;
