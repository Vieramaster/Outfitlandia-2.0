import { ClothesButton } from "../buttons/ClothesButton";
import { ClothesProps } from "../../data/types";
import { ColorButton } from "../buttons/ColorButton";
interface Section {
  isHidden: boolean;
  arrayClothes: ClothesProps[] | undefined;
  arrayColors: ClothesProps[] | undefined;
  onGarmentSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onColorsSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ChoiseSection = ({
  isHidden,
  arrayClothes,
  arrayColors,
  onGarmentSubmit,
  onColorsSubmit,
}: Section) => {
  const hidden = isHidden ? "absolute w-full h-full" : "w-0 h-0 hidden";
  return (
    <section
      className={`${hidden} w-full h-[calc(100vh-4rem)]  bg-rose-200 rounded shadow-md grid place-content-center place-items-center lg:block lg:relative lg:w-1/2  lg:order-3 2xl:w-2/3`}
    >
      <ul className="bg-red-500 flex flex-wrap gap-8 w-full h-[calc(100vh-8rem)] overflow-y-scroll justify-center items-center lg:h-[37rem] lg:w-[95%]">
        {arrayColors && arrayColors.length > 0
          ? arrayColors.flatMap(({ colors }) =>
              colors?.map(({ hex, colorName, title }) => (
                <li key={colorName}>
                  <ColorButton
                    hex={hex}
                    aria-labelledby={title}
                    id={colorName}
                    onClick={onColorsSubmit}
                    title={colorName}
                  />
                </li>
              ))
            )
          : arrayClothes?.map(({ image, name, garment, id }) => (
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
    </section>
  );
};
