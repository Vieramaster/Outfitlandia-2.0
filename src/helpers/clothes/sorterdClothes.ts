import { ClothesType } from "../../types/clothes/clothes.types";

const garmentOrder = ["top", "coat", "pants"];

export const InventoryAlignmentClothes = (clothesArray: ClothesType[]) =>
  clothesArray
    .filter(({ garment }) => garmentOrder.includes(garment))
    .sort(
      (a, b) =>
        garmentOrder.indexOf(a.garment) - garmentOrder.indexOf(b.garment)
    );
