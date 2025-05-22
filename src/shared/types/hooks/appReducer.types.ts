import { ClothesType, GarmentType } from "../clothes/clothes.types";
import { imageDefaultButtons } from "../../image_objects/ImageDefaultButtons";

export type AppStateProps = {
  images: typeof imageDefaultButtons;
  selectedGarment?: GarmentType;
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
      images: typeof imageDefaultButtons;
    }
  | { type: "GENERATE_OUTFIT"; images: typeof imageDefaultButtons };
