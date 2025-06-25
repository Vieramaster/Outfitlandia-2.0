import { ClothesType, GarmentType } from "../types/clothes/clothes.types";

export type AppStateProps = {
  inventory: ClothesType[];
  chosenClothes: ClothesType[];
  activeView: "main" | "garments" | "colors";
  isMobileMenuHidden: boolean;
};

export type ActionProps =
  | { type: "RESET" }
  | {
      type: "SELECT_CLOTHING_ITEM";
      chosenClothes: ClothesType[];
    }
  | { type: "SELECT_GARMENT"; chosenClothes: ClothesType[] }
  | {
      type: "SELECT_COLOR";
      chosenClothes: ClothesType[];
      inventory: ClothesType[];
    }
  | { type: "GENERATE_OUTFIT"; inventory: ClothesType[] };
