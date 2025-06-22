import { ClothesType } from "../../types/clothes/clothes.types";
import { CombineColorsType } from "../../types/clothes/combineColors.types";
//HELPERS
import { searchFilter } from "./genericFunctions/searchFilter";

interface outfitCreator2 {
  clothesData: ClothesType[];
  combineColorsData: CombineColorsType[];
  chosenGarment: ClothesType;
}

export const outfitCreator2 = ({
  clothesData,
  combineColorsData,
  chosenGarment,
}: outfitCreator2): ClothesType[] => {

  // DESTRUCTURING OF ENTERED DATA
  const {
    id: CHOSEN_GARMENT_ID,
    garment: CHOSEN_GARMENT_GARMENT,
    name: CHOSEN_GARMENT_NAME,
    image: CHOSEN_GARMENT_IMAGE,
    weather: CHOSEN_GARMENT_WEATHER,
    style: CHOSEN_GARMENT_STYLE,
    colors: CHOSEN_GARMENT_COLORS,
  } = chosenGarment;

  // the clothes that are not chosen are filtered
  const filteredClothes = searchFilter(
    clothesData,
    "garment",
    CHOSEN_GARMENT_GARMENT,
    true
  );
  
};
