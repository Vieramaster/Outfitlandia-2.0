import {
  garmentsKeys,
  styleKeys,
  weatherKeys,
  colorNameKeys,
  hexColorKeys,
  titleColorKeys,
} from "./arrayTypes";

export type ClothesType = {
  id: number;
  garment: GarmentType;
  name: string;
  image: string;
  style: StyleType[];
  weather: WeatherType[];
  colors: ColorClothesType[];
};

export type GarmentType = (typeof garmentsKeys)[number];
export type StyleType = (typeof styleKeys)[number];
export type WeatherType = (typeof weatherKeys)[number];

export type ColorClothesType = {
  colorName: ColorNameType;
  hex: HexType;
  title: TitleColorType;
  imageColor: string;
};

export type ColorNameType = (typeof colorNameKeys)[number];
export type HexType = (typeof hexColorKeys)[number];
export type TitleColorType = (typeof titleColorKeys)[number];

export type MainButtonsProps = {
  top: string;
  coat: string;
  pants: string;
  belt: string;
  shoes: string;
};

export type ListStructureType = Record<string, ClothesType>;
export type ClothesListObject = Record<string, ClothesType[]>;
