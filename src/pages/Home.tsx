//REACT
import { useReducer } from "react";
//HOOKS
import { appReducer, initialState } from "../hooks/appReducer";
import { useResponsiveLayout } from "../hooks/useResponsibleLayout";
//COMPONENTS
import { ClothesInventory } from "../components/sections/ClothesInventory";
import { ClothesDisplaySection } from "../components/sections/ClothesDisplaySection";
//TYPES & OBJECTS
import {
  ClothesType,
  ColorClothesType,
  GarmentButtonType,
} from "../shared/types/clothes/clothes.types";
//FUNCTIONS
import { searchFilter } from "../helpers/clothes/genericFunctions/searchFilter";

interface HomeProps {
  clothesData: ClothesType[];
}
export const Home = ({ clothesData }: HomeProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { isMobile } = useResponsiveLayout();

  const handleSelectClothes = (selectedClothes: GarmentButtonType) => {
    const defaultSelectedClothes = searchFilter(
      clothesData,
      "garment",
      selectedClothes
    );

    dispatch({
      type: "SELECT_CLOTHING_ITEM",
      garment: selectedClothes,
      chosenClothes: defaultSelectedClothes,
    });
  };

  const handleSelectGarment = (selectedGarment: number) => {
    const garmentFilter = searchFilter(clothesData, "id", selectedGarment);

    dispatch({
      type: "SELECT_GARMENT",
      chosenClothes: garmentFilter,
    });
  };

  const handleSelectColor = (item: ColorClothesType["colorName"]) => {
    if (
      !state.chosenClothes ||
      !state.chosenClothes[0] ||
      !state.chosenClothes[0].colors
    ) {
      return console.log("");
    }

    const colorFilter = state.chosenClothes[0].colors.filter(
      ({ colorName }) => colorName === item
    );

    console.log(colorFilter)
  };

  return (
    <section
      className="
        bg-yellow-500 
        relative 
        h-full 
        grid 
        place-content-center 
        lg:flex
        lg:justify-between "
    >
      <ClothesInventory
        clothesArray={state.inventory}
        onSelectClothes={handleSelectClothes}
      />
      <ClothesDisplaySection
        mobile={isMobile && state.selectedGarment !== undefined}
        chosenView={state.activeView}
        clothesArray={state.chosenClothes}
        onSelectGarment={handleSelectGarment}
        onSelectColor={handleSelectColor}
      />
    </section>
  );
};
