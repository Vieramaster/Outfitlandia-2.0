import { ClothesType, GarmentKeyType } from "./ClothesTypes";
import { DefaultImages } from "../listObjects/ImageDefaultButtons";

export type AppStateProps = {
  images: typeof DefaultImages;
  selectedGarment?: GarmentKeyType;
  chosenClothes: ClothesType[] | undefined;
  activeView: "main" | "garments" | "colors";
  isMobileMenuHidden: boolean;
};

export type ActionProps =
  | { type: "RESET" }
  | {
      type: "SELECT_GARMENT";
      garment: "top" | "coat" | "pants";
      chosenClothes: ClothesType[];
    }
  | { type: "SELECT_CLOTHING_ITEM"; chosenClothes: ClothesType[] }
  | {
      type: "SELECT_COLOR";
      chosenClothes: ClothesType[];
      images: typeof DefaultImages;
    }
  | { type: "GENERATE_OUTFIT"; images: typeof DefaultImages };
