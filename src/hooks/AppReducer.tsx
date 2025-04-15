import { AppStateProps, ActionProps } from "../data/types/ReducerTypes";
import { DefaultImages } from "../data/listObjects/ImageDefaultButtons";

export const initialState: AppStateProps = {
  images: DefaultImages,
  selectedGarment: undefined,
  chosenClothes: [],
  activeView: "main",
  isMobileMenuHidden: false,
};

export const appReducer = (
  state: AppStateProps,
  action: ActionProps
): AppStateProps => {
  switch (action.type) {
    case "RESET":
      return initialState;

    case "SELECT_GARMENT":
      return {
        ...state,
        selectedGarment: action.garment,
        chosenClothes: action.chosenClothes,
        activeView: "garments",
        isMobileMenuHidden: window.innerWidth < 1024,
      };
    case "SELECT_CLOTHING_ITEM":
      return {
        ...state,
        activeView: "colors",
        chosenClothes: action.chosenClothes,
      };
    case "SELECT_COLOR":
      return {
        ...state,
        activeView: "main",
        chosenClothes: action.chosenClothes,
        images: action.images,
        isMobileMenuHidden: false,
      };
    case "GENERATE_OUTFIT":
      return {
        ...state,
        images: action.images,
      };
    default:
      return state;
  }
};

export default appReducer;
