import { ColorNameType } from "./clothes.types";

export type CombineColorsType = {
  clothes: CombineColorsClothes;
  footwear: ColorNameType[];
};

export type CombineColorsClothes = {
  top: ColorNameType;
  pants: ColorNameType;
  coat: ColorNameType;
};

export type CombineColorsShallow = Omit<CombineColorsType, "clothes"> & {
  clothes: object;
};
