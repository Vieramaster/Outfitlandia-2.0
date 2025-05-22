//FUNCTIONS
import { isPlainObject } from "../../../shared/validators/isPlainObject";
import { isOneOf } from "../../../shared/validators/isPlainObject";
import { isNonEmptyArray } from "../../../shared/validators/isNonEmplyArray";
//ARRAY_VALIDATORS
import { iconWeatherKeys } from "../../../shared/types/weather/weatherTypeObjects";
import { descriptionWeatherKeys } from "../../../shared/types/weather/weatherTypeObjects";

//MAIN
export const WEATHER_API_SCHEMA = [
  { field: "current", validate: (v: unknown) => isPlainObject(v) },
];

//CURRENT OBJECT
export const WEATHER_CURRENT_SCHEMA = [
  { field: "temp", validate: (v: unknown) => typeof v === "number" },
  { field: "wind_speed", validate: (v: unknown) => typeof v === "number" },
  { field: "weather", validate: (v: unknown) => isNonEmptyArray(v) },
];

//WEATHER OBJECT
export const WEATHER_VISUAL_SCHEMA = [
  { field: "icon", validate: (v: unknown) => isOneOf(v, iconWeatherKeys) },
  {
    field: "description",
    validate: (v: unknown) => isOneOf(v, descriptionWeatherKeys),
  },
];
