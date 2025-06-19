import {
  ClothesType,
  GarmentButtonType,
} from "../../types/clothes/clothes.types";

// COMPONENTS
import { Card } from "../ui/cards/Card";
import { SmallCard } from "../ui/cards/SmallCard";
import { BeltCard } from "../ui/cards/BeltCard";
import { OutfitButton } from "../ui/buttons/OutfitButton";
import { ClothesButton } from "../ui/buttons/ClothesButton";

// FUNCTIONS
import { searchFilter } from "../../helpers/clothes/genericFunctions/searchFilter";

interface ClothesInventoryProps {
  clothesArray: ClothesType[];
  onSelectClothes: (item: GarmentButtonType) => void;
}

export const ClothesInventory = ({
  clothesArray,
  onSelectClothes,
}: ClothesInventoryProps) => {

  const belt = searchFilter(clothesArray, "garment", "belt")[0];
  const shoes = searchFilter(clothesArray, "garment", "shoes")[0];
  if (!belt || !shoes) return null;
  
  return (
    <section
      className="
        bg-green-900 
        h-full 
        lg:w-2/5 
        grid 
        place-content-center
      "
      aria-labelledby="clothes-inventory"
    >
      <ul
        role="list"
        className="
          bg-red-800 
          w-[20rem] 
          grid 
          grid-cols-2 
          gap-2 
          place-items-center
        "
      >
        {clothesArray.map(({ colors, id, garment, name }) =>
          garment === "top" || garment === "coat" || garment === "pants" ? (
            <ClothesButton
              key={id}
              image={colors[0]?.imageColor!}
              name={name}
              onClick={() => onSelectClothes(garment)}
            />
          ) : null
        )}

        <Card>
          <SmallCard>
            <BeltCard image={belt.colors[0]?.imageColor!} arial={belt.name} />
            <OutfitButton />
          </SmallCard>

          <SmallCard arial={shoes.name}>
            <img
              src={shoes.colors[0]?.imageColor}
              alt={shoes.name}
              className="h-5/6"
            />
          </SmallCard>
        </Card>
      </ul>
    </section>
  );
};
