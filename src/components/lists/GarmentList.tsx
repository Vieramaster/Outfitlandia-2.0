import { ClothesButton } from "../buttons/ClothesButton";
import { ClothesProps } from "../../data/types/Clothestypes";

interface Section {
  isShown: boolean;
  arrayClothes: ClothesProps[] | undefined;
  onGarmentSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const GarmentList = ({
  arrayClothes,
  isShown,
  onGarmentSubmit,
}: Section) => {
  const hidden = isShown ? "block" : "hidden";

  return (
    <ul
      className={`${hidden} bg-red-500 flex flex-wrap gap-8 w-full h-[calc(100vh-8rem)] overflow-y-scroll justify-center items-center lg:h-[37rem] lg:w-[95%]`}
    >
      {arrayClothes?.map(({ image, name, garment, id }, index) => (
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
};
