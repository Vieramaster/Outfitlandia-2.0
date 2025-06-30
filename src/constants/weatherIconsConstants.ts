//BOTH
import { HeavyRainIcon } from "../components/icons/weather/both/HeavyRainIcon";
import { HeavySnowIcon } from "../components/icons/weather/both/HeavySnowIcon";
import { ModerateThunderStormIcon } from "../components/icons/weather/both/ModerateThunderStormIcon";
import { OvercastIcon } from "../components/icons/weather/both/OvercastIcon";
import { ModerateRainIcon } from "../components/icons/weather/both/ModerateRainIcon";
import { LightRainIcon } from "../components/icons/weather/both/LightRainIcon";
import { ModerateDrizzleIcon } from "../components/icons/weather/both/ModerateDrizzleIcon";
import { DenseDrizzleIcon } from "../components/icons/weather/both/DenseDrizzle.Icon";
import { LightThunderStormDayIcon } from "../components/icons/weather/day/LightThunderStormDayIcon";

//DAY
import { ClearSkyDayIcon } from "../components/icons/weather/day/ClearSkyDayIcon";
import { ModerateFreezingIcon } from "../components/icons/weather/both/ModerateFreezingIcon";
import { DenseFreezingIcon } from "../components/icons/weather/day/DenseFreezingDayIcon";
import { LightDrizzleDayIcon } from "../components/icons/weather/day/LightDrizzleDayIcon";
import { LightFreezingDayIcon } from "../components/icons/weather/day/LightFreezingDayIcon";
import { MainlyClearDayIcon } from "../components/icons/weather/day/MainlyClearDayIcon";
import { PartlyCloudyDayIcon } from "../components/icons/weather/day/PartlyCloudyDayIcon";
import { LightSnowIcon } from "../components/icons/weather/both/LightSnowIcon";
import { ModerateSnowIcon } from "../components/icons/weather/both/ModerateSnowIcon";
import { FogIcon } from "../components/icons/weather/both/FogIcon";
import { RimeFrogIcon } from "../components/icons/weather/both/RimeFrogIcon";
import { HeavySnowShowersIcon } from "../components/icons/weather/both/HeavySnowShowersIcon";
import { ModerateSnowShowersIcon } from "../components/icons/weather/both/ModerateSnowShowersIcon";
import { LightSnowShowersIcon } from "../components/icons/weather/day/LightSnowShowersIcon";

//NIGHT
import { ClearSkyNightIcon } from "../components/icons/weather/night/ClearSkyNightIcon";
import { MainlyClearNightIcon } from "../components/icons/weather/night/MainlyClearNightIcon";
import { PartlyCloudyNightIcon } from "../components/icons/weather/night/PartlyCloudyNightIcon";
import { LightDrizzleNightIcon } from "../components/icons/weather/night/LightDrizzleNightIcon";
import { LightFreezingNightIcon } from "../components/icons/weather/night/LightFreezingNightIcon";

/**
 * A React component that renders an SVG icon.
 * This type accepts the standard props of an <svg> element.
 */
type IconComponent = (
  props: React.SVGProps<SVGSVGElement>
) => React.ReactElement;

/**
 * Describes the icons associated with a weather code.
 *
 * @property {string} title - Description of the climate.
 * @property {IconComponent} [shared] - SVG icon used for any time of day (day/night).
 * @property {IconComponent} [day] - Exclusive icon for the day.
 * @property {IconComponent} [night] - Exclusive icon for the night.
 */
type ObjectIconType = {
  title: string;
  shared?: IconComponent;
  day?: IconComponent;
  night?: IconComponent;
};

/**
 * Map of weather codes (based on an API) to their corresponding descriptions and SVG icons.
 *
 * The key is the `weatherCode` number (e.g., 0, 1, 45, etc.), and the value is an object with:
 * - `title`: a description of the weather
 * - one or more icons representing that weather, depending on the time of day
 *
 * @type {Record<number, ObjectIconType>}
 */
export const weatherIcons: Record<number, ObjectIconType> = {
  0: { title: "clear sky", day: ClearSkyDayIcon, night: ClearSkyNightIcon },
  1: {
    title: "mainly clear",
    day: MainlyClearDayIcon,
    night: MainlyClearNightIcon,
  },
  2: {
    title: "partly cloudy",
    day: PartlyCloudyDayIcon,
    night: PartlyCloudyNightIcon,
  },
  3: { title: "overcast", shared: OvercastIcon },
  45: { title: "fog", shared: FogIcon },
  48: { title: "rime fog", shared: RimeFrogIcon },
  51: {
    title: "light drizzle",
    day: LightDrizzleDayIcon,
    night: LightDrizzleNightIcon,
  },
  53: { title: "moderate drizzle", shared: ModerateDrizzleIcon },
  55: { title: "dense drizzle", shared: DenseDrizzleIcon },
  56: { title: "light rain", shared: LightRainIcon },
  57: { title: "moderate rain", shared: ModerateRainIcon },
  61: { title: "heavy rain", shared: HeavyRainIcon },
  63: {
    title: "light freezing",
    day: LightFreezingDayIcon,
    night: LightFreezingNightIcon,
  },
  65: { title: "moderate freezing", shared: ModerateFreezingIcon },
  66: { title: "dense freezing", shared: DenseFreezingIcon },
  67: { title: "light snow fall", shared: LightSnowIcon },
  71: { title: "moderate snow fall", shared: ModerateSnowIcon },
  73: { title: "heavy snow fall", shared: HeavySnowIcon },
  75: { title: "light rain showers", shared: LightRainIcon },
  77: { title: "moderate rain showers", shared: ModerateRainIcon },
  80: { title: "violent rain showers", shared: HeavyRainIcon },
  81: { title: "light snow showers", shared: LightSnowShowersIcon },
  82: { title: "moderate snow showers", shared: ModerateSnowShowersIcon },
  85: { title: "heavy snow showers", shared: HeavySnowShowersIcon },
  86: { title: "light thunderstorm", shared: LightThunderStormDayIcon },
  95: { title: "moderate thunderstorm", shared: ModerateThunderStormIcon },
};
