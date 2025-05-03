import {
  ClothesListObject,
  ListStructureType,
} from "../../../data/types/ClothesTypes";
import { isNonEmptyArray } from "../../../validators/genericValidators/isNonEmptyArray";
import { getRandomElement } from "../../../utils/getRandomElement";

/**
 * Given an array of grouped clothing items (each object maps garment keys to arrays of ClothesType),
 * selects one random item for each garment across all groups.
 *
 * @param groups - Array of ClothesListObject, where each object’s keys are garment names
 *                 and values are arrays of ClothesType candidates.
 * @returns A ListStructureType mapping each garment name to a single randomly chosen ClothesType.
 */
export const pickRandomClothes = (
  groups: ClothesListObject[]
): ListStructureType => {
  return groups.reduce<ListStructureType>((selection, group) => {
    Object.entries(group).forEach(([garmentKey, items]) => {
      if (isNonEmptyArray(items)) {
        const chosenItem = getRandomElement(items);
        if (chosenItem) {
          selection[garmentKey] = chosenItem;
        }
      }
    });
    return selection;
  }, {});
};
