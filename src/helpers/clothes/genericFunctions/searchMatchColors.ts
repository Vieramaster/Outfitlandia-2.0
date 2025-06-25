import {
  ClothesType,
  ClothesListObject,
  ColorNameType,
} from "../../../types/clothes/clothes.types";

/**
 * Builds a mapping from garment keys to the list of clothes items
 * whose colors match the specified target color for that garment.
 *
 * @param colorMap - An object whose keys are garment identifiers and whose values are the desired color name
 * @param allClothes - The complete array of clothing items to filter
 * @returns A ClothesListObject where each garment key maps to an array of ClothesType items filtered by color
 */
export const searchMatchColors = (
  colorMap: Record<string, ColorNameType>,
  allClothes: ClothesType[]
): ClothesListObject =>
  Object.entries(colorMap).reduce<ClothesListObject>(
    (result, [garmentKey, targetColor]) => {
      const matchingItems = filterByGarmentAndColor(
        allClothes,
        garmentKey,
        targetColor
      );
      result[garmentKey] = narrowToColor(matchingItems, targetColor);
      return result;
    },
    {} as ClothesListObject
  );

/* ───── Internal helpers ───── */

/**
 * Filters the clothes array to items matching both the garment type
 * and containing the target color in their colors list.
 */
const filterByGarmentAndColor = (
  clothes: ClothesType[],
  garmentKey: string,
  targetColor: ColorNameType
): ClothesType[] =>
  clothes.filter(
    ({ garment, colors }) =>
      garment === garmentKey &&
      colors.some(
        ({ colorName }) => colorName.toLowerCase() === targetColor.toLowerCase()
      )
  );

/**
 * For each ClothesType in the array, restrict its `colors` array
 * to only the entries matching the targetColor.
 */
const narrowToColor = (
  items: ClothesType[],
  targetColor: ColorNameType
): ClothesType[] =>
  items.map((item) => ({
    ...item,
    colors: item.colors.filter(
      ({ colorName }) => colorName.toLowerCase() === targetColor.toLowerCase()
    ),
  }));
