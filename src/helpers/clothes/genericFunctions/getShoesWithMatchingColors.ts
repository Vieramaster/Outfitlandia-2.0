import {
  ClothesType,
  ColorClothesType,
} from "../../../types/clothes/clothes.types";

/**
 * Filters an array of clothing products and returns a new list
 * with only those color combinations that match the provided colors.
 *
 * @param products - Array of clothing products
 * @param allowedColors - Array of color names to match against
 * @returns Array of clothing products each paired with a single matching color
 */
export const getShoesWithMatchingColors = (
  products: ClothesType[],
  allowedColors: ColorNameArrayType
): ClothesType[] =>
  products.flatMap((product) => {
    if (!product.colors.length) return [];

    const matchedColors = filterColorsByAllowedList(
      product.colors,
      allowedColors
    );
    return mapProductToEachColor(product, matchedColors);
  });

/* ------------------------ Internal helpers ------------------------ */

/**
 * Returns only those ColorClothesType entries whose colorName
 * appears in the allowedColors list.
 */
const filterColorsByAllowedList = (
  colors: ColorClothesType[],
  allowedColors: ColorNameArrayType
): ColorClothesType[] =>
  colors.filter((c) => allowedColors.includes(c.colorName));

/**
 * Produces a new array of ClothesType objects, each with exactly one color
 * from the filtered list.
 */
const mapProductToEachColor = (
  product: ClothesType,
  colors: ColorClothesType[]
): ClothesType[] =>
  colors.map((color) => ({
    ...product,
    colors: [color],
  }));
