//TYPES
import { ClothesType } from "../../../types/clothes/clothes.types";

//COMPONENTS
import { ClothesButton } from "../buttons/ClothesButton";
interface ClothesListProps {
  data: ClothesType[];
  isShown: boolean;
  onSelectGarment: (item: number) => void;
}
export const ClothesList = ({
  data,
  isShown,
  onSelectGarment,
}: ClothesListProps) =>
  isShown && (
    <ul
      role="list"
      className="          
    p-10
    min-h-full 
    w-full 
    grid 
    grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] 
    place-content-center
    items-center
    gap-5
    lg:place-content-start
    "
    >
      {data.map(({ image, id, name }) => {
        return (
          <ClothesButton
            key={id}
            {...{ name, image }}
            onClick={() => onSelectGarment(id)}
          />
        );
      })}
    </ul>
  );
