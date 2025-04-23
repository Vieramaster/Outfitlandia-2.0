import isNonEmptyArray from "../genericValidators/isNonEmptyArray";
import HasValidKey from "../genericValidators/HasValidKey";
import IsObjectRecord from "../genericValidators/IsObjectRecord";

interface WeatherArrayProps {
  icon: string;
  description: string;
}

const weatherAllKeys = [
  {
    key: "icon",
    value: "string",
  },
  {
    key: "description",
    value: "string",
  },
] as const;

const IsValidWeatherArray = (
  weatherArray: unknown
): weatherArray is WeatherArrayProps[] => {
  return (
    isNonEmptyArray(weatherArray) &&
    weatherArray.every((obj) => {
      return (
        IsObjectRecord(obj) &&
        weatherAllKeys.every(({ key, value }) => {
          return HasValidKey(key, value, obj);
        })
      );
    })
  );
};

export default IsValidWeatherArray;
