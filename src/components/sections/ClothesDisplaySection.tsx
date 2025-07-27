import {
  ClothesType,
  ColorClothesType,
} from "../../types/clothes/clothes.types";
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
      className={`
      ${mobile && chosenView !== "main" ? "absolute " : "hidden"}   
      overflow-auto
      bg-background
      size-full
      lg:h-full
      lg:w-3/5
      lg:flex

      
       
`}
    >
      <ClothesList
        data={clothesArray}
        isShown={chosenView === "garments"}
        {...{ onSelectGarment }}
      />
      <ColorList
        data={clothesArray}
        isShown={chosenView === "colors"}
        {...{ onSelectColor }}
      />
    </section>
  );
};
