import { ColorNameType } from "./clothes.types";

export type CombineColorsType = {
  clothes: CombineColorsClothes;
  shoes: ColorNameType[];
};

export type CombineColorsClothes = {
  top: ColorNameType;
  pants: ColorNameType;
  coat: ColorNameType;
};
