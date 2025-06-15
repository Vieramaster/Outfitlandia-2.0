import { ClothesSection } from "../components/sections/ClothesSection";
import { Card } from "../components/ui/cards/Card";
import { ClothesButton } from "../components/ui/buttons/ClothesButton";
import { SmallCard } from "../components/ui/cards/SmallCard";
import { BeltCard } from "../components/ui/cards/BeltCard";
import { OutfitButton } from "../components/ui/buttons/OutfitButton";
//
interface ClothesInventoryProps {
  children: React.ReactNode;
}
export const ClothesInventory = ({ children }: ClothesInventoryProps) => (
  <ul className="bg-red-800  grid grid-cols-2 gap-2 place-items-center">
    {children}
  </ul>
);

import { imageDefaultButtons } from "../shared/image_objects/ImageDefaultButtons";

export const Home = () => {
  const { pants, top, coat, shoes, belt } = imageDefaultButtons;
  const mainClothes = [top, coat, pants];

  return (
    <>
      <ClothesSection>
        <ClothesInventory>
          {mainClothes.map((img, index) => (
            <Card key={index} arial="ropa">
              <ClothesButton image={img} />
            </Card>
          ))}
          <Card>
            <SmallCard>
              <BeltCard image={belt} />
              <OutfitButton />
            </SmallCard>
            <SmallCard arial="shoes">
              <img src={shoes} alt="" className="h-5/6" />
            </SmallCard>
          </Card>
        </ClothesInventory>
      </ClothesSection>
    </>
  );
};

/**<section className="bg-orange-900 h-full w-full absolute top-0 -z-0"></section>
 * 
 *       <section className="bg-red-600 grow-1 w-full  lg:h-full lg:w-1/2  2xl:w-1/3 grid place-content-center">
        <div className="grid grid-cols-2 gap-4 place-items-center bg-red-900 w-[19rem] md:w-[27rem]  "></div>
      </section>
 */

/**
       *  {Array.from({ length: 4 }).map((_, index) => {
            return index !== 3 ? (
              <Card type="main" key={index}>
                <ClothesButton image="" />
              </Card>
            ) : (
              <Card type="main" key={index}>
                <Card type="small">
                  <SmallButton />
                  <SmallButton />
                </Card>
                <Card type="small">
                  <img src="" alt="" className="size-5/6" />
                </Card>
              </Card>
            );
          })}
       */
