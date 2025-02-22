import { ClothesButton } from "../buttons/ClothesButton";
import { productProps } from "../../data/types";

interface Section {
  isHidden: boolean;
  arrayClothes: productProps[] | null;
  onGarmentSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const GarmentList = ({
  arrayClothes,
  isHidden,
  onGarmentSubmit,
}: Section) => {
  const hidden = isHidden ? "block" : "hidden";
  console.log("section",arrayClothes);
  return (
    <ul
      className={`${hidden} bg-red-500 flex flex-wrap gap-8 w-full h-[calc(100vh-8rem)] overflow-y-scroll justify-center items-center lg:h-[37rem] lg:w-[95%]`}
    >
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
