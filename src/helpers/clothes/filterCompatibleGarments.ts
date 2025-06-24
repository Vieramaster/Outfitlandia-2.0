import { ClothesType } from "../../types/clothes/clothes.types";
//HELPERS
import { searchFilter } from "./genericFunctions/searchFilter";
import { filterStyleAndWheater } from "./genericFunctions/filterStyleAndWheater";

export const filterCompatibleGarments = (
  clothesData: ClothesType[],
  chosenGarment: ClothesType
): ClothesType[] => {
  // destructuring of entered data
  const {
    garment: CHOSEN_GARMENT_GARMENT,
    weather: CHOSEN_GARMENT_WEATHER,
    style: CHOSEN_GARMENT_STYLE,
  } = chosenGarment;

  // the clothes that are not chosen are filtered
  const filteredClothes = searchFilter(
    clothesData,
    "garment",
    CHOSEN_GARMENT_GARMENT,
    true
  );

  // Matches are found for style and weather and the rest is filtered out.
  const clothesClassFiltering = filterStyleAndWheater(
    filteredClothes,
    CHOSEN_GARMENT_STYLE,
    CHOSEN_GARMENT_WEATHER
  );

  return clothesClassFiltering;
};
