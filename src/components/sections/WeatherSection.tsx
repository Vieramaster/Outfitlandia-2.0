import { useFetch } from "../../hooks/useFetch";
import { WeatherStatsContainer } from "../containers/WheaterStatsContainer";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;
let latLocation = ""
let lonLocation = ""

const weatherLocation = `https://api.openweathermap.org/data/3.0/onecall?lat=${latLocation}&lon=${lonLocation}&units=metric&appid=${APIKEY}`;



export const WeatherSection = () => {
  return (
    <section className="bg-violet-600 w-full flex gap-5 justify-center items-center h-22 lg:w-1/12 lg:h-full lg:flex-col ">
      <WeatherStatsContainer>
        <p>20°C</p>
      </WeatherStatsContainer>
      <WeatherStatsContainer></WeatherStatsContainer>
      <WeatherStatsContainer></WeatherStatsContainer>
      <WeatherStatsContainer></WeatherStatsContainer>
    </section>
  );
};
