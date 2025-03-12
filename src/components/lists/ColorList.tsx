import { ClothesProps } from "../../data/types";
import { ColorButton } from "../buttons/ColorButton";

interface Section {
  arrayColors: ClothesProps[] | undefined;
  isShown: boolean;
  onColorsSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const ColorList = ({
  arrayColors,
  isShown,
  onColorsSubmit,
}: Section) => {
  const shown = isShown ? "block" : "hidden";
  return (
    <ul
      className={`${shown} bg-red-800 w-[95%] h-[calc(100vh-8rem)] flex flex-wrap  justify-center content-center items-center gap-4  lg:h-[37rem] lg:w-[95%]`}
    >
      {arrayColors?.map(({ colors }) =>
        colors?.map(({ hex, colorName, title }) => (
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
};
