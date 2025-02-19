export interface mainImages {
  top: string;
  coat: string;
  pants: string;
  belt: string;
  shoes: string;
}

export interface ClothesColor {
  colorName: string;
  hex: string;
  title: string;
  imageColor: string;
}

export interface Product {
  garment: string;
  name: string;
  image: string;
  css: string;
  style: string[];
  weather: string[];
  colors: ClothesColor[];
}
