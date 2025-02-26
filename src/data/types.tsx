//GARMENT DATA
export interface ColorClothesProps {
  colorName: string;
  hex: string;
  title: string;
  imageColor: string;
}

export interface ClothesProps {
  id: number;
  garment: string;
  name: string;
  image: string;
  style: string[];
  weather: string[];
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
