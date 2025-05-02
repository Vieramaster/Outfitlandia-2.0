// TYPES
import {
  ClothesType,
  ListStructureType,
  ClothesListObject,
  MainButtonsProps,
  GarmentKeyType,
} from "../../data/types/ClothesTypes";
import { CombineColorsApiResponse } from "../../data/types/ColorCombineTypes";
//VALIDATORS
import { isNonEmptyArray } from "../../validators/genericValidators/isNonEmptyArray";
// FUNCTIONS
import { SearchFilter } from "./SearchFilter";
import { GetRandomElement } from "../../components/utils/GetRandomElement";
import { FilterStyleAndWheater } from "./FilterStyleAndWeather";
import { FlatMapObjectShoe } from "./FlatMapObjectShoe";
import { SearchMatchColors } from "./SearchMatchColors";
import { ChosenObjectRandomly } from "./ChosenObjectRandomly";
import { CheckCommonAttributes } from "./CheckCommonAttributes";
import { BeltWithMatchingColor } from "./BeltWithMatchingColor";
import { CreateArrayImages } from "./CreateArrayImages";

const MAX_ATTEMPTS = 400;
const MAX_ATTEMPTS_REACHED = "Reached maximum attempts";

/**
 * Generates a clothing outfit based on the user's selected colors and garments.
 * Ensures that all items share at least one common style and weather attribute.
 *
 * @param arrayColors - An array of color combination objects.
 * @param clothes - An array of garment objects to search within.
 * @param key - The key indicating the type of garment selected by the user.
 * @param mainGarment - The main garment object selected by the user.
 * @returns An array of MainButtonsProps representing the generated outfit, or undefined if no valid combination is found.
 */
const Outfit = (
  arrayColors: CombineColorsApiResponse[],
  clothes: ClothesType[],
  key: GarmentKeyType,
  mainGarment: ClothesType
): MainButtonsProps[] | undefined => {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    // Get a random color combination from the provided array.
    const randomColor = GetRandomElement(arrayColors);
    if (!randomColor) continue;

    // Destructure clothes and shoes from the random color combination.
    const { clothes: combineClothes, shoes: combineShoes } = randomColor;
    // Exclude the garment specified by the key to create a new combination.
    const { [key]: removed, ...newCombineClothes } = combineClothes;

    // Filter out shoes from the clothes array.
    const shoesFiltered = SearchFilter(clothes, "garment", "shoes", false);

    // Filter the sneakers and generate a variant for each color.
    const shoesArray = FlatMapObjectShoe(shoesFiltered, combineShoes);
    if (!isNonEmptyArray(shoesArray)) continue;

    // Generate color matches for each garment based on the new combination.
    const results = SearchMatchColors(newCombineClothes, clothes);

    if (Object.values(results).some((item) => item.length === 0)) continue;

    const updatedCombineClothes: ClothesListObject[] = [
      {
        ...results,
        shoes: shoesArray,
      },
    ];

    // Randomly select one element from each group.
    const estructureObject = ChosenObjectRandomly(updatedCombineClothes);
    // Merge the main garment into the combination.
    const addMainGarment = {
      ...estructureObject,
      [mainGarment.garment]: mainGarment,
    };

    // Ensure the resulting outfit contains at least three garment groups.
    if (!addMainGarment || Object.keys(addMainGarment).length < 3) continue;

    // Verify that all garments share at least one common style and weather attribute.
    if (!CheckCommonAttributes(addMainGarment)) continue;

    const finalShoes = addMainGarment.shoes;
    if (!finalShoes) continue;

    const {
      style: styleShoe,
      weather: weatherShoe,
      colors: colorsShoe,
    } = finalShoes;
    if (!colorsShoe[0]) continue;
    const colorNameShoe = colorsShoe[0].colorName;

    // Filter belts based on style and weather.
    const chosenBelt = SearchFilter(clothes, "garment", "belt", false);
    const beltFilter = FilterStyleAndWheater(
      chosenBelt,
      styleShoe,
      weatherShoe
    );

    // Ensure that pants exist in the outfit and extract its name.
    if (!addMainGarment.pants || !addMainGarment.pants.name) continue;
    const pantsNameOutfit = addMainGarment.pants.name;

    // Find a belt that matches the color criteria or defaults to "black".
    const filteredBelts = BeltWithMatchingColor(
      beltFilter,
      pantsNameOutfit,
      colorNameShoe
    );
    if (filteredBelts.length === 0) continue;

    // Select a random belt from the filtered list.
    const uniqueBelt = GetRandomElement(filteredBelts);

    const finishClothes: ListStructureType[] = [
      {
        ...addMainGarment,
        belt: uniqueBelt!,
      },
    ];

    // Create an array of images based on the final combination of clothes.
    const finalArray = CreateArrayImages(finishClothes);
    return finalArray;
  }
  console.error(MAX_ATTEMPTS_REACHED);
  return undefined;
};
export default Outfit;
