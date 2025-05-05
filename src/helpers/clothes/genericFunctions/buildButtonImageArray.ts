import {
  ListStructureType,
  MainButtonsProps,
} from "../../../data/types/ClothesTypes";
import { isOneOf } from "../../../validators/genericValidators/isOneOf";

/**
 * Map each garment key to its default image path.
 * Add new garment types here once, and the code below picks them up automatically.
 */
const DEFAULT_IMAGES: Readonly<MainButtonsProps> = {
  top: "default_top.webp",
  coat: "default_coat.webp",
  belt: "default_belt.webp",
  shoes: "default_shoes.webp",
  pants: "default_pants.webp",
};

/**
 * Build an array of button‑image props from a list of garment selections.
 * Leverages dynamic key iteration so adding a new garment type
 * in MainButtonsProps & ListStructureType is zero‑boilercode.
 */
export const buildButtonImageArray = (
  selections: ListStructureType[]
): MainButtonsProps[] => {
  // Grab the keys from our default‑map (guaranteed to match MainButtonsProps)
  const garmentKeys = Object.keys(DEFAULT_IMAGES) as Array<
    keyof MainButtonsProps
  >;

  return selections.map((group) => {
    // Reduce into a MainButtonsProps, pulling each image via our helper
    return garmentKeys.reduce((acc, key) => {
      acc[key] = getPrimaryImage(group, key);
      return acc;
    }, {} as MainButtonsProps);
  });
};

/* ------------------------ Internal helpers ------------------------ */

/**
 * Safely returns the first imageColor for a garment group,
 * or the configured default if none exists.
 */
export const getPrimaryImage = <K extends keyof MainButtonsProps>(
  group: ListStructureType,
  key: K
): string => {
  const img = group[key]?.colors?.[0]?.imageColor;
  return img ?? DEFAULT_IMAGES[key];
};
