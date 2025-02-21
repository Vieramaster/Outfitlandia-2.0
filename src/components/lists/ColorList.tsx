import { product } from "../../data/types";
import { ColorButton } from "../buttons/ColorButton";

interface Section {
  arrayColors: product[] | null;
  onColorsSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const ColorList = ({ arrayColors, onColorsSubmit }: Section) => {
  <ul>
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
  </ul>;
};
