export interface mainImages {
  top: string;
  coat: string;
  pants: string;
  belt: string;
  shoes: string;
}

export interface ColorProductProps {
  colorName: string;
  hex: string;
  title: string;
  imageColor: string;
}

export interface productProps {
  id: number;
  garment: string;
  name: string;
  image: string;
  style: string[];
  weather: string[];
  colors: ColorProductProps[];
}
