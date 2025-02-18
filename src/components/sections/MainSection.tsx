import { InventoryContainer } from "../containers/InventoryContainer";
import { ClothesButton } from "../buttons/ClothesButton";
import { ChangeClothesButton } from "../buttons/ChangeClothesButton";
import { mainImages } from "../../data/types";
import { ClothesContainer } from "../containers/ClothesContainer";
import { MouseEventHandler } from "react";

interface MainSectionProps {
  images: mainImages[];
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}

export const MainSection = ({ images, handleSubmit }: MainSectionProps) => {
  const [{ top, coat, pants, belt, shoes }] = images;

  const imagesIndex = [top, coat, pants];
  const CATEGORIES = ["top", "coat", "pants"];

  return (
    <section className="bg-red-600 grow-1  lg:h-full lg:w-1/3  grid place-content-center px-16">
      <div className="grid grid-cols-2 gap-4 place-items-center bg-red-900 w-[21rem] md:w-[30rem]">
        {Array.from({ length: 4 }).map((_, index) => {
          return index !== 3 ? (
            <ClothesButton

              key={index}
              image={imagesIndex[index]}
              data-id={CATEGORIES[index]}
              onClick={handleSubmit}
            />
          ) : (
            <InventoryContainer key={"containerButtons"}>
              <div className="w-full h-1/2 bg-red-500 flex gap-4">
                <ClothesContainer style="belt" image={belt} altImage="belt" />
                <ChangeClothesButton>hola</ChangeClothesButton>
              </div>

              <ClothesContainer style="shoes" image={shoes} altImage="shoes" />
            </InventoryContainer>
          );
        })}
      </div>
    </section>
  );
};
