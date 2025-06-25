//TYPES
import { ClothesType } from "./types/clothes/clothes.types";
import { CombineColorsType } from "./types/clothes/combineColors.types";
//HOOKS
import { consumeAPI } from "./api/consumeAPI";
import { useDynamicVh } from "./hooks/useDynamicVh";
//VALIDATORS
import { clothesApiValidator } from "./api/main_clothes/clothes/validators/clothesApiValidator";
import { combineColorsApiValidator } from "./api/main_clothes/combineColors/validators/combineColorsApiValidator";
//COMPONENTS
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/ErrorPage";
import { MainLayout } from "./components/layout/MainLayout";

//NUEVO

function App() {
  //HOOKS
  useDynamicVh();
  //API RESPONSES
  const {
    error: garmentError,
    loading: garmentLoading,
    validatedData: clothesApiResponse,
  } = consumeAPI<ClothesType[]>("/garmentData.json", clothesApiValidator);

  const {
    error: combineColorError,
    loading: combineColorLoading,
    validatedData: combineColorApiResponse,
  } = consumeAPI<CombineColorsType[]>(
    "/combineColors.json",
    combineColorsApiValidator
  );

  const Content = () => {
    if (garmentLoading || combineColorLoading) return <h1>Cargando...</h1>;
    if (
      garmentError ||
      combineColorError ||
      !clothesApiResponse ||
      !combineColorApiResponse
    )
      return <ErrorPage />;
    return (
      <Home
        clothesData={clothesApiResponse}
        combineColorsData={combineColorApiResponse}
      />
    );
  };

  return (
    <MainLayout>
      <Content />
    </MainLayout>
  );
}
export default App;
/**
 * if (!garmentsData) return;

  const { isMobile } = useResponsiveLayout();

  const handleSearchClothes: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      const selectedClothes = currentTarget.id as GarmentButtonType;
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
      const colorNameID = currentTarget.id;
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
          [state.selectedGarment as GarmentType]: colorImage,
        },
      });
    },
    [dispatch, state.chosenClothes, state.selectedGarment, state.images]
  );

  const handleSearchOutfit = useCallback(() => {
    if (!state.chosenClothes || !combineColorData)
      return console.error("bug in state ChosenClothes");
    const outfit = outfitCreator(
      garmentsData,
      state.chosenClothes,
      combineColorData
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
 */
