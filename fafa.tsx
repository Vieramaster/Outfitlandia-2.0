import {
    ClothesProps,
    CombineColorsProps,
    WeatherType,
    StyleType,
    GarmentType,
  } from "../data/types";
  import { useFetch } from "./useFetch";
  
  type GarmentKeyType = "top" | "coat" | "pants";
  type ListStructureType = Record<string, ClothesProps>;
  type ClothesListObject = Record<string, ClothesProps[]>;
  
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
    const filteredClothes = filterClothes(fetchData, MAIN_GARMENT, true);
  
    // Matches are found for style and weather and the rest is filtered out.
    const clothesClassFiltering = filterStyleAndWheater(
      filteredClothes,
      MAIN_STYLE,
      MAIN_WEATHER
    );
  
    // the colors are filtered based on the color of the chosen clothing
    const filteredColors = filterColors(
      garmentKey,
      MAIN_COLORNAME!,
      fetchColorsData
    );
  
    const combination = (
      arrayColors: CombineColorsProps[],
      Clothes: ClothesProps[],
      attempt: number = 0
    ) => {
      if (attempt >= MAX_ATTEMPTS) {
        console.error("Reached maximum attempts");
        return null;
      }
  
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {}
  
      const randomColor = getRandomElement(arrayColors);
  
      if (!randomColor) {
        return combination(filteredColors!, clothesClassFiltering!, attempt + 1);
      }
  
      // the random color is deconstructed and the garment we already have is removed
      const { combineClothes, combineShoes } = randomColor;
      const { [garmentKey]: removed, ...newCombineClothes } = combineClothes;
  
      const shoesFiltered = filterClothes(clothesClassFiltering, "shoes", false);
  
      // It is filtered and a shoe is created for each color
      const shoesArray = flatMapObjectShoe(shoesFiltered, combineShoes);
  
      if (shoesArray.length === 0)
        return combination(filteredColors!, clothesClassFiltering!, attempt + 1);
  
      //creates an array based on the combinations
      const results = searchMatchColors(newCombineClothes, clothesClassFiltering);
  
      if (Object.values(results).some((item) => item.length === 0))
        return combination(filteredColors!, clothesClassFiltering!, attempt + 1);
  
      const updatedCombineClothes: ClothesListObject[] = [
        {
          ...results,
          shoes: shoesArray,
        },
      ];
  
      // For each object one is chosen randomly
      const estructureObject = chosenObjectRandomly(updatedCombineClothes);
  
      const addMainGarment = {
        ...estructureObject,
        [selectedGarment[0]!.garment]: selectedGarment[0]!,
      };
  
      if (addMainGarment === undefined || Object.keys(addMainGarment).length < 3)
        return combination(filteredColors!, clothesClassFiltering!, attempt + 1);
  
      const filterWeatherAndStyle = checkWeatherAndStyle(addMainGarment);
  
      if (filterWeatherAndStyle) {
        return combination(filteredColors!, clothesClassFiltering!, attempt + 1);
      }
  
      const finalShoes = addMainGarment.shoes;
  
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
  
      const pantsName = addMainGarment.pants?.name;
  
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
        ...addMainGarment,
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
      return garmentsImages;
      // Return the images with the correct structure
      /**
      *  return [
        {
          top: garmentsImages.top || "",
          coat: garmentsImages.coat || "",
          pants: garmentsImages.pants || "",
          belt: garmentsImages.belt || "",
          shoes: garmentsImages.shoes || "",
        },
      ];
      */

    };
  
    const returnImages = combination(filteredColors, clothesClassFiltering);
  
    return returnImages ?? [];
  };
  
  //FUNCTIONS
  
  //filter garment
  const filterClothes = (
    fetch: ClothesProps[],
    selectedGarment: string,
    excludes: boolean
  ) =>
    fetch.filter(({ garment }) =>
      excludes ? garment !== selectedGarment : garment === selectedGarment
    );
  
  //filter style and weather
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
  
  //random element
  const getRandomElement = <T,>(array: T[]): T | undefined => {
    if (array.length === 0) return;
    return array[Math.floor(Math.random() * array.length)];
  };
  
  const filterColors = (
    key: GarmentKeyType,
    name: string,
    fetch: CombineColorsProps[]
  ) =>
    fetch?.filter(({ combineClothes }) => {
      return combineClothes[key] === name;
    });
  
  const flatMapObjectShoe = (array: ClothesProps[], combineColor: string[]) =>
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
  
  const checkWeatherAndStyle = (array: { [x: string]: ClothesProps }) => {
    const garments = Object.values(array);
  
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
  