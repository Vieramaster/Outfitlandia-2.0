//TYPES
import { CombineColorsType } from "../../types/clothes/combineColors.types";
import {
  ClothesType,
  GarmentButtonType,
  GarmentType,
} from "../../types/clothes/clothes.types";
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
  const { garment, colors: SELECTED_GARMENT_COLOR } = selectedGarment;

  const SELECTED_GARMENT = garment as GarmentButtonType;

  if (!SELECTED_GARMENT_COLOR[0]) return;

  const { colorName: SELECTED_GARMENT_COLORNAME } = SELECTED_GARMENT_COLOR[0];

  const filteredCombineColors = combineColorsData.filter(
    ({ clothes }) => clothes[SELECTED_GARMENT] === SELECTED_GARMENT_COLORNAME
  );

  //creo un bucle donde aleatoriamente elije un una combinacion al azar y trada luego de buscar las prendas que coincidan con los colores dados
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const randomColor = getRandomElement(filteredCombineColors);
  }

  const randomColor = getRandomElement(filteredCombineColors);

  if (!randomColor) return;

  const { clothes, shoes } = randomColor;

  const excludeSelectedGarment = ["top", "coat", "pants"].filter(
    (item) => item !== SELECTED_GARMENT
  );

  const otherGarments = (index: number) =>
    excludeSelectedGarment[index]! as GarmentButtonType;

  const lala = clothesData.filter(
    ({ garment }) => garment === otherGarments(0)
  );
  const fafa = lala.filter((item) =>
    item.colors.some((item) => item.colorName === clothes[otherGarments(0)])
  );
  console.log(lala, clothes[otherGarments(0)]);
};

