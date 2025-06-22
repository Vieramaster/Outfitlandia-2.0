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

interface HomeProps {
  clothesData: ClothesType[];
}
export const Home = ({ clothesData }: HomeProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { isMobile } = useResponsiveLayout();

  const handlers = useMemo(() => {
    return homeHandlers({ state, dispatch, clothesData });
  }, [state, dispatch, clothesData]);

  return (
    <>
      <ClothesInventory
        clothesArray={state.inventory}
        onSelectClothes={handlers.handleSelectClothes}
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
