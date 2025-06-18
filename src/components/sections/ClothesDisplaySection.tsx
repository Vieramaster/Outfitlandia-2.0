import {
  ClothesType,
  ColorClothesType,
} from "../../shared/types/clothes/clothes.types";
import { ClothesButton } from "../ui/buttons/ClothesButton";
import { ColorButton } from "../ui/buttons/ColorButton";
import { DisplayList } from "../ui/list/DisplayList";

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
  // No renderizamos nada si no hay datos
  if (!clothesArray) return null;

  // En mobile, solo mostrar si chosenView es "garments"
  if (mobile && chosenView !== "garments" && chosenView !== "colors") {
    return null;
  }

  return (
    <section
      id="clothes-display-section"
      aria-labelledby="clothes-display-title"
      className={`${
        mobile && (chosenView === "garments" || chosenView === "colors")
          ? "absolute w-full h-full"
          : "w-0 h-0 hidden"
      }    
            w-full h-full 
          bg-rose-900
            grid place-content-center
            place-items-center 
            lg:block lg:relative 
            lg:w-3/5 `}
    >
      {chosenView === "garments" ? (
        <DisplayList display="garments">
          {clothesArray.map(({ image, id, name }) => {
            return (
              <ClothesButton
                key={id}
                {...{ name, image }}
                onClick={() => onSelectGarment(id)}
              />
            );
          })}
        </DisplayList>
      ) : null}
      {chosenView === "colors" ? (
        <DisplayList display="colors">
          {clothesArray[0]?.colors.flatMap(({ hex, colorName, title }) => {
            return (
              <ColorButton
                hex={hex}
                aria-labelledby={title}
                id={colorName}
                onClick={() => onSelectColor(colorName)}
                title={colorName}
              />
            );
          })}
        </DisplayList>
      ) : null}
    </section>
  );
};
