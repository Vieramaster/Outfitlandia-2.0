//TYPES && MESSAGES
import { ERROR_MESSAGES_OUTFIT } from "../../data/types/ValidatorResultType";
import { ClothesType, GarmentKeyType } from "../../data/types/ClothesTypes";
import { CombineColorsApiResponse } from "../../data/types/ColorCombineTypes";
//VALIDATORS
import { isValidClothesApiResponse } from "../../validators/garmentsValidators/isValidClothesApiResponse";
import { isValidCombineColorsApiResponse } from "../../validators/combineColorsValidators/isValidCombineColorsApiResponse";
import { isValidArrayColorClothes } from "../../validators/garmentsValidators/isValidArrayColorClothes";
//FUNCTIONS
import { searchFilter } from "./genericFunctions/searchFilter";
import { filterStyleAndWheater } from "./genericFunctions/filterStyleAndWheater";
import Outfit from "./outfit";
import { isNonEmptyArray } from "../../validators/genericValidators/isNonEmptyArray";

/**
 * @param clothesData  - Clothing fetch array, it will be used to search for combinations
 * @param selectedGarment  - the clothes that the user has selected
 * @param ColorCombination - the color of clothing that the user has selected
 * @returns - It grants a clothing combination based on the color and garment chosen by the user, said combination being aligned with respect to the weather and style of the garment
 */

export const outfitCreator = (
  clothesData: ClothesType[],
  selectedGarment: ClothesType[],
  colorCombination: CombineColorsApiResponse[]
) => {
  if (!isValidClothesApiResponse(selectedGarment)) {
    console.error(ERROR_MESSAGES_OUTFIT.MISSING_DATA);
    return [];
  }

  if (!isNonEmptyArray(selectedGarment) || !selectedGarment[0]) return [];

  // DESTRUCTURING OF ENTERED DATA
  const {
    garment: MAIN_GARMENT,
    colors: MAIN_COLORS,
    weather: MAIN_WEATHER,
    style: MAIN_STYLE,
  } = selectedGarment[0] as ClothesType;

  // the clothes that are not chosen are filtered
  const filteredClothes = searchFilter(
    clothesData,
    "garment",
    MAIN_GARMENT,
    true
  );

  // Matches are found for style and weather and the rest is filtered out.
  const clothesClassFiltering = filterStyleAndWheater(
    filteredClothes,
    MAIN_STYLE,
    MAIN_WEATHER
  );

  if (!isValidArrayColorClothes(MAIN_COLORS)) {
    console.error(ERROR_MESSAGES_OUTFIT.MISSING_COLORNAME);
    return [];
  }
  const garmentKey = MAIN_GARMENT as GarmentKeyType;

  // the colors are filtered based on the color of the chosen clothing
  const filteredColors = colorCombination.filter(
    ({ clothes }) => clothes[garmentKey] === MAIN_COLORS[0].colorName
  );

  //Create outfit
  const returnImages = Outfit(
    filteredColors,
    clothesClassFiltering,
    garmentKey,
    selectedGarment[0]
  );
  return returnImages ?? [];
};
