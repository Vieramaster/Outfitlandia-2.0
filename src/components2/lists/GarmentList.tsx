import { ClothesButton } from "../buttons/ClothesButton";
import { ClothesType } from "../../data/types/ClothesTypes";
import { isNonEmptyArray } from "../../validators/genericValidators/isNonEmptyArray";

interface GarmentListProps {
  isShown: boolean;
  arrayClothes: ClothesType[] | undefined;
  onGarmentSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const GarmentList = ({
  arrayClothes,
  isShown,
  onGarmentSubmit,
}: GarmentListProps) => (
  <ul
    className={`${
      isShown ? "block" : "hidden"
    } bg-red-500 flex flex-wrap gap-8 w-full h-[calc(100vh-8rem)] overflow-y-scroll justify-center items-center lg:h-[37rem] lg:w-[95%]`}
  >
    {!isNonEmptyArray(arrayClothes)
      ? null
      : arrayClothes.map(({ image, name, garment, id }, index) => (
          <li key={index + id}>
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
