import { ClothesType } from "../../data/types/ClothesTypes";

/**
 * This function takes an array of clothing products and filters them based on the provided color combinations.
 * It returns a new array containing only the products that match the specified colors.
 *
 * @param array - The array of clothing products
 * @param combineColor - The color combinations to filter by
 * @returns - The array of clothing products with the specified colors
 */

export const FlatMapObjectShoe = (
  array: ClothesType[],
  combineColor: string[]
): ClothesType[] =>
  array.flatMap((product) => {
    const result = product.colors
      .filter((color) => combineColor
      .includes(color.colorName))
      .map((color) => {
        return {
          ...product,
          colors: [color],
        };
      });
    return result as ClothesType[];
  });
