import {
  ClothesListObject,
  ListStructureType,
} from "../../data/types/ClothesTypes";
import GetRandomElement from "../../components/utils/GetRandomElement";

const ChosenObjectRandomly = (arrayClothes: ClothesListObject[]) => {
  const result: ListStructureType = {};
  for (const combineItem of arrayClothes) {
    for (const [garment, items] of Object.entries(combineItem)) {
      if (Array.isArray(items) && items.length > 0) {
        const randomItem = GetRandomElement(items);
        if (randomItem) {
          result[garment] = randomItem;
        }
      }
    }
  }
  return result;
};

export default ChosenObjectRandomly;
