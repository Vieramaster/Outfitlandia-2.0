//BOTH
import { HeavyRainIcon } from "../components/icons/weather/both/HeavyRainIcon";
import { HeavySnowIcon } from "../components/icons/weather/both/HeavySnowIcon";
import { HeavyThunderStormhailIcon } from "../components/icons/weather/both/HeavyThunderStormhailIcon";
import { ModerateThunderStormIcon } from "../components/icons/weather/both/ModerateThunderStormIcon";
import { OvercastIcon } from "../components/icons/weather/both/OvercastIcon";
import { ModerateRainIcon } from "../components/icons/weather/both/ModerateRainIcon";
import { LightRainIcon } from "../components/icons/weather/both/LightRainIcon";

import { SnowGrainsIcon } from "../components/icons/weather/both/SnowGrainsIcon";
import { LightThunderStormDayIcon } from "../components/icons/weather/day/LightThunderStormDayIcon";
import { LightThunderStromHailIcon } from "../components/icons/weather/both/LightThunderStromHailIcon";

//DAY
import { ClearSkyDayIcon } from "../components/icons/weather/day/ClearSkyDayIcon";
import { DenseDrizzleDayIcon } from "../components/icons/weather/day/DenseDrizzleDayIcon";
import { ModerateFreezingIcon } from "../components/icons/weather/both/ModerateFreezingIcon";
import { DenseFreezingIcon } from "../components/icons/weather/day/DenseFreezingDayIcon";
import { LightDrizzleDayIcon } from "../components/icons/weather/day/LightDrizzleDayIcon";
import { LightFreezingDayIcon } from "../components/icons/weather/day/LightFreezingDayIcon";
import { MainlyClearDayIcon } from "../components/icons/weather/day/MainlyClearDayIcon";
import { ModerateDrizzleDayIcon } from "../components/icons/weather/day/ModerateDrizzleDayIcon";
import { PartyCloudyDayIcon } from "../components/icons/weather/day/PartyCloudyDay";
import { LightSnow } from "../components/icons/weather/both/LightSnow";
import { ModerateSnow } from "../components/icons/weather/both/ModerateSnow";
import { Fog } from "../components/icons/weather/both/Fog";
import { RimeFrog } from "../components/icons/weather/both/RimeFog";

type ObjectIconType = {
  component: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  title: string;
};

export const dayWeatherIcons: Record<number, ObjectIconType> = {
  0: { component: ClearSkyDayIcon, title: "clear sky" },
  1: { component: MainlyClearDayIcon, title: "mainly clear" },
  2: { component: PartyCloudyDayIcon, title: "partly cloudy" },
  3: { component: OvercastIcon, title: "overcast" },
  45: { component: Fog, title: "fog" }, //
  48: { component: RimeFrog, title: "rime fog" }, //
  51: { component: LightDrizzleDayIcon, title: "light drizzle" }, //
  53: { component: ModerateDrizzleDayIcon, title: "moderate drizzle" }, //
  55: { component: DenseDrizzleDayIcon, title: "dense drizzle" }, //
  56: { component: LightRainIcon, title: "light rain" }, //
  57: { component: ModerateRainIcon, title: "moderate rain" }, //
  61: { component: HeavyRainIcon, title: "heavy rain" }, //
  63: { component: LightFreezingDayIcon, title: "light freezing" }, //
  65: { component: ModerateFreezingIcon, title: "moderate freezing" }, //
  66: { component: DenseFreezingIcon, title: "dense freezing" },//
  67: { component: LightSnow, title: "light snow fall" },//
  71: { component: ModerateSnow, title: "moderate snow fall" },
  73: { component: HeavySnowIcon, title: "heavy snow fall" },//
  86: { component: LightThunderStormDayIcon, title: "light thunderstorm" },//
  95: { component: ModerateThunderStormIcon, title: "moderate thunderstorm" },//
  96: {
    component: LightThunderStromHailIcon,
    title: "light hail thunderstorm",
  },
  99: {
    component: HeavyThunderStormhailIcon,
    title: "heavy hail thunderstorm",
  },
};

/**
 *   75: { component: , title: "light rain showers" },
  77: { component: "", title: "moderate	rain showers" },
  80: { component: "", title: "violent rain showers" },
  81: { component: "", title: "light snow showers" },
  82: { component: "", title: "moderate snow showers" },
  85: { component: "", title: "heavy snow showers" },
 */
