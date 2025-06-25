// TYPES
import { AppStateProps, ActionProps } from "../../reducers/appReducer.types";
import {
  ClothesType,
  GarmentButtonType,
  ColorClothesType,
} from "../../types/clothes/clothes.types";
// FUNCTIONS
import { searchFilter } from "../clothes/genericFunctions/searchFilter";
import { colorFilter } from "../clothes/genericFunctions/colorFilter";
import { filterCompatibleGarments } from "../clothes/filterCompatibleGarments";
import { outfit } from "../clothes/outfit";
import { CombineColorsType } from "../../types/clothes/combineColors.types";

interface HomeHandlersProps {
  state: AppStateProps;
  dispatch: React.ActionDispatch<[action: ActionProps]>;
  clothesData: ClothesType[];
  combineColorsData: CombineColorsType[];
}

export const homeHandlers = ({
  state,
  dispatch,
  clothesData,
  combineColorsData,
}: HomeHandlersProps) => {
  // first, reset every state to avoid errors, then filter the clothes based on the selected garment to display styles in the chosen view (garment)
  const handleSelectClothes = (selectedClothes: GarmentButtonType) => {
    dispatch({
      type: "RESET",
    });

    const defaultSelectedClothes = searchFilter(
      clothesData,
      "garment",
      selectedClothes
    );

    dispatch({
      type: "SELECT_CLOTHING_ITEM",
      chosenClothes: defaultSelectedClothes,
    });
  };
  // next, display the styles of the selected garment in the clothes display section.
  // filter the clothes by id, update the chosen clothes state to store the selected garment style,
  // then update the colors state to show available colors for that garment.
  const handleSelectGarment = (selectedGarment: number) => {
    const garmentFilter = searchFilter(clothesData, "id", selectedGarment);

    dispatch({
      type: "SELECT_GARMENT",
      chosenClothes: garmentFilter,
    });
  };

  // finally, select the color type for the desired garment.
  // remove all colors except the selected one, update the chosen clothes state to reflect this color selection
  // (used for the outfit button), and update the inventory state to display the selected garment with the chosen color,
  // providing visual feedback to the user.
  const handleSelectColor = (item: ColorClothesType["colorName"]) => {
    const filteredColors = colorFilter(state.chosenClothes, item);

    // remove other colors, keep only the selected color
    const finalGarment = state.chosenClothes.map((item) => ({
      ...item,
      colors: filteredColors,
    }));

    // the selected garment is added to the inventory state
    const newInventory = state.inventory.map((item) =>
      item.garment === finalGarment[0]?.garment
        ? { ...finalGarment[0] }
        : { ...item }
    );

    dispatch({
      type: "SELECT_COLOR",
      chosenClothes: finalGarment,
      inventory: newInventory,
    });
  };

  const handleCreateOutfit = () => {
    if (!state.chosenClothes[0]) return;

    const filteredCompatibleGarments = filterCompatibleGarments(
      clothesData,
      state.chosenClothes[0]
    );

    const newOutfit = outfit(
      combineColorsData,
      filteredCompatibleGarments,
      state.chosenClothes[0]
    );
    console.log(newOutfit);
  };

  // return all handlers
  return {
    handleSelectClothes,
    handleSelectGarment,
    handleSelectColor,
    handleCreateOutfit,
  };
};
