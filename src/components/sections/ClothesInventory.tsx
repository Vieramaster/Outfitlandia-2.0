import {
  ClothesType,
  GarmentButtonType,
} from "../../types/clothes/clothes.types";

// COMPONENTS
import { Card } from "../ui/cards/Card";
import { SmallCard } from "../ui/cards/SmallCard";
import { BeltCard } from "../ui/cards/BeltCard";
import { StandardButton } from "../ui/buttons/StandardButton";
import { ClothesButton } from "../ui/buttons/ClothesButton";
import { CombineGarmentIcon } from "../icons/CombineGarmentIcon";

// FUNCTIONS
import { searchFilter } from "../../helpers/clothes/genericFunctions/searchFilter";
import { InventoryAlignmentClothes } from "../../helpers/clothes/sorterdClothes";

interface ClothesInventoryProps {
  clothesArray: ClothesType[];
  onSelectClothes: (item: GarmentButtonType) => void;
  onCreateOutfit: () => void;
  isActiveOutfitButton: boolean;
}

export const ClothesInventory = ({
  clothesArray,
  isActiveOutfitButton,
  onSelectClothes,
  onCreateOutfit,
}: ClothesInventoryProps) => {
  const belt = searchFilter(clothesArray, "garment", "belt")[0];
  const footwear = searchFilter(clothesArray, "garment", "footwear")[0];
  if (!belt || !footwear) return null;

  const sortedClothes = InventoryAlignmentClothes(clothesArray);

  return (
    <section
      className=" h-full lg:w-2/5 grid place-content-center"
      aria-labelledby="clothes-inventory"
    >
      <ul
        role="list"
        className="size-auto grid  grid-cols-2  gap-5 place-items-center"
      >
        {sortedClothes.map(({ colors, id, garment, name }) => (
          <ClothesButton
            key={id}
            image={colors[0]?.imageColor!}
            name={name}
            onClick={() => onSelectClothes(garment as GarmentButtonType)}
            isNameVisible={false}
          />
        ))}

        <Card isDescription={false}>
          <SmallCard container={false}>
            <BeltCard image={belt.colors[0]?.imageColor!} arial={belt.name} />

            <StandardButton
              variant="outfitButton"
              aria-label="button to create the outfit"
              onClick={onCreateOutfit}
              isEnabled={isActiveOutfitButton}
            >
              <CombineGarmentIcon
                className={
                  isActiveOutfitButton ? "fill-background" : "fill-layout"
                }
              />
            </StandardButton>
          </SmallCard>

          <SmallCard container={false}>
            <img
              src={footwear.colors[0]?.imageColor}
              alt={footwear.name}
              className="h-5/6"
              aria-label={footwear.name}
            />
          </SmallCard>
        </Card>
      </ul>
    </section>
  );
};
