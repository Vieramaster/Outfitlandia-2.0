//TYPES
import {
  ClothesProps,
  ListStructureType,
  ClothesListObject,
  MainButtonsProps,
} from "../../data/types/ClothesTypes";

import { CombineColorsProps } from "../../data/types/ColorCombineTypes";

//FUNCTIONS
import SearchFilter from "./SearchFilter";
import GetRandomElement from "../../components/utils/GetRandomElement";
import FilterStyleAndWheater from "./FilterStyleAndWeather";
import FilterColors from "./FilterColors";
import FlatMapObjectShoe from "./FlatMapObjectShoe";
import SearchMatchColors from "./SearchMatchColors";
import ChosenObjectRandomly from "./ChosenObjectRandomly";
import CheckCommonAttributes from "./CheckCommonAttributes";
import BeltWithMatchingColor from "./BeltWithMatchingColor";
import CreateArrayImages from "./CreateArrayImages";

type GarmentKeyType = "top" | "coat" | "pants";

const MAX_ATTEMPTS = 400;

const ERROR_MESSAGES = {
  MISSING_DATA: "some type of main data is missing",
  NO_COLOR_DATA: "There is no data on the color date",
  MAX_ATTEMPTS_REACHED: "Reached maximum attempts",
  MISSING_COLORNAME: "colorName is not in the colors array",
};

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

  const returnImages = combination(
    filteredColors,
    clothesClassFiltering,
    garmentKey,
    selectedGarment[0]
  );
  return returnImages ?? [];
};

//MAIN FUNCTION

const combination = (
  arrayColors: CombineColorsProps[],
  clothes: ClothesProps[],
  key: GarmentKeyType,
  mainGarment: ClothesProps
): MainButtonsProps[] | undefined => {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const randomColor = GetRandomElement(arrayColors);
    if (!randomColor) continue;

    const { clothes: combineClothes, shoes: combineShoes } = randomColor;
    const { [key]: removed, ...newCombineClothes } = combineClothes;

    const shoesFiltered = SearchFilter(clothes, "garment", "shoes", false);

    // Se filtran las zapatillas y se genera una variante para cada color
    const shoesArray = FlatMapObjectShoe(shoesFiltered, combineShoes);
    if (!shoesArray || shoesArray.length === 0) continue;

    // Se generan las coincidencias de colores para cada prenda según la combinación
    const results = SearchMatchColors(newCombineClothes, clothes);
    if (Object.values(results).some((item) => item.length === 0)) continue;

    const updatedCombineClothes: ClothesListObject[] = [
      {
        ...results,
        shoes: shoesArray,
      },
    ];

    // Se elige aleatoriamente un elemento de cada grupo
    const estructureObject = ChosenObjectRandomly(updatedCombineClothes);
    const addMainGarment = {
      ...estructureObject,
      [mainGarment.garment]: mainGarment,
    };

    if (!addMainGarment || Object.keys(addMainGarment).length < 3) continue;

    // Se verifica que todas las prendas compartan al menos un atributo común de estilo y clima
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

    // Se filtran los cinturones según estilo y clima
    const chosenBelt = SearchFilter(clothes, "garment", "belt", false);

    const beltFilter = FilterStyleAndWheater(
      chosenBelt,
      styleShoe,
      weatherShoe
    );

    if (!addMainGarment.pants || !addMainGarment.pants.name) continue;
    const pantsNameOutfit = addMainGarment.pants.name;

    // Se busca un cinturón que tenga el color adecuado o el color "black" por defecto
    const filteredBelts = BeltWithMatchingColor(
      beltFilter,
      pantsNameOutfit,
      colorNameShoe
    );
    if (filteredBelts.length === 0) continue;

    const uniqueBelt = GetRandomElement(filteredBelts);

    const finishClothes: ListStructureType[] = [
      {
        ...addMainGarment,
        belt: uniqueBelt!,
      },
    ];

    const finalArray = CreateArrayImages(finishClothes);
    return finalArray;
  }
  console.error(ERROR_MESSAGES.MAX_ATTEMPTS_REACHED);
  return undefined;
};
