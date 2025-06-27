import { isPlainObject } from "../../../utils/validators/isPlainObject";
/**
 *  * Schema definition for validating the `current_weather` section of the weather API.
 *
 * Each entry specifies:
 *   - field: the key expected on the object
 *   - validate: a function to verify the runtime type and constraints for that field
 *
 * Intended usage:
 *   This schema is meant to be passed to a generic object validator (e.g. `validateSchemaKeys`),
 *   which ensures:
 *     1. The object contains all expected keys
 *     2. Each value passes its associated validation rule
 *
 *
 * Fields and their expected constraints:
 *   - current_weather:    must be a plain object (to be validated with WEATHER_CURRENT_WEATHER_SCHEMA)

 */

export const WEATHER_API_SCHEMA = [
  { field: "current_weather", validate: (v: unknown) => isPlainObject(v) },
];

/**
 * Schema definition for validating the nested `clothes` object
 * inside a color combination.
 *
 * Fields and their expected constraints:
 *   - is_day:         must be a number (day: 1, night: 0).
 *   - temperature:    must be a number.
 *   - windspeed:      must be a number.
 *   - weathercode:    must be a number (weather state).
 *
 *    weathercode meanings:
 *   - Clear sky                  0
 *   - Partly cloudy              1, 2, 3
 *   - Fog                        45, 48
 *   - Drizzle                    51–67
 *   - Light snow                 71–77
 *   - Moderate rain              80–82
 *   - Thunderstorm               95–99
 */

export const WEATHER_CURRENT_SCHEMA = [
  { field: "is_day", validate: (v: unknown) => typeof v === "number" },
  { field: "temperature", validate: (v: unknown) => typeof v === "number" },
  { field: "windspeed", validate: (v: unknown) => typeof v === "number" },
  { field: "weathercode", validate: (v: unknown) => typeof v === "number" },
];
