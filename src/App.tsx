//HOOKS
import { MouseEventHandler, useCallback, useReducer } from "react";
import { useFetch } from "./hooks/useFetch";
import { outfitCreator } from "./helpers/clothes/outfitCreator";
import { useResponsiveLayout } from "./hooks/useResponsibleLayout";
import { useClothesData } from "./hooks/useClothes";
//FUNCTONS
import { searchFilter } from "./helpers/clothes/genericFunctions/searchFilter";
import { colorFilter } from "./helpers/clothes/genericFunctions/colorFilter";
//DATA
import {
  ClothesType,
  ColorNameType,
  GarmentKeyType,
} from "./data/types/ClothesTypes";
import { appReducer, initialState } from "./hooks/appReducer";
import { ERROR_MESSAGES_OUTFIT } from "./data/types/ValidatorResultType";
//COMPONENTS
import { Header } from "./components/layout/Header";
import { MainSection } from "./components/sections/MainSection";
import WeatherSection from "./components/sections/WeatherSection";
import { GarmentList } from "./components/lists/GarmentList";
import { ColorList } from "./components/lists/ColorList";
import { isNonEmptyArray } from "./validators/genericValidators/isNonEmptyArray";
import { isValidClothesApiResponse } from "./validators/garmentsValidators/isValidClothesApiResponse";
import { isValidCombineColorsApiResponse } from "./validators/combineColorsValidators/isValidCombineColorsApiResponse";

function App() {
  //CLOTHES DATA
  /*const [state, dispatch] = useReducer(appReducer, initialState);*/

  const { clothes, loading, error } = useClothesData();
  
  /*
  if (
    !isNonEmptyArray(garmentsData) ||
    isValidClothesApiResponse(garmentsData)
  ) {
    console.error(ERROR_MESSAGES_OUTFIT.MISSING_DATA);
    return undefined;
  }
  if (
    !isValidCombineColorsApiResponse(combineColorsData) ||
    combineColorsError
  ) {
    console.error(ERROR_MESSAGES_OUTFIT.NO_COLOR_DATA);
    return [];
  }
  const { isMobile } = useResponsiveLayout();

  const handleSearchClothes: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      const selectedClothes = currentTarget.id as GarmentKeyType;

      //FILTER GARMENT
      const garmentFilter = searchFilter(
        garmentsData,
        "garment",
        selectedClothes
      );

      dispatch({
        type: "SELECT_GARMENT",
        garment: selectedClothes,
        chosenClothes: garmentFilter,
      });
    },
    [garmentsData, dispatch]
  );

  const handleGarmentSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      const selectedGarment = Number(currentTarget.id);
      if (!state.chosenClothes) return undefined;
      //FILTER UNIQUE GARMENT
      const objectFilter = searchFilter(
        state.chosenClothes,
        "id",
        selectedGarment
      );
      dispatch({
        type: "SELECT_CLOTHING_ITEM",
        chosenClothes: objectFilter,
      });
    },
    [dispatch, state.chosenClothes]
  );

  const handleColorsSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      const colorNameID = currentTarget.id as ColorNameType;
      if (!state.chosenClothes) return undefined;
      const filteredColors = colorFilter(state.chosenClothes, colorNameID);

      //ELIMINATE THE OTHERS COLORS AND LEAVE THE CHOSEN COLOR
      const uniqueColor: ClothesType[] = state.chosenClothes!.map((item) => ({
        ...item,
        colors: filteredColors ?? [],
      }));

      const colorImage = uniqueColor[0]?.colors[0]?.imageColor || undefined;

      dispatch({
        type: "SELECT_COLOR",
        chosenClothes: uniqueColor,
        images: {
          ...state.images,
          [state.selectedGarment as GarmentKeyType]: colorImage,
        },
      });
    },
    [dispatch, state.chosenClothes, state.selectedGarment, state.images]
  );

  const handleSearchOutfit = useCallback(() => {
    if (!state.chosenClothes)
      return console.error("bug in state ChosenClothes");
    const outfit = outfitCreator(
      garmentsData,
      state.chosenClothes,
      combineColorsData
    );
    console.log(outfit);
  }, [garmentsData, state.chosenClothes]);

  return (
    <>
      <Header />
      <main className="relative w-full h-[calc(100vh-4rem)] min-h-[35rem] md:min-h-[45rem] flex flex-col lg:flex-row">
        <MainSection
          images={state.images}
          onSearchCLothes={handleSearchClothes}
          onSearchOutfit={handleSearchOutfit}
        />
        <section
          className={`${
            state.isMobileMenuHidden ? "block" : "hidden"
          } absolute w-full h-[calc(100vh-4rem)] bg-rose-200 grid place-content-center place-items-center lg:block lg:relative lg:w-1/2 lg:order-3 2xl:w-2/3`}
        >
          <GarmentList
            isShown={state.activeView === "garments"}
            arrayClothes={state.chosenClothes}
            onGarmentSubmit={handleGarmentSubmit}
          />
          <ColorList
            isShown={state.activeView === "colors"}
            arrayColors={state.chosenClothes}
            onColorsSubmit={handleColorsSubmit}
          />
        </section>
        <WeatherSection />
      </main>
    </>
  );
}


*/
}
export default App;
