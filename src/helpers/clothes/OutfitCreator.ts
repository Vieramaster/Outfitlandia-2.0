//TYPES
import { ClothesProps, GarmentKeyType } from "../../data/types/ClothesTypes";
import { CombineColorsProps } from "../../data/types/ColorCombineTypes";
//FUNCTIONS
import SearchFilter from "./SearchFilter";
import FilterStyleAndWheater from "./FilterStyleAndWeather";
import FilterColors from "./FilterColors";
import Outfit from "./Outfit";

const ERROR_MESSAGES = {
  MISSING_DATA: "some type of main data is missing",
  NO_COLOR_DATA: "There is no data on the color date",
  MAX_ATTEMPTS_REACHED: "Reached maximum attempts",
  MISSING_COLORNAME: "colorName is not in the colors array",
};

/**
 * @param clothesData  - Clothing fetch array, it will be used to search for combinations
 * @param selectedGarment  - the clothes that the user has selected
 * @param ColorCombination - the color of clothing that the user has selected
 * @returns - It grants a clothing combination based on the color and garment chosen by the user, said combination being aligned with respect to the weather and style of the garment
 */

export const OutfitCreator = (
  clothesData: ClothesProps[] | undefined,
  selectedGarment: ClothesProps[] | undefined,
  ColorCombination: CombineColorsProps[] | undefined
) => {
  if (!clothesData || !selectedGarment || !selectedGarment[0]) {
    console.error(ERROR_MESSAGES.MISSING_DATA);
    return [];
  }

  if (!ColorCombination || ColorCombination.length === 0) {
    console.error(ERROR_MESSAGES.NO_COLOR_DATA);
    return [];
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
