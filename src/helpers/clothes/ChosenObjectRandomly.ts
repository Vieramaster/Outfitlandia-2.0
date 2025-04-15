import {
  ClothesListObject,
  ListStructureType,
} from "../../data/types/ClothesTypes";
import GetRandomElement from "../../components/utils/GetRandomElement";

/**
 * 
 * @param arrayClothes - This function takes an array of clothing objects and randomly selects one item from each garment type.
 * @param arrayClothes.clothes - An array of clothing objects, each containing a type of garment and an array of items.
 * @param arrayClothes.clothes.garment - The type of garment (e.g., "shirt", "pants").
 * @param arrayClothes.clothes.items - An array of items that belong to the specified garment type.
 * @returns - Returns an object ramdonly for each garment.

 */
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
