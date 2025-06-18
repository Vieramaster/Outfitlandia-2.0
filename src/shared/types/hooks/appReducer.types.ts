import { ClothesType, GarmentType } from "../clothes/clothes.types";

export type AppStateProps = {
  inventory: ClothesType[];
  selectedGarment?: GarmentType;
  chosenClothes: ClothesType[] | undefined;
  activeView: "main" | "garments" | "colors";
  isMobileMenuHidden: boolean;
};

export type ActionProps =
  | { type: "RESET" }
  | {
      type: "SELECT_CLOTHING_ITEM";
      garment: "top" | "coat" | "pants";
      chosenClothes: ClothesType[];
    }
  | { type: "SELECT_GARMENT"; chosenClothes: ClothesType[] }
  | {
      type: "SELECT_COLOR";
      chosenClothes: ClothesType[];
      inventory: ClothesType[];
    }
  | { type: "GENERATE_OUTFIT"; inventory: ClothesType[] };
