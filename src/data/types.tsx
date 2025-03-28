//GARMENT DATA
export interface ColorClothesProps {
  colorName: string;
  hex: string;
  title: string;
  imageColor: string;
}

export type ListStructureType = Record<string, ClothesProps>;
export type ClothesListObject = Record<string, ClothesProps[]>;
export type GarmentType = "top" | "coat" | "pants" | "shoes" | "belt";
export type WeatherType = "today" | "mild" | "cold";
export type StyleType = "basic" | "casual" | "elegant";
export interface ClothesProps {
  id: number;
  garment: GarmentType;
  name: string;
  image: string;
  style: StyleType[];
  weather: WeatherType[];
  colors: ColorClothesProps[];
}

//WEATHER DATA
export interface WeatherProps {
  water: string;
}
//COMBINE COLORS DATA
export interface CombineColorsClothesProps {
  top: string;
  pants: string;
  coat: string;
}
export interface CombineColorsProps {
  combineClothes: CombineColorsClothesProps;
  combineShoes: string[];
}

//ARRAY MAIN BUTTONS
export interface MainButtonsProps {
  top: string;
  coat: string;
  pants: string;
  belt: string;
  shoes: string;
}

export interface WeatherDataProps {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: WeatherCoordinatesProps;
  dt: number;
  id: number;
  main: WeatherDataMainProps;
  name: string;
  sys: WeatherDataSysProps;
  timezone: number;
  visibility: number;
  weather: WeatherGeneralWeatherDataProps[];
  wind: WeatherWindDataProps;
}

export interface WeatherCoordinatesProps {
  lon: number;
  lat: number;
}

export interface WeatherDataMainProps {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherDataSysProps {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherGeneralWeatherDataProps {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherWindDataProps {
  speed: number;
  deg: number;
  gust: number;
}

export interface TransformedWeatherDataProps {
  temperature: number;
  icon: string;
  windSpeed: number;
  description: string;
}
