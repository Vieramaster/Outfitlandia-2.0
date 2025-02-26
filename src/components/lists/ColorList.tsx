import { ClothesProps } from "../../data/types";
import { ColorButton } from "../buttons/ColorButton";

interface Section {
  arrayColors: ClothesProps[] | undefined;
  isHidden: boolean;
  onColorsSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const ColorList = ({
  arrayColors,
  isHidden,
  onColorsSubmit,
}: Section) => {
  const hidden = isHidden ? "block" : "hidden";
  return (
    <ul
      className={`${hidden} bg-red-800 w-[95%] h-[calc(100vh-8rem)] flex flex-wrap  justify-center content-center items-center gap-4  lg:h-[37rem] lg:w-[95%]`}
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
