// TYPES
import {
  ClothesType,
  ColorNameType,
  ListStructureType,
  ClothesListObject,
  GarmentButtonType,
} from "../../types/clothes/clothes.types";

import { CombineColorsType } from "../../types/clothes/combineColors.types";
//VALIDATORS
import { isNonEmptyArray } from "../../utils/validators/isNonEmplyArray";
// FUNCTIONS
import { searchFilter } from "./genericFunctions/searchFilter";
import { getRandomElement } from "../../utils/getRandomElement";
import { filterStyleAndWheater } from "./genericFunctions/filterStyleAndWheater";
import { getFootwearWithMatchingColors } from "./genericFunctions/getFootwearWithMatchingColors";
import { searchMatchColors } from "./genericFunctions/searchMatchColors";
import { pickRandomClothes } from "./genericFunctions/pickRandomClothes";
import { hasCommonStyleAndWeather } from "./genericFunctions/hasCommonStyleAndWeather";
import { getBeltsWithMatchingColor } from "./genericFunctions/getBeltsWithMatchingColor";

const MAX_ATTEMPTS = 400;
const MAX_ATTEMPTS_REACHED = "Reached maximum attempts";

/**
 * Generates a clothing outfit based on the user's selected colors and garments.
 * Ensures that all items share at least one common style and weather attribute.
 *
 * @param combienColorsData - An array of color combination objects.
 * @param clothes - An array of garment objects to search within.
 * @param selectedGarment - The main garment object selected by the user.
 * @returns An array of MainButtonsProps representing the generated outfit, or undefined if no valid combination is found.
 */
export const outfit = (
  combienColorsData: CombineColorsType[],
  clothes: ClothesType[],
  selectedGarment: ClothesType
): ClothesType[] | undefined => {
  const SELECTED_GARMENT_GARMENT = selectedGarment.garment as GarmentButtonType;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    // Get a random color combination from the provided array.
    const randomColor = getRandomElement(combienColorsData);
    if (!randomColor) continue;

    // Destructure clothes and footwear from the random color combination.
    const { clothes: colorcombineClothes, footwear: colorCombineFootwear } =
      randomColor;
    // Exclude the garment specified by the key to create a new combination.
    const { [SELECTED_GARMENT_GARMENT]: removed, ...newColorcombineClothes } =
      colorcombineClothes;

    // Filter out footwear from the clothes array.
    const footwearFiltered = searchFilter(
      clothes,
      "garment",
      "footwear",
      false
    );

    // Filter the sneakers and generate a variant for each color.
    const footwearArray = getFootwearWithMatchingColors(
      footwearFiltered,
      colorCombineFootwear
    );
    if (!isNonEmptyArray(footwearArray)) continue;

    // Generate color matches for each garment based on the new combination.
    const results = searchMatchColors(newColorcombineClothes, clothes);

    if (Object.values(results).some((item) => item.length === 0)) continue;

    const updatedCombineClothes: ClothesListObject[] = [
      {
        ...results,
        footwear: footwearArray,
      },
    ];

    // Randomly select one element from each group.
    const estructureObject = pickRandomClothes(updatedCombineClothes);
    // Merge the main garment into the combination.
    const addMainGarment: ListStructureType = {
      ...estructureObject,
      [SELECTED_GARMENT_GARMENT]: selectedGarment,
    };

    // Ensure the resulting outfit contains at least three garment groups.
    if (!addMainGarment || Object.keys(addMainGarment).length < 3) continue;

    // Verify that all garments share at least one common style and weather attribute.
    if (!hasCommonStyleAndWeather(addMainGarment)) continue;

    const finalfootwear = addMainGarment.footwear;
    if (!finalfootwear) continue;

    const {
      style: styleShoe,
      weather: weatherfootwear,
      colors: colorsfootwear,
    } = finalfootwear;
    if (!colorsfootwear[0]) continue;
    const colorNameShoe = colorsfootwear[0].colorName;

    // Filter belts based on style and weather.
    const chosenBelt = searchFilter(clothes, "garment", "belt", false);
    const beltFilter = filterStyleAndWheater(
      chosenBelt,
      styleShoe,
      weatherfootwear
    );

    // Ensure that pants exist in the outfit and extract its name.
    if (!addMainGarment.pants || !addMainGarment.pants.name) continue;
    const pantsNameOutfit = addMainGarment.pants.name;

    // Find a belt that matches the color criteria or defaults to "black".
    const filteredBelts = getBeltsWithMatchingColor(
      beltFilter,
      pantsNameOutfit,
      colorNameShoe
    );
    if (filteredBelts.length === 0) continue;

    // Select a random belt from the filtered list.
    const uniqueBelt = getRandomElement(filteredBelts);
    console.log(filteredBelts);
    const finishClothes: ListStructureType[] = [
      {
        ...addMainGarment,
        belt: uniqueBelt!,
      },
    ];

    return Object.values(finishClothes[0]!);
  }
  console.error(MAX_ATTEMPTS_REACHED);
  return undefined;
};
