//REACT
import { useReducer, useMemo } from "react";
//TYPES
import { ClothesType } from "../types/clothes/clothes.types";
//HOOKS
import { appReducer, initialState } from "../reducers/appReducer";
import { useResponsiveLayout } from "../hooks/useResponsibleLayout";
//COMPONENTS
import { ClothesInventory } from "../components/sections/ClothesInventory";
import { ClothesDisplaySection } from "../components/sections/ClothesDisplaySection";
//HELPERS
import { homeHandlers } from "../helpers/handlers/homeHandlers";
import { CombineColorsType } from "../types/clothes/combineColors.types";

interface HomeProps {
  clothesData: ClothesType[];
  combineColorsData: CombineColorsType[];
}
export const Home = ({ clothesData, combineColorsData }: HomeProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const { isMobile } = useResponsiveLayout();

  const handlers = useMemo(() => {
    return homeHandlers({ state, dispatch, clothesData, combineColorsData });
  }, [state, dispatch, clothesData]);

  return (
    <>
      <ClothesInventory
        clothesArray={state.inventory}
        onSelectClothes={handlers.handleSelectClothes}
        onCreateOutfit={handlers.handleCreateOutfit}
      />

      <ClothesDisplaySection
        mobile={isMobile && state.selectedGarment !== undefined}
        chosenView={state.activeView}
        clothesArray={state.chosenClothes}
        onSelectGarment={handlers.handleSelectGarment}
        onSelectColor={handlers.handleSelectColor}
      />
    </>
  );
};
