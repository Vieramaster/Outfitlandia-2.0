import { productProps } from "../data/types";
import { UseFetch } from "./UseFetch";

interface OutfitProps {
  designatedGarment: productProps[];
}

export const UseOutfitCreator = ({ designatedGarment }: OutfitProps) => {
  //Destructuring the designated garment
  const chosenClothesID = designatedGarment[0]?.id;
  const chosenClothesGARMENT = designatedGarment[0]?.garment;
  const chosenClothesNAME = designatedGarment[0]?.name;
  const chosenClothesIMAGE = designatedGarment[0]?.image;
  const chosenClothesSTYLE = designatedGarment[0]?.style;
  const chosenClothesWEATHER = designatedGarment[0]?.weather;
  const chosenClothesCOLORS = designatedGarment[0]?.colors;

  const { data: fetchData } = UseFetch("clothes", null);

  const filterGarments = fetchData?.filter(
    (item) => item.garment !== chosenClothesGARMENT
  );

  console.log(chosenClothesGARMENT);
};
