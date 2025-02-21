import { ClothesButton } from "../buttons/ClothesButton";
import { product } from "../../data/types";

interface Section {
  isHidden: boolean;
  arrayClothes: product[] | null;
  onGarmentSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const GarmentList = ({ arrayClothes, onGarmentSubmit }: Section) => {
  return (
    <ul className="bg-red-500 flex flex-wrap gap-8 w-full h-[calc(100vh-8rem)] overflow-y-scroll justify-center items-center lg:h-[37rem] lg:w-[95%]">
      {arrayClothes?.map(({ image, name, garment, id }) => (
        <li key={garment + id}>
          <ClothesButton
            image={image}
            id={String(id)}
            data-id={garment}
            onClick={onGarmentSubmit}
            aria-labelledby={name}
            title={name}
          />
        </li>
      ))}
    </ul>
  );
};
