import { ClothesProps } from "../../data/types/ClothesTypes";

const BeltWithMatchingColor = (
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
export default BeltWithMatchingColor;
