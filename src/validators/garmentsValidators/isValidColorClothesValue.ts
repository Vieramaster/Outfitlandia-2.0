import {
  ColorsArray,
  HexArray,
  TitleArray,
} from "../../data/listObjects/ArrayColorValidations";

const IsValidColorClothesValue = (key: string, value: unknown): boolean => {
  switch (key) {
    case "colorName":
      return typeof value === "string" && ColorsArray.includes(value);
    case "hex":
      return typeof value === "string" && HexArray.includes(value);
    case "title":
      return typeof value === "string" && TitleArray.includes(value);
    case "imageColor":
      return typeof value === "string";
    default:
      return false;
  }
};

export default IsValidColorClothesValue;
