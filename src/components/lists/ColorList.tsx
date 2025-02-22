import { productProps } from "../../data/types";
import { ColorButton } from "../buttons/ColorButton";

interface Section {
  arrayColors: productProps[] | null;
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
    <ul className={`${hidden} flex flex-wrap justify-center gap-2`}>
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
