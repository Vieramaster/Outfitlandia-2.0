import {
  ClothesType,
  ColorClothesType,
} from "../../types/clothes/clothes.types";
import { ClothesButton } from "../ui/buttons/ClothesButton";
import { ColorButton } from "../ui/buttons/ColorButton";
import { ClothesList } from "../ui/list/ClothesList";
import { ColorList } from "../ui/list/ColorList";

interface ClothesDisplaySectionProps {
  mobile: boolean;
  chosenView: "main" | "garments" | "colors";
  clothesArray: ClothesType[] | undefined;
  onSelectGarment: (item: number) => void;
  onSelectColor: (item: ColorClothesType["colorName"]) => void;
}

export const ClothesDisplaySection = ({
  mobile,
  chosenView,
  clothesArray,
  onSelectGarment,
  onSelectColor,
}: ClothesDisplaySectionProps) => {
  if (!clothesArray) return null;

  return (
    <section
      id="clothes-display-section"
      aria-labelledby="show options"
      className={`
  ${
    mobile && (chosenView === "garments" || chosenView === "colors")
      ? "absolute"
      : "hidden"
  }   overflow-hidden
       
`}
    >
      {chosenView === "garments" ? (
        <ClothesList>
          {clothesArray.map(({ image, id, name }) => {
            return (
              <ClothesButton
                key={id}
                {...{ name, image }}
                onClick={() => onSelectGarment(id)}
              />
            );
          })}
        </ClothesList>
      ) : null}
      {chosenView === "colors" ? (
        <ColorList>
          {clothesArray[0]?.colors.flatMap(({ hex, colorName, title }) => {
            return (
              <ColorButton
                key={colorName}
                hex={hex}
                aria-labelledby={title}
                onClick={() => onSelectColor(colorName)}
                title={colorName}
              />
            );
          })}
        </ColorList>
      ) : null}
    </section>
  );
};
