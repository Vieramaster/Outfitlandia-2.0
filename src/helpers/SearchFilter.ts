import { ClothesProps, ColorClothesProps } from "../data/types";
import GarmentFilterValidator from "../validators/GarmentFilterValidator";

export const SearchFilter = <K extends keyof ClothesProps>(
  array: ClothesProps[] | undefined,
  key: K,
  value: ClothesProps[K]
): ClothesProps[] | undefined => {
  if (!GarmentFilterValidator(array)) return undefined;

  return array.filter((item) => item[key] === value);
};

export const colorFilter = (
  array: ClothesProps[] | undefined,
  value: ColorClothesProps["colorName"]
): ColorClothesProps[] | undefined => {
  if (!array || !GarmentFilterValidator(array)) return undefined;

  const filteredColors = array.flatMap(({ colors }) =>
    colors.filter(({ colorName }) => colorName === value)
  );

  return filteredColors;
};
