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
