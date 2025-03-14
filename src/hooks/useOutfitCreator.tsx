import {
  ClothesProps,
  CombineColorsProps,
  WeatherType,
  StyleType,
} from "../data/types";
import { useFetch } from "./useFetch";

type GarmentKeyType = "top" | "coat" | "pants";

const MAX_ATTEMPTS = 400;

export const useOutfitCreator = (
  fetchData: ClothesProps[] | undefined,
  selectedGarment: ClothesProps[] | undefined
) => {
  const { data: fetchColorsData } = useFetch("colors");

  if (!fetchData || !selectedGarment || !selectedGarment[0]) {
    console.error("some type of main data is missing");
    return [];
  }

  if (!fetchColorsData || fetchColorsData.length === 0) {
    console.error("There is no data on the color date.");
    return [];
  }

  // DESTRUCTURING OF ENTERED DATA
  const {
    garment: MAIN_GARMENT,
    colors: MAIN_COLORS,
    weather: MAIN_WEATHER,
    style: MAIN_STYLE,
  } = selectedGarment[0];

  const garmentKey = MAIN_GARMENT as GarmentKeyType;

  const MAIN_COLORNAME = MAIN_COLORS[0]?.colorName;

  // the clothes that are not chosen are filtered
  const filteredClothes = filterClothes(fetchData, MAIN_GARMENT);

  // Matches are found for style and weather and the rest is filtered out.
  const clothesClassFiltering = filterStyleAndWheater(
    filteredClothes,
    MAIN_STYLE,
    MAIN_WEATHER
  );

  // the colors are filtered based on the color of the chosen clothing
  const filteredColors = fetchColorsData?.filter(({ combineClothes }) => {
    return combineClothes[garmentKey] === MAIN_COLORNAME;
  });

  const combination = (
    arrayColors: CombineColorsProps[],
    Clothes: ClothesProps[],
    attempt: number = 0
  ):
    | {
        top: string;
        coat: string;
        pants: string;
        belt: string;
        shoes: string;
      }[]
    | null => {
    if (attempt >= MAX_ATTEMPTS) {
      console.error("Reached maximum attempts");
      return null;
    }

    const randomColor =
      arrayColors[Math.floor(Math.random() * arrayColors.length)];

    

    if (!randomColor) {
      return combination(filteredColors!, clothesClassFiltering!, attempt + 1);
    }

    const { combineClothes, combineShoes } = randomColor;
    const { [garmentKey]: removed, ...newCombineClothes } = combineClothes;

    const shoesFilter = clothesClassFiltering.filter(
      ({ garment }) => garment === "shoes"
    );

    // ONE OBJECT IS CREATED FOR EACH SHOE COLOR
    const newShoes = shoesFilter.flatMap((shoe) => {
      return shoe.colors
        .filter((color) => combineShoes.includes(color.colorName))
        .map((color) => {
          return {
            ...shoe,
            colors: [color],
          };
        });
    });

    if (newShoes.length === 0)
      return combination(filteredColors!, clothesClassFiltering!, attempt + 1);

    const results = Object.entries(
      newCombineClothes as Record<string, string>
    ).reduce((acc, [garmentColor, designatedColor]) => {
      const filteredItems = clothesClassFiltering
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
    }, {} as Record<string, ClothesProps[]>);

    if (Object.values(results).some((item) => item.length === 0))
      return combination(filteredColors!, clothesClassFiltering!, attempt + 1);

    const updatedCombineClothes = [
      {
        ...results,
        shoes: newShoes,
      },
    ];

    const ChoseOneObject = updatedCombineClothes.reduce((acc, combineItem) => {
      for (const [garment, items] of Object.entries(combineItem)) {
        if (Array.isArray(items) && items.length > 0) {
          const randomIndex = Math.floor(Math.random() * items.length);
          if (items[randomIndex]) {
            acc[garment] = items[randomIndex];
          }
        }
      }
      return acc;
    }, {} as Record<string, ClothesProps>);

    const addMAIN_GARMENT = {
      ...ChoseOneObject,
      [selectedGarment[0]!.garment]: selectedGarment[0]!,
    };

    if (
      addMAIN_GARMENT === undefined ||
      Object.keys(addMAIN_GARMENT).length < 3
    )
      return combination(filteredColors!, clothesClassFiltering!, attempt + 1);

    const checkWeatherAndStyle = () => {
      const garments = Object.values(addMAIN_GARMENT);
      const isMatch = garments.every((garment) => {
        return garments.some((otherGarment) => {
          const styleMatch = garment.style.some((style: StyleType) =>
            otherGarment.style.includes(style)
          );
          const weatherMatch = garment.weather.some((weather) =>
            otherGarment.weather.includes(weather as WeatherType)
          );

          return styleMatch || weatherMatch;
        });
      });

      return isMatch;
    };
    if (!checkWeatherAndStyle()) {
      return combination(filteredColors!, clothesClassFiltering!, attempt + 1);
    }

    const finalShoes = addMAIN_GARMENT.shoes;

    if (!finalShoes) return combination(arrayColors, Clothes, attempt + 1);

    const {
      style: styleShoe,
      weather: weatherShoe,
      colors: colorsShoe,
    } = finalShoes;

    if (!colorsShoe[0])
      return combination(filteredColors!, clothesClassFiltering!, attempt + 1);

    const colorNameShoe = colorsShoe[0].colorName;

    const chosenBelt = clothesClassFiltering.filter(
      ({ garment }) => garment === "belt"
    );
    const beltFilter = chosenBelt.filter(
      ({ style, weather }) =>
        style.some((item) => styleShoe.includes(item)) &&
        weather.some((item) => weatherShoe.includes(item))
    );

    const pantsName = addMAIN_GARMENT.pants?.name;

    // COMBINE BELT WITH SHOES
    const beltWithMatchingColor = beltFilter
      .map((belt) => {
        if (pantsName === "joggin" || pantsName === "bermuda joggin")
          return null;
        const matchingColor =
          belt.colors.find(({ colorName }) => colorName === colorNameShoe) ??
          belt.colors.find(({ colorName }) => colorName === "black");

        return matchingColor ? { ...belt, colors: [matchingColor] } : null;
      })
      .filter(Boolean);

    if (beltWithMatchingColor.length === 0)
      return combination(filteredColors!, clothesClassFiltering!, attempt + 1);

    // If there is more than one belt, it is chosen randomly.
    const uniqueBelt =
      beltWithMatchingColor.length > 1
        ? beltWithMatchingColor[
            Math.floor(Math.random() * beltWithMatchingColor.length)
          ]
        : beltWithMatchingColor[0];

    const finishClothes = {
      ...addMAIN_GARMENT,
      belt: uniqueBelt!,
    };

    // PICK IMAGES
    const garmentsImages = Object.entries(finishClothes).reduce(
      (acc, [garmentKey, garmentObj]) => {
        if (garmentObj.colors && garmentObj.colors.length > 0) {
          const imageColor = garmentObj.colors?.[0]?.imageColor;
          if (imageColor) {
            acc[garmentKey] = imageColor;
          }
        }
        return acc;
      },
      {} as Record<string, string>
    );

    // Return the images with the correct structure
    return [
      {
        top: garmentsImages.top || "",
        coat: garmentsImages.coat || "",
        pants: garmentsImages.pants || "",
        belt: garmentsImages.belt || "",
        shoes: garmentsImages.shoes || "",
      },
    ];
  };

  const returnImages = combination(filteredColors!, clothesClassFiltering!);

  return returnImages ?? [];
};

//FUNCTIONS

const filterClothes = (fetch: ClothesProps[], selectedGarment: string) =>
  fetch.filter(({ garment }) => garment !== selectedGarment);

const filterStyleAndWheater = (
  arrayClothes: ClothesProps[],
  styleSearched: StyleType[],
  weatherSearched: WeatherType[]
) =>
  arrayClothes.filter(
    ({ style, weather }) =>
      style.some((styleItem) => styleSearched.includes(styleItem)) &&
      weather.some((weatherItem) => weatherSearched.includes(weatherItem))
  );

const getRandomElement = (object: []) =>
  object[Math.floor(Math.random() * object.length)];
