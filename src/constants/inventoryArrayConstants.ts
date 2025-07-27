import { ClothesType } from "../types/clothes/clothes.types";

export const defaultInventoryArray: ClothesType[] = [
  {
    id: 1000,
    garment: "top",
    name: "default top",
    image: "images/top/hoodie/hoodie_default.webp",
    style: ["basic", "casual", "elegant"],
    weather: ["hot", "mild", "cold"],
    colors: [
      {
        colorName: "default",
        hex: "#ffffff",
        title: "default",
        imageColor: "images/top/hoodie/hoodie_default.webp",
      },
    ],
  },
  {
    id: 1001,
    garment: "coat",
    name: "default coat",
    image: "/images/coat/denim_jacket/denim_jacket_white.webp",
    style: ["basic", "casual", "elegant"],
    weather: ["hot", "mild", "cold"],
    colors: [
      {
        colorName: "default",
        hex: "#ffffff",
        title: "default",
        imageColor: "/images/coat/denim_jacket/denim_jacket_white.webp",
      },
    ],
  },
  {
    id: 1002,
    garment: "pants",
    name: "default pants",
    image: "/images/default/defaultPants-lg.webp",
    style: ["basic", "casual", "elegant"],
    weather: ["hot", "mild", "cold"],
    colors: [
      {
        colorName: "default",
        hex: "#ffffff",
        title: "default",
        imageColor: "/images/default/defaultPants-lg.webp",
      },
    ],
  },
  {
    id: 1003,
    garment: "belt",
    name: "default belt",
    image: "/images/default/defaultBelt-lg.webp",
    style: ["basic", "casual", "elegant"],
    weather: ["hot", "mild", "cold"],
    colors: [
      {
        colorName: "default",
        hex: "#ffffff",
        title: "default",
        imageColor: "/images/default/defaultBelt-lg.webp",
      },
    ],
  },
  {
    id: 1004,
    garment: "shoes",
    name: "default shoes",
    image: "/images/default/defaultShoes-lg.webp",
    style: ["basic", "casual", "elegant"],
    weather: ["hot", "mild", "cold"],
    colors: [
      {
        colorName: "default",
        hex: "#ffffff",
        title: "default",
        imageColor: "/images/default/defaultShoes-lg.webp",
      },
    ],
  },
];
