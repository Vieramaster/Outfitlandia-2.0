import { ClothesProps, CombineColorsProps } from "../data/types";
import { useFetch } from "./UseFetch";

export const useOutfitCreator = (
  fetchData: ClothesProps[] | undefined,
  selectedGarment: ClothesProps[] | undefined
) => {
  const { data: fetchColorsData } = useFetch("colors");

  if (
    !selectedGarment ||
    !fetchData ||
    selectedGarment.length === 0 ||
    fetchData.length === 0 ||
    selectedGarment[0]?.colors.length !== 1
  ) {
    return "no hay datos";
  }

  //DESTRUCTURING OF ENTERED DATA
  const {
    garment: CHOSENGARMENT,
    colors: CHOSENARRAYCOLORS,
    weather: CHOSENWEATHER,
    style: CHOSENSTYLE,
  } = selectedGarment[0]!;

  const { colorName: CHOSENCOLORNAME, imageColor: CHOSENIMAGECOLOR } =
    CHOSENARRAYCOLORS[0]!;

  //FILTER COLOR COMBINATIONS
  const filteredColors = fetchColorsData?.filter(({ combineClothes }) => {
    return (
      combineClothes[CHOSENGARMENT as "top" | "coat" | "pants"] ===
      CHOSENCOLORNAME
    );
  });

  //FILTER CLOTHES
  const filteredClothes = fetchData.filter(
    ({ garment }) => garment !== CHOSENGARMENT
  );

  const matchingItems = filteredClothes.filter(({ style, weather }) =>
    style.some(
      (element) =>
        CHOSENSTYLE.includes(element) &&
        weather.some((element) => CHOSENWEATHER.includes(element))
    )
  );

  const remainingClothes = ["top", "coat", "pants"].filter(
    (item) => item !== CHOSENGARMENT
  );

  const combination = (
    arrayColors: CombineColorsProps[],
    Clothes: ClothesProps[]
  ) => {
    const randomColor =
      arrayColors[Math.floor(Math.random() * arrayColors.length)];

    return randomColor;
  };

  const lala = combination(filteredColors!, filteredClothes!);
  return [lala, matchingItems];
};
