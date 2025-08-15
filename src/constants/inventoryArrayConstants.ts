import { ClothesType } from "../types/clothes/clothes.types";

export const defaultInventoryArray: ClothesType[] = [
  {
    id: 1000,
    garment: "top",
    name: "top",
    image: "images/top/hoodie/hoodie_default.webp",
    style: ["basic", "casual", "elegant"],
    weather: ["hot", "mild", "cold"],
    colors: [
      {
        colorName: "white",
        hex: "#ffffff",
        title: "white",
        imageColor: "images/top/hoodie/hoodie_default.webp",
      },
    ],
  },
  {
    id: 1001,
    garment: "coat",
    name: "coat",
    image: "/images/coat/denim_jacket/denim_jacket_white.webp",
    style: ["basic", "casual", "elegant"],
    weather: ["hot", "mild", "cold"],
    colors: [
      {
        colorName: "white",
        hex: "#ffffff",
        title: "white",
        imageColor: "/images/coat/denim_jacket/denim_jacket_white.webp",
      },
    ],
  },
  {
    id: 1002,
    garment: "pants",
    name: "pants",
    image: "/images/pants/gabardine/gabardine_white.webp",
    style: ["basic", "casual", "elegant"],
    weather: ["hot", "mild", "cold"],
    colors: [
      {
        colorName: "white",
        hex: "#ffffff",
        title: "white",
        imageColor: "/images/pants/gabardine/gabardine_white.webp",
      },
    ],
  },
  {
    id: 1003,
    garment: "belt",
    name: "belt",
    image: "/images/belt/leather/leather_white.webp",
    style: ["basic", "casual", "elegant"],
    weather: ["hot", "mild", "cold"],
    colors: [
      {
        colorName: "white",
        hex: "#ffffff",
        title: "white",
        imageColor: "/images/belt/leather/leather_white.webp",
      },
    ],
  },
  {
    id: 1004,
    garment: "footwear",
    name: "footwear",
    image: "images/footwear/sneaker/sneaker_white.webp",
    style: ["basic", "casual", "elegant"],
    weather: ["hot", "mild", "cold"],
    colors: [
      {
        colorName: "white",
        hex: "#ffffff",
        title: "white",
        imageColor: "images/footwear/sneaker/sneaker_white.webp",
      },
    ],
  },
];
