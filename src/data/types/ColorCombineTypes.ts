import { ColorNameType, ColorNameArrayType } from "./ClothesTypes";

export type CombineColorsApiResponse = {
  clothes: CombineColorsClothesType;
  shoes: ColorNameArrayType;
};

export type CombineColorsClothesType = {
  top: ColorNameType;
  pants: ColorNameType;
  coat: ColorNameType;
};
