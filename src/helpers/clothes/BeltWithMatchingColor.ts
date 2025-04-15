import { ClothesProps } from "../../data/types/ClothesTypes";

/**
 * This function first determines what type of pants is being used. If it's some kind of jogging pants, it will return an array with an empty image. Then, it will try to match the color of the selected *  * footwear with a belt of the same color. If no match is found, it will default to a black belt.
 * P.S.: I know it's not best practice to return an array with an empty image, but in this case, ensuring the app works correctly takes priority.
 *
 * @param array - array of clothes that are currently being leaked
 * @param pantsName - The name of the pants is requested to evaluate whether a belt is required.
 * @param colorShoe - The color of the footwear is requested, since it has to match it, if it cannot, the belt will be black.
 * @returns - grants an array of belts.
 */

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
