//GARMENT DATA

export type ListStructureType = Record<string, ClothesType>;
export type ClothesListObject = Record<string, ClothesType[]>;



export type GarmentType = (typeof garmentsKeys)[number];
export type StyleType = (typeof styleKeys)[number];
export type WeatherType = (typeof weatherKeys)[number];
export type GarmentKeyType = (typeof RequiredKeys)[number];


export type RawClothes = Omit<ClothesType, "colors"> & {
  colors: unknown[];
};

export type ClothesType = {
  id: number;
  garment: GarmentType;
  name: string;
  image: string;
  style: StyleType[];
  weather: WeatherType[];
  colors: ColorClothesType[];
};

export type ColorNameType = (typeof colorNameKeys)[number];
export type ColorNameArrayType = ColorNameType[];
export type HexType = (typeof hexColorKeys)[number];
export type TitleColorType = (typeof titleColorKeys)[number];

export type ColorClothesType = {
  colorName: ColorNameType;
  hex: HexType;
  title: TitleColorType;
  imageColor: string;
};

export type MainButtonsProps = {
  top: string;
  coat: string;
  pants: string;
  belt: string;
  shoes: string;
};
export const RequiredKeys =  ["id", "garment", "name", "image", "style", "weather", "colors"] as const;
export const garmentsKeys = ["top", "coat", "pants", "shoes", "belt"] as const;
export const styleKeys = ["basic", "casual", "elegant"] as const;
export const weatherKeys = ["cold", "mild", "hot"] as const;

export const colorNameKeys = [
  "purple",
  "lilac",
  "aero",
  "navy",
  "frenchBlue",
  "skyBlue",
  "aquamarine",
  "emerald",
  "army",
  "yellow",
  "mustard",
  "orange",
  "windsorTan",
  "chocolate",
  "camel",
  "beige",
  "white",
  "lightGrey",
  "darkGrey",
  "black",
  "burgundy",
  "red",
  "babyPink",
  "oldPink",
  "salmon",
  "wornBlack",
] as const;

export const hexColorKeys = [
  "#5f2f82",
  "#c9b8e1",
  "#53718d",
  "#272b41",
  "#2c81d4",
  "#afd8eb",
  "#85d5dc",
  "#07463e",
  "#5f6053",
  "#efbe3d",
  "#be7b17",
  "#ea8510",
  "#a47850",
  "#493327",
  "#c19a6b",
  "#cbbba5",
  "#ffffff",
  "#c7c8ca",
  "#4a4855",
  "#000000",
  "#5e2a30",
  "#9f0317",
  "#dfc2be",
  "#966c6f",
  "#f0938a",
  "#2d2d2d",
] as const;

export const titleColorKeys = [
  "purple",
  "lilac",
  "aero",
  "navy",
  "french blue(2°)",
  "sky blue",
  "aquamarine",
  "emerald",
  "green army",
  "yellow",
  "mustard",
  "orange",
  "windsor tan",
  "chocolate",
  "camel",
  "beige",
  "white",
  "light grey",
  "dark grey",
  "black",
  "burgundy",
  "red",
  "baby pink",
  "old pink",
  "salmon",
] as const;

