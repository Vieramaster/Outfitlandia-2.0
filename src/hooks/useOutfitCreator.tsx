import { ClothesProps, CombineColorsProps, WeatherType } from "../data/types";
import { useFetch } from "./useFetch";

export const useOutfitCreator = (
  fetchData: ClothesProps[] | undefined,
  selectedGarment: ClothesProps[] | undefined
) => {
  const { data: fetchColorsData } = useFetch("colors");

  if (!fetchData || !selectedGarment || selectedGarment.length === 0) {
    console.error("Invalid data passed to useOutfitCreator");
    return [];
  }

  if (!fetchColorsData || fetchColorsData.length === 0) {
    console.error("No color data found");
    return [];
  }

  const MAX_ATTEMPTS = 400;

  // DESTRUCTURING OF ENTERED DATA
  const {
    garment: CHOSENGARMENT,
    colors: CHOSENARRAYCOLORS,
    weather: CHOSENWEATHER,
    style: CHOSENSTYLE,
  } = selectedGarment[0]!;

  const garmentKey = CHOSENGARMENT as "top" | "coat" | "pants";

  const { colorName: CHOSENCOLORNAME, imageColor: CHOSENIMAGECOLOR } =
    CHOSENARRAYCOLORS[0]!;

  // FILTER CLOTHES
  const filteredClothes = fetchData.filter(
    ({ garment }) => garment !== CHOSENGARMENT
  );

  const matchingItems = filteredClothes.filter(
    ({ style, weather }) =>
      style.some((styleItem) => CHOSENSTYLE.includes(styleItem)) &&
      weather.some((weatherItem) => CHOSENWEATHER.includes(weatherItem))
  );

  // FILTER COLOR COMBINATIONS
  const filteredColors = fetchColorsData?.filter(({ combineClothes }) => {
    return combineClothes[garmentKey] === CHOSENCOLORNAME;
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
      return combination(filteredColors!, matchingItems!, attempt + 1);
    }

    const { combineClothes, combineShoes } = randomColor;
    const { [garmentKey]: removed, ...newCombineClothes } = combineClothes;

    const shoesFilter = matchingItems.filter(
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
      return combination(filteredColors!, matchingItems!, attempt + 1);

    const results = Object.entries(
      newCombineClothes as Record<string, string>
    ).reduce((acc, [garmentColor, designatedColor]) => {
      const filteredItems = matchingItems
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
      return combination(filteredColors!, matchingItems!, attempt + 1);

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

    const addMainGarment = {
      ...ChoseOneObject,
      [selectedGarment[0]!.garment]: selectedGarment[0]!,
    };

    if (addMainGarment === undefined || Object.keys(addMainGarment).length < 3)
      return combination(filteredColors!, matchingItems!, attempt + 1);

    const checkWeatherAndStyle = () => {
      const garments = Object.values(addMainGarment);
      const isMatch = garments.every((garment) => {
        return garments.some((otherGarment) => {
          const styleMatch = garment.style.some((style: string) =>
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
      return combination(filteredColors!, matchingItems!, attempt + 1);
    }

    const finalShoes = addMainGarment.shoes;

    if (!finalShoes) return combination(arrayColors, Clothes, attempt + 1);

    const {
      style: styleShoe,
      weather: weatherShoe,
      colors: colorsShoe,
    } = finalShoes;

    if (!colorsShoe[0])
      return combination(filteredColors!, matchingItems!, attempt + 1);

    const colorNameShoe = colorsShoe[0].colorName;

    const chosenBelt = matchingItems.filter(
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
      return combination(filteredColors!, matchingItems!, attempt + 1);

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

  const returnImages = combination(filteredColors!, matchingItems!);

  return returnImages ?? [];
};
