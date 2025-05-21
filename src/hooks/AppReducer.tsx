import { AppStateProps, ActionProps } from "../data/types/ReducerTypes";
import { DefaultImages } from "../shared/image_objects/ImageDefaultButtons";

/**
 * initialState – Default values for the useReducer hook
 *
 * This object defines the starting state for the appReducer when used with React’s useReducer.
 * It represents the UI and data configuration before any user interaction.
 *
 * @property images               – DefaultImages used for the main view
 * @property selectedGarment      – Currently selected garment key (or undefined)
 * @property chosenClothes        – Array of clothing items the user has picked
 * @property activeView           – Which view is active: "main" | "garments" | "colors"
 * @property isMobileMenuHidden   – Whether the mobile menu is hidden
 */
export const initialState: AppStateProps = {
  images: DefaultImages,
  selectedGarment: undefined,
  chosenClothes: [],
  activeView: "main",
  isMobileMenuHidden: false,
};

/**
 * appReducer – Reducer function for useReducer in the Outfit app
 *
 * Use within a component as:
 * ```ts
 * const [state, dispatch] = useReducer(appReducer, initialState);
 *
 * Handles user-driven state transitions for garment selection, color picking,
 * outfit generation, and resetting the UI.
 *
 * @param state  – The current state slice managed by this reducer
 * @param action – An action describing what happened and any payload needed
 * @returns A new state object based on the action type (immutable update)
 */
export const appReducer = (
  state: AppStateProps,
  action: ActionProps
): AppStateProps => {
  switch (action.type) {
    /** Reset everything back to the initial configuration */
    case "RESET":
      return initialState;

    /** User picked a garment category; switch to the garments view */
    case "SELECT_GARMENT":
      return {
        ...state,
        selectedGarment: action.garment,
        chosenClothes: action.chosenClothes,
        activeView: "garments",
        isMobileMenuHidden: window.innerWidth < 1024,
      };

    /** User picked a specific clothing item; switch to color selection */
    case "SELECT_CLOTHING_ITEM":
      return {
        ...state,
        activeView: "colors",
        chosenClothes: action.chosenClothes,
      };

    /** User picked a color; update images and return to main view */
    case "SELECT_COLOR":
      return {
        ...state,
        activeView: "main",
        chosenClothes: action.chosenClothes,
        images: action.images,
        isMobileMenuHidden: false,
      };

    /** Generate a new outfit image set without changing view or selections */
    case "GENERATE_OUTFIT":
      return {
        ...state,
        images: action.images,
      };

    /** If action type is unknown, return current state unchanged */
    default:
      return state;
  }
};

export default appReducer;
