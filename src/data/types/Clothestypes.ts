//GARMENT DATA
export interface ColorClothesProps {
  colorName: string;
  hex: string;
  title: string;
  imageColor: string;
}
export type GarmentKeyType = "top" | "coat" | "pants";
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


export interface MainButtonsProps {
  top: string;
  coat: string;
  pants: string;
  belt: string;
  shoes: string;
}
