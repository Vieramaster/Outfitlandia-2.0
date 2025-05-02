import { ClothesType, ClothesListObject } from "../../data/types/ClothesTypes";



export const SearchMatchColors = (
  objectColors: Record<string, string>,
  arrayClothes: ClothesType[]
) =>
  Object.entries(objectColors).reduce(
    (acc, [garmentColor, designatedColor]) => {
      const filteredItems = arrayClothes
        .filter(
          ({ garment, colors }) =>
            garment === garmentColor &&
            colors.some(
              ({ colorName }) =>
                colorName.toLowerCase() === designatedColor.toLowerCase()
            )
        )
        .map((item) => ({
          ...item,
          colors: item.colors.filter(
            (color) =>
              color.colorName.toLowerCase() === designatedColor.toLowerCase()
          ),
        }));

      acc[garmentColor] = filteredItems;
      return acc;
    },
    {} as ClothesListObject
  );
