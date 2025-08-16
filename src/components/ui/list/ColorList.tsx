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
    p-10
    min-h-full 
    w-full 
    flex gap-8 flex-wrap justify-center items-center place-content-center
    "
    >
      {data[0]?.colors.flatMap(({ hex, colorName, title }) => {
        return (
          <li
            key={colorName}
            className="  w-20 h-14 lg:w-28 lg:h-20 flex flex-col text-center select-none"
          >
            <ColorButton
              hex={hex}
              aria-labelledby={title}
              onClick={() => onSelectColor(colorName)}
              title={colorName}
            />
            <p className="text-off-white text-xl tracking-wide h-1/3">
              {colorName}
            </p>
          </li>
        );
      })}
    </ul>
  );
