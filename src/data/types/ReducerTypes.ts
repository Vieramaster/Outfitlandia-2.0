import { ClothesProps, GarmentKeyType } from "./ClothesTypes";
import { DefaultImages } from "../listObjects/ImageDefaultButtons";

export type AppStateProps = {
  images: typeof DefaultImages;
  selectedGarment?: GarmentKeyType;
  chosenClothes: ClothesProps[] | undefined;
  activeView: "main" | "garments" | "colors";
  isMobileMenuHidden: boolean;
};

export type ActionProps =
  | { type: "RESET" }
  | {
      type: "SELECT_GARMENT";
      garment: "top" | "coat" | "pants";
      chosenClothes: ClothesProps[];
    }
  | { type: "SELECT_CLOTHING_ITEM"; chosenClothes: ClothesProps[] }
  | {
      type: "SELECT_COLOR";
      chosenClothes: ClothesProps[];
      images: typeof DefaultImages;
    }
  | { type: "GENERATE_OUTFIT"; images: typeof DefaultImages };
