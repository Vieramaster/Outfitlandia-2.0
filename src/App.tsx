//HOOKS
import { MouseEventHandler, useCallback, useReducer } from "react";
import { useFetch } from "./hooks/useFetch";
import { OutfitCreator } from "./helpers/clothes/OutfitCreator";
import { useResponsiveLayout } from "./hooks/useResponsibleLayout";
//FUNCTONS
import SearchFilter from "./helpers/clothes/SearchFilter";
import ColorFilter from "./helpers/clothes/ColorFilter";
//DATA
import { ClothesProps, GarmentKeyType } from "./data/types/ClothesTypes";
import { CombineColorsProps } from "./data/types/ColorCombineTypes";
import { appReducer, initialState } from "./hooks/AppReducer";
//COMPONENTS
import { Header } from "./components/layout/Header";
import { MainSection } from "./components/sections/MainSection";
import WeatherSection from "./components/sections/WeatherSection";
import { GarmentList } from "./components/lists/GarmentList";
import { ColorList } from "./components/lists/ColorList";
import GarmentFilterValidator from "./helpers/validators/GarmentFilterValidator";

function App() {
  //CLOTHES DATA
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { data: garmentsData } = useFetch<ClothesProps[]>("/garmentData.json");
  const { data: fetchColorsData } = useFetch<CombineColorsProps[]>(
    "/combineColors.json"
  );

  const { isMobile } = useResponsiveLayout();

  const handleSearchClothes: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      const selectedClothes = currentTarget.id as GarmentKeyType;

      //FILTER GARMENT
      const garmentFilter = SearchFilter(
        garmentsData,
        "garment",
        selectedClothes
      );

      if (!GarmentFilterValidator(garmentFilter)) return undefined;

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

      //FILTER UNIQUE GARMENT
      const objectFilter = SearchFilter(
        state.chosenClothes,
        "id",
        selectedGarment
      );
      if (!GarmentFilterValidator(objectFilter)) return undefined;

      dispatch({
        type: "SELECT_CLOTHING_ITEM",
        chosenClothes: objectFilter,
      });
    },
    [dispatch, state.chosenClothes]
  );

  const handleColorsSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      const colorNameID = currentTarget.id;

      const filteredColors = ColorFilter(state.chosenClothes, colorNameID);

      //ELIMINATE THE OTHERS COLORS AND LEAVE THE CHOSEN COLOR
      const uniqueColor: ClothesProps[] = state.chosenClothes!.map((item) => ({
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
    const outfit = OutfitCreator(
      garmentsData,
      state.chosenClothes,
      fetchColorsData
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

export default App;
