//TYPES && MESSAGES
import { ERROR_MESSAGES_OUTFIT } from "../../data/types/ErrorMessages";
import { ClothesType, GarmentKeyType } from "../../data/types/ClothesTypes";
import { CombineColorsClothesType } from "../../data/types/ColorCombineTypes";
//VALIDATORS
import { isValidClothesApiResponse } from "../../validators/garmentsValidators/isValidClothesApiResponse";
import { isValidCombineColorsApiResponse } from "../../validators/combineColorsValidators/isValidCombineColorsApiResponse";
//FUNCTIONS
import SearchFilter from "./SearchFilter";
import FilterStyleAndWheater from "./FilterStyleAndWeather";
import FilterColors from "./FilterColors";
import Outfit from "./Outfit";


/**
 * @param clothesData  - Clothing fetch array, it will be used to search for combinations
 * @param selectedGarment  - the clothes that the user has selected
 * @param ColorCombination - the color of clothing that the user has selected
 * @returns - It grants a clothing combination based on the color and garment chosen by the user, said combination being aligned with respect to the weather and style of the garment
 */

export const OutfitCreator = (
  clothesData: ClothesType[],
  selectedGarment: [ClothesType, ...ClothesType[]],
  colorCombination: CombineColorsClothesType[]
) => {
  if (
    !isValidClothesApiResponse(clothesData) ||
    !isValidClothesApiResponse(selectedGarment)
  ) {
    console.error(ERROR_MESSAGES_OUTFIT.MISSING_DATA);
    return false;
  }
  if (!isValidCombineColorsApiResponse(colorCombination)) {
    console.error(ERROR_MESSAGES_OUTFIT.NO_COLOR_DATA);
    return false;
  }

  // DESTRUCTURING OF ENTERED DATA
  const {
    garment: MAIN_GARMENT,
    colors: MAIN_COLORS,
    weather: MAIN_WEATHER,
    style: MAIN_STYLE,
  } = selectedGarment[0];

  // the clothes that are not chosen are filtered
  const filteredClothes = SearchFilter(
    clothesData,
    "garment",
    MAIN_GARMENT,
    true
  );

  // Matches are found for style and weather and the rest is filtered out.
  const clothesClassFiltering = FilterStyleAndWheater(
    filteredClothes,
    MAIN_STYLE,
    MAIN_WEATHER
  );

  if (!MAIN_COLORS[0]?.colorName) {
    console.error(ERROR_MESSAGES.MISSING_COLORNAME);
    return [];
  }
  const garmentKey = MAIN_GARMENT as GarmentKeyType;

  // the colors are filtered based on the color of the chosen clothing
  const filteredColors = FilterColors(
    ColorCombination,
    garmentKey,
    MAIN_COLORS[0].colorName
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
