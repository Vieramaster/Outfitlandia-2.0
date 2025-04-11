import { ClothesProps } from "../../data/types/ClothesTypes";

const FlatMapObjectShoe = (
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

export default FlatMapObjectShoe;
