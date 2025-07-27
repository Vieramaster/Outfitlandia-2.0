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
      w-full p-10 
      grid  grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] 
      gap-5 
     overflow-y-auto 
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
