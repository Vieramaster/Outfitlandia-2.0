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
    grid 
    grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] 
    place-content-center
    items-center
    gap-8
    lg:grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] 
    
    "
    >
      {data[0]?.colors.flatMap(({ hex, colorName, title }) => {
        return (
          <li
            key={colorName}
            className="  w-20 h-14 lg:w-28 lg:h-20 flex flex-col items-center select-none "
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
