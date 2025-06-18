import { ClothesType } from "../../data/types/ClothesTypes";
import { isNonEmptyArray } from "../../validators/genericValidators/isNonEmptyArray";
import { ColorButton } from "../../components/ui/buttons/ColorButton";

interface ColorListProps {
  arrayColors: ClothesType[] | undefined;
  isShown: boolean;
  onColorsSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const ColorList = ({
  arrayColors,
  isShown,
  onColorsSubmit,
}: ColorListProps) => (
  <ul
    className={`${
      isShown ? "block" : "hidden"
    } bg-red-800 w-[95%] h-[calc(100vh-8rem)] flex flex-wrap  justify-center content-center items-center gap-4  lg:h-[37rem] lg:w-[95%]`}
  >
    {!isNonEmptyArray(arrayColors)
      ? null
      : arrayColors.map(({ colors }) =>
          colors.map(({ hex, colorName, title }) => (
            <li key={colorName}>
              <ColorButton
                hex={hex}
                aria-labelledby={title}
                id={colorName}
                onClick={onColorsSubmit}
                title={colorName}
              />
            </li>
          ))
        )}
  </ul>
);
