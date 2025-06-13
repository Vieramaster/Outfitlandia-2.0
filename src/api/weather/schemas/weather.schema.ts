//FUNCTIONS
import { isPlainObject } from "../../../shared/validators/isPlainObject";
import { isOneOf } from "../../validators/object_validations/isOneOf";
import { isNonEmptyArray } from "../../../shared/validators/isNonEmplyArray";
//ARRAY_VALIDATORS
import { iconWeatherKeys } from "../../../shared/types/weather/weatherTypeObjects";
import { descriptionWeatherKeys } from "../../../shared/types/weather/weatherTypeObjects";

/**
 * Schema definition for validating the top-level structure of a weather API response.
 *
 * Each entry specifies:
 *   - field: the key name expected on the object
 *   - validate: a function that checks at runtime if the value at that key
 *               meets the required shape or constraints.
 *
 * Intended use:
 *   Pass this array into a generic validation function (e.g., validateSchemaKeys)
 *   which will:
 *     1. Check that each field exists on the object
 *     2. Run the corresponding validate(...) function and push a ValidationIssue if it returns false
 *
 * Notes:
 *   - The `current` property is expected to be a plain object.
 *   - Further validation of its inner structure is performed using `WEATHER_CURRENT_SCHEMA`.
 */
export const WEATHER_API_SCHEMA = [
  { field: "current", validate: (v: unknown) => isPlainObject(v) },
];

/**
 * Schema definition for validating the `current` section of the weather API.
 *
 * Fields and their expected constraints:
 *   - temp:         must be a number (temperature).
 *   - wind_speed:   must be a number (wind speed).
 *   - weather:      must be a non-empty array (individual elements validated separately using *`WEATHER_VISUAL_SCHEMA`).
 */
export const WEATHER_CURRENT_SCHEMA = [
  { field: "temp", validate: (v: unknown) => typeof v === "number" },
  { field: "wind_speed", validate: (v: unknown) => typeof v === "number" },
  {
    field: "weather",
    validate: (v: unknown) => isNonEmptyArray(v),
  },
];

/**
 * Schema definition for validating items in the `weather` array inside the `current` object.
 *
 * Fields and their expected constraints:
 *   - icon:         must be a string present in `iconWeatherKeys`
 *   - description:  must be a string present in `descriptionWeatherKeys`
 */
export const WEATHER_VISUAL_SCHEMA = [
  { field: "icon", validate: (v: unknown) => isOneOf(v, iconWeatherKeys) },
  {
    field: "description",
    validate: (v: unknown) => isOneOf(v, descriptionWeatherKeys),
  },
];
