//GARMENT DATA
export type ListStructureType = Record<string, ClothesProps>;
export type ClothesListObject = Record<string, ClothesProps[]>;
export type GarmentKeyType = "top" | "coat" | "pants";

export type GarmentType = "top" | "coat" | "pants" | "shoes" | "belt";
export type StyleType = "basic" | "casual" | "elegant";
export type WeatherType = "today" | "mild" | "cold";

export interface ClothesProps {
  id: number;
  garment: GarmentType;
  name: string;
  image: string;
  style: StyleType[];
  weather: WeatherType[];
  colors: ColorClothesProps[];
}

export type ColorNameType =
  | "purple"
  | "lilac"
  | "aero"
  | "navy"
  | "frenchBlue"
  | "skyBlue"
  | "aquamarine"
  | "emerald"
  | "army"
  | "yellow"
  | "mustard"
  | "orange"
  | "windsorTan"
  | "chocolate"
  | "camel"
  | "beige"
  | "white"
  | "lightGrey"
  | "darkGrey"
  | "black"
  | "burgundy"
  | "red"
  | "babyPink"
  | "oldPink"
  | "salmon"
  | "wornBlack";

export type HexType =
  | "#5f2f82"
  | "#c9b8e1"
  | "#53718d"
  | "#272b41"
  | "#2c81d4"
  | "#afd8eb"
  | "#85d5dc"
  | "#07463e"
  | "#5f6053"
  | "#efbe3d"
  | "#be7b17"
  | "#ea8510"
  | "#a47850"
  | "#493327"
  | "#c19a6b"
  | "#cbbba5"
  | "#ffffff"
  | "#c7c8ca"
  | "#4a4855"
  | "#000000"
  | "#5e2a30"
  | "#9f0317"
  | "#dfc2be"
  | "#966c6f"
  | "#f0938a"
  | "#2d2d2d";

export type TitleColorType =
  | "purple"
  | "lilac"
  | "aero"
  | "navy"
  | "french blue(2°)"
  | "sky blue"
  | "aquamarine"
  | "emerald"
  | "green army"
  | "yellow"
  | "mustard"
  | "orange"
  | "windsor tan"
  | "chocolate"
  | "camel"
  | "beige"
  | "white"
  | "light grey"
  | "dark grey"
  | "black"
  | "burgundy"
  | "red"
  | "baby pink"
  | "old pink"
  | "salmon";

export interface ColorClothesProps {
  colorName: ColorNameType;
  hex: HexType;
  title: TitleColorType;
  imageColor: string;
}

export interface MainButtonsProps {
  top: string;
  coat: string;
  pants: string;
  belt: string;
  shoes: string;
}
