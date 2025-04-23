import IsObjectRecord from "../genericValidators/IsObjectRecord";
import HasValidKey from "../genericValidators/HasValidKey";

const IsValidWeatherObject = <T>(object: unknown, key: string): object is T => {
  return IsObjectRecord(object) && HasValidKey(key, "number", object);
};

export default IsValidWeatherObject;
