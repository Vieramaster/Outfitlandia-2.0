import { ClothesButton } from "../buttons/ClothesButton";
import { ChangeClothesButton } from "../buttons/ChangeClothesButton";
import { DefaultImages } from "../../data/ImageDefaultButtons";
import { ClothesContainer } from "../containers/ClothesContainer";

interface MainSectionProps {
  images: typeof DefaultImages;
  onSearchCLothes: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSearchOutfit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const MainSection = ({
  images,
  onSearchCLothes,
  onSearchOutfit,
}: MainSectionProps) => {
  const { top, coat, pants, belt, shoes } = images;

  const imagesIndex = [top, coat, pants];
  const CATEGORIES = ["top", "coat", "pants"];

  return (
    <section className="bg-red-600 grow-1 w-full  lg:h-full lg:w-1/2  2xl:w-1/3 grid place-content-center">
      <div className="grid grid-cols-2 gap-4 place-items-center bg-red-900 w-[19rem] md:w-[27rem]  ">
        {Array.from({ length: 4 }).map((_, index) => {
          return index !== 3 ? (
            <ClothesButton
              key={index}
              image={imagesIndex[index] || ""}
              id={CATEGORIES[index]}
              onClick={onSearchCLothes}
              aria-labelledby={CATEGORIES[index]}
            />
          ) : (
            <div
              className="clothesButton bg-orange-400 flex flex-col gap-4"
              key={"shoes & belt"}
            >
              <div className="w-full h-1/2 bg-red-500 flex gap-4">
                <ClothesContainer
                  style="belt"
                  image={belt || "belt"}
                  altImage="belt"
                />
                <ChangeClothesButton onClick={onSearchOutfit}>
                  hola
                </ChangeClothesButton>
              </div>
              <ClothesContainer
                style="shoes"
                image={shoes || "shoes"}
                altImage="shoes"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
