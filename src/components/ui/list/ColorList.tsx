//TYPES
import {
  ClothesType,
  ColorClothesType,
} from "../../../types/clothes/clothes.types";
//COMPONENTS
import { ColorButton } from "../buttons/ColorButton";

interface ColorListProps {
  isShown: boolean;
  data: ClothesType[];
  onSelectColor: (item: ColorClothesType["colorName"]) => void;
}
export const ColorList = ({ data, isShown, onSelectColor }: ColorListProps) =>
  isShown && (
    <ul
      role="list"
      className="
    bg-background
    p-10
    min-h-full 
    w-full 
    grid 
    grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] 
    place-content-center
    gap-6
    lg:bg-transparent
    lg:gap-14"
    >
      {data[0]?.colors.flatMap(({ hex, colorName, title }) => {
        return (
          <li key={colorName}>
            <ColorButton
              hex={hex}
              aria-labelledby={title}
              onClick={() => onSelectColor(colorName)}
              title={colorName}
            />
          </li>
        );
      })}
    </ul>
  );
