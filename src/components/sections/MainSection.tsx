import { InventoryContainer } from "../containers/InventoryContainer";
import { ClothesButton } from "../buttons/ClothesButton";
import { ChangeClothesButton } from "../buttons/ChangeClothesButton";
import { mainImages } from "../../data/types";
import { MouseEventHandler } from "react";

interface MainSectionProps {
  images: mainImages;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}

export const MainSection = ({ images, handleSubmit }: MainSectionProps) => {
  const { top, coat, pants, belt, shoes } = images;

  return (
    <section className="grid grid-cols-2 gap-4 place-items-center grid-rows-[auto]">
      {Array.from({ length: 4 }).map((_, index) => {
        const imagesButton =
          index === 0 ? top : index === 1 ? coat : index === 2 ? pants : null;

        const dataButton =
          index === 0
            ? "top"
            : index === 1
            ? "coat"
            : index === 2
            ? "pants"
            : null;

        return index !== 3 ? (
          <ClothesButton
            variant="normal"
            key={index}
            image={imagesButton!}
            data-id={dataButton!}
            onClick={handleSubmit}
          />
        ) : (
          <InventoryContainer key={"containerButtons"}>
            <div className="w-full h-1/2 flex justify-between bg-violet-400">
              <ClothesButton
                variant="belt"
                image={belt}
                data-id="belt"
                onClick={handleSubmit}
              />
              <ChangeClothesButton>"hola"</ChangeClothesButton>
            </div>

            <ClothesButton
              variant="shoes"
              image={shoes}
              data-id="shoes"
              onClick={handleSubmit}
            />
          </InventoryContainer>
        );
      })}
    </section>
  );
};
