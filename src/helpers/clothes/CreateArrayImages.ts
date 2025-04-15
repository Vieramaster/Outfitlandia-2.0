import {
  ListStructureType,
  MainButtonsProps,
} from "../../data/types/ClothesTypes";

const CreateArrayImages = (array: ListStructureType[]): MainButtonsProps[] =>
  array.map((item) => ({
    top: item.top?.colors?.[0]?.imageColor || "ruta_default_top.webp",
    coat: item?.coat?.colors?.[0]?.imageColor || "ruta_default_coat.webp",
    belt: item?.belt?.colors?.[0]?.imageColor || "ruta_default_belt.webp",
    shoes: item?.shoes?.colors?.[0]?.imageColor || "ruta_default_shoes.webp",
    pants: item?.pants?.colors?.[0]?.imageColor || "ruta_default_pants.webp",
  }));

export default CreateArrayImages;
