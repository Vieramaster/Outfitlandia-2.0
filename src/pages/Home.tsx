//REACT
import { useReducer } from "react";
//HOOKS
import { appReducer, initialState } from "../reducers/appReducer";
import { useResponsiveLayout } from "../hooks/useResponsibleLayout";
//COMPONENTS
import { ClothesInventory } from "../components/features/ClothesInventory";
import { ClothesDisplaySection } from "../components/features/ClothesDisplaySection";
import { HomeLayout } from "../components/layout/MainLayout";
//TYPES & OBJECTS
import {
  ClothesType,
  ColorClothesType,
  GarmentButtonType,
} from "../types/clothes/clothes.types";
//FUNCTIONS
import { searchFilter } from "../helpers/clothes/genericFunctions/searchFilter";
import { colorFilter } from "../helpers/clothes/genericFunctions/colorFilter";

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
    const filteredColors = colorFilter(state.chosenClothes, item);

    //ELIMINATE THE OTHERS COLORS AND LEAVE THE CHOSEN COLOR
    const finalGarment = state.chosenClothes.map((item) => ({
      ...item,
      colors: filteredColors,
    }));

    const newIventory = state.inventory.map((item) =>
      item.garment === finalGarment[0]?.garment
        ? { ...finalGarment[0] }
        : { ...item }
    );
    console.log(newIventory);

    dispatch({
      type: "SELECT_COLOR",
      chosenClothes: finalGarment,
      inventory: newIventory,
    });
  };

  return (
    <HomeLayout>
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
    </HomeLayout>
  );
};
