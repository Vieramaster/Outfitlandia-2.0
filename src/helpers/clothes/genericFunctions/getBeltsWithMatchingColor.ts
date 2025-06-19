import {
  ClothesType,
  ColorNameType,
} from "../../../types/clothes/clothes.types";

/**
 * For each belt in the inventory, picks the color swatch that best matches the shoe color.
 * If the pants type is a jogging style, returns each belt with no colors (belts aren’t used).
 * Otherwise, attempts to match the shoeColor; if no match, falls back to “black”.
 *
 * @param belts        – available belt products
 * @param pantsType    – the current pants style (e.g. "joggin", "bermuda joggin")
 * @param shoeColor    – the colorName of the chosen shoe
 * @returns an array of belt products, each with exactly one matching color (or empty for joggin)
 */
export const getBeltsWithMatchingColor = (
  belts: ClothesType[],
  pantsType: string,
  shoeColor: ColorNameType
): ClothesType[] =>
  belts
    .map((belt) => {
      if (pantsType === "joggin" || pantsType === "bermuda joggin") {
        // No belt needed for joggin styles
        return { ...belt, colors: [] };
      }

      const match =
        findMatchingColor(belt, shoeColor) ?? findMatchingColor(belt, "black");
      return match ? { ...belt, colors: [match] } : null;
    })
    .filter((b): b is ClothesType => b !== null);

/* ───── Internal helper ───── */

/**
 * Finds a color swatch on the belt that matches the requested colorName .
 */
const findMatchingColor = (belt: ClothesType, desiredColor: ColorNameType) =>
  belt.colors.find(
    ({ colorName }) => colorName.toLowerCase() === desiredColor.toLowerCase()
  );
