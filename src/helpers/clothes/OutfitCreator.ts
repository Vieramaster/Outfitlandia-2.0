//TYPES
import {
  ClothesProps,
  CombineColorsProps,
  WeatherType,
  StyleType,
  ListStructureType,
  ClothesListObject,
  MainButtonsProps,
} from "../../data/types/Clothestypes";

//FUNCTIONS
import SearchFilter from "./SearchFilter";

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
  const clothesClassFiltering = filterStyleAndWheater(
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
  const filteredColors = filterColors(
    garmentKey,
    MAIN_COLORS[0].colorName,
    ColorCombination
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
    const randomColor = getRandomElement(arrayColors);
    if (!randomColor) continue;

    const { combineClothes, combineShoes } = randomColor;
    const { [key]: removed, ...newCombineClothes } = combineClothes;

    const shoesFiltered = SearchFilter(clothes, "garment", "shoes", false);

    // Se filtran las zapatillas y se genera una variante para cada color
    const shoesArray = flatMapObjectShoe(shoesFiltered, combineShoes);
    if (!shoesArray || shoesArray.length === 0) continue;

    // Se generan las coincidencias de colores para cada prenda según la combinación
    const results = searchMatchColors(newCombineClothes, clothes);
    if (Object.values(results).some((item) => item.length === 0)) continue;

    const updatedCombineClothes: ClothesListObject[] = [
      {
        ...results,
        shoes: shoesArray,
      },
    ];

    // Se elige aleatoriamente un elemento de cada grupo
    const estructureObject = chosenObjectRandomly(updatedCombineClothes);
    const addMainGarment = {
      ...estructureObject,
      [mainGarment.garment]: mainGarment,
    };

    if (!addMainGarment || Object.keys(addMainGarment).length < 3) continue;

    // Se verifica que todas las prendas compartan al menos un atributo común de estilo y clima
    if (!checkCommonAttributes(addMainGarment)) continue;

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

    const beltFilter = filterStyleAndWheater(
      chosenBelt,
      styleShoe,
      weatherShoe
    );

    if (!addMainGarment.pants || !addMainGarment.pants.name) continue;
    const pantsNameOutfit = addMainGarment.pants.name;

    // Se busca un cinturón que tenga el color adecuado o el color "black" por defecto
    const filteredBelts = beltWithMatchingColor(
      beltFilter,
      pantsNameOutfit,
      colorNameShoe
    );
    if (filteredBelts.length === 0) continue;

    const uniqueBelt = getRandomElement(filteredBelts);

    const finishClothes: ListStructureType[] = [
      {
        ...addMainGarment,
        belt: uniqueBelt!,
      },
    ];

    const finalArray = arrayImages(finishClothes);
    return finalArray;
  }
  console.error(ERROR_MESSAGES.MAX_ATTEMPTS_REACHED);
  return undefined;
};

//FUNCTIONS

//filter style and weather
const filterStyleAndWheater = (
  arrayClothes: ClothesProps[],
  styleSearched: StyleType[],
  weatherSearched: WeatherType[]
): ClothesProps[] =>
  arrayClothes.filter(
    ({ style, weather }) =>
      style.some((styleItem) => styleSearched.includes(styleItem)) &&
      weather.some((weatherItem) => weatherSearched.includes(weatherItem))
  );

//random element
const getRandomElement = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return;
  return array[Math.floor(Math.random() * array.length)];
};

const filterColors = (
  key: GarmentKeyType,
  name: string,
  fetch: CombineColorsProps[]
): CombineColorsProps[] =>
  fetch?.filter(({ combineClothes }) => {
    return combineClothes[key] === name;
  });

const flatMapObjectShoe = (
  array: ClothesProps[],
  combineColor: string[]
): ClothesProps[] =>
  array.flatMap((product) => {
    const result = product.colors
      .filter((color) => combineColor.includes(color.colorName))
      .map((color) => {
        return {
          ...product,
          colors: [color],
        };
      });
    return result as ClothesProps[];
  });

const searchMatchColors = (
  objectColors: Record<string, string>,
  arrayClothes: ClothesProps[]
) =>
  Object.entries(objectColors).reduce(
    (acc, [garmentColor, designatedColor]) => {
      const filteredItems = arrayClothes
        .filter(
          ({ garment, colors }) =>
            garment === garmentColor &&
            colors.some(
              ({ colorName }) =>
                colorName.toLowerCase() === designatedColor.toLowerCase()
            )
        )
        .map((item) => ({
          ...item,
          colors: item.colors.filter(
            (color) =>
              color.colorName.toLowerCase() === designatedColor.toLowerCase()
          ),
        }));

      acc[garmentColor] = filteredItems;
      return acc;
    },
    {} as ClothesListObject
  );

//For each object one is chosen randomly
const chosenObjectRandomly = (arrayClothes: ClothesListObject[]) => {
  const result: ListStructureType = {};
  for (const combineItem of arrayClothes) {
    for (const [garment, items] of Object.entries(combineItem)) {
      if (Array.isArray(items) && items.length > 0) {
        const randomItem = getRandomElement(items);
        if (randomItem) {
          result[garment] = randomItem;
        }
      }
    }
  }
  return result;
};

export const checkCommonAttributes = (item: ListStructureType): boolean => {
  const getIntersection = (arrays: string[][]): string[] =>
    arrays.reduce((acc, curr) => acc.filter((value) => curr.includes(value)));

  const styles: StyleType[][] = Object.values(item).map(
    (garment) => garment.style
  );
  const weathers: WeatherType[][] = Object.values(item).map(
    (garment) => garment.weather
  );

  const commonStyles = getIntersection(styles);
  const commonWeathers = getIntersection(weathers);

  return commonStyles.length > 0 && commonWeathers.length > 0;
};

const beltWithMatchingColor = (
  array: ClothesProps[],
  pantsName: string,
  colorShoe: string
) => {
  const filter = array
    .map((belt) => {
      if (pantsName === "joggin" || pantsName === "bermuda joggin")
        return { ...belt, colors: [""] };

      const matchingColor =
        belt.colors.find(({ colorName }) => colorName === colorShoe) ??
        belt.colors.find(({ colorName }) => colorName === "black");

      return matchingColor ? { ...belt, colors: [matchingColor] } : undefined;
    })
    .filter(Boolean);

  return filter as ClothesProps[];
};

const arrayImages = (array: ListStructureType[]): MainButtonsProps[] =>
  array.map((item) => ({
    top: item?.top?.colors?.[0]?.imageColor || "ruta_default_top.webp",
    coat: item?.coat?.colors?.[0]?.imageColor || "ruta_default_coat.webp",
    belt: item?.belt?.colors?.[0]?.imageColor || "ruta_default_belt.webp",
    shoes: item?.shoes?.colors?.[0]?.imageColor || "ruta_default_shoes.webp",
    pants: item?.pants?.colors?.[0]?.imageColor || "ruta_default_pants.webp",
  }));
