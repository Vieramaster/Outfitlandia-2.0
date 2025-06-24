//TYPES
import { CombineColorsType } from "../../types/clothes/combineColors.types";
import { ClothesType } from "../../types/clothes/clothes.types";
import { getRandomElement } from "../../utils/getRandomElement";

/**
 * Generates a clothing outfit based on the user's selected colors and garments.
 *
 * @param combineColorsData - An array of color combination objects.
 * @param clothesData - An array of garment objects to search within.
 * @param selectedGarment - The main garment object selected by the user.
 * @returns An array of MainButtonsProps representing the generated outfit, or undefined if no valid combination is found.
 */

const MAX_ATTEMPTS = 400;
const MAX_ATTEMPTS_REACHED = "Reached maximum attempts";

export const createOutfit = (
  clothesData: ClothesType[],
  combineColorsData: CombineColorsType[],
  selectedGarment: ClothesType
) => {
  //desesctructuro la prenda seleccionada para manejar mejor los datos
  const { garment: SELECTED_GARMENT_ID, colors: SELECTED_GARMENT_COLOR } =
    selectedGarment;

  if (!SELECTED_GARMENT_COLOR[0]) return;

  const { colorName: SELECTED_GARMENT_COLORNAME } = SELECTED_GARMENT_COLOR[0];

  //creo un bucle donde aleatoriamente elije un una combinacion al azar y trada luego de buscar las prendas que coincidan con los colores dados
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    //
    const filteredCombineColors = combineColorsData.every(
      (item) => item.clothes.top === SELECTED_GARMENT_COLORNAME
    );
  }
  const filteredCombineColors = combineColorsData.every(
    (item) => item.clothes.top === SELECTED_GARMENT_COLORNAME
  );
  console.log(filteredCombineColors);
};
