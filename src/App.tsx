//HOOKS
import { MouseEventHandler, useEffect, useState, useMemo } from "react";
import { useFetch } from "./hooks/useFetch";
import { useOutfitCreator } from "./hooks/useOutfitCreator";

//DATA
import { DefaultImages } from "./data/ImageDefaultButtons";
import { ClothesProps } from "./data/types";

//COMPONENTS
import { Header } from "./components/layout/Header";
import { MainSection } from "./components/sections/MainSection";
import { WeatherSection } from "./components/sections/WeatherSection";
import { GarmentList } from "./components/lists/GarmentList";
import { ColorList } from "./components/lists/ColorList";

function App() {
  const [imagesMainButtons, setImagesMainButtons] = useState(DefaultImages);
  const [hideSection, setHideSection] = useState(false);
  const [searchClothes, setSearchClothes] = useState<
    "top" | "coat" | "pants" | undefined
  >(undefined);
  const [chosenClothes, setChosenClothes] = useState<ClothesProps[]>([]);
  const [shownList, setshownList] = useState(0);

  //RESET ALL STATES
  const resetState = () => {
    setImagesMainButtons(DefaultImages);
    setHideSection(false);
    setSearchClothes(undefined);
    setChosenClothes([]);
    setshownList(0);
  };

  //RESET USESATE ON SCREEN SIZE CHANGES
  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setHideSection(false);
      setImagesMainButtons(DefaultImages);
    }
  };

  const handleSearchCLothes: MouseEventHandler<HTMLButtonElement> = (event) => {
    resetState();
    const { id } = event.currentTarget;
    setSearchClothes(id as "top" | "coat" | "pants");

    if (window.innerWidth < 1024) {
      setHideSection(true);
    }
    setshownList(1);
  };
  //CLOTHES DATA
  const { data: garmentsData } = useFetch("clothes");

  //FILTER THE SELECTED GARMENT
  const garmentFilter = useMemo(() => {
    return garmentsData?.filter(({ garment }) => garment === searchClothes);
  }, [garmentsData, searchClothes]);

  const handleGarmentSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { id } = event.currentTarget;

    //FILTER UNIQUE GARMENT
    const objectFilter = garmentFilter?.filter(
      (garment) => garment.id === Number(id)
    );

    if (objectFilter?.length) {
      setChosenClothes(objectFilter);
      setshownList(2);
    }
  };

  const handleColorsSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { id } = event.currentTarget;

    const colorFilter = chosenClothes?.[0]?.colors?.find(
      (color) => color.colorName === id
    );
    const selectedGarment = chosenClothes?.[0]?.garment as
      | "top"
      | "coat"
      | "pants";

    if (!selectedGarment || !colorFilter) return;

    //ELIMINATE THE OTHERS COLORS AND LEAVE THE CHOSEN COLOR
    setChosenClothes((prevState) =>
      prevState.length > 0 && prevState[0]
        ? [{ ...prevState[0], colors: [colorFilter] }]
        : []
    );

    setshownList(0);
    setHideSection(false);

    //ADD COLOR IMAGE TO INVENTORY
    setImagesMainButtons((prevState) =>
      prevState.map((item) => ({
        ...item,
        [selectedGarment]: colorFilter.imageColor,
      }))
    );
  };

  const outfitImages = useOutfitCreator(garmentsData, chosenClothes);
  
  console.log(outfitImages);

  
  const handleSearchOutfit = () => {
    if (outfitImages && outfitImages.length > 0) {
      setImagesMainButtons(outfitImages);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHideSection = hideSection ? "block" : "hidden";

  return (
    <>
      <Header />
      <main className="relative w-full h-[calc(100vh-4rem)] min-h-[35rem] md:min-h-[45rem] flex flex-col lg:flex-row">
        <MainSection
          images={imagesMainButtons}
          onSearchCLothes={handleSearchCLothes}
          onSearchOutfit={handleSearchOutfit}
        />
        <section
          className={`${isHideSection} absolute w-full h-[calc(100vh-4rem)] bg-rose-200 grid place-content-center place-items-center lg:block lg:relative lg:w-1/2 lg:order-3 2xl:w-2/3`}
        >
          <GarmentList
            isShown={shownList === 1}
            arrayClothes={garmentFilter}
            onGarmentSubmit={handleGarmentSubmit}
          />
          <ColorList
            isShown={shownList === 2}
            arrayColors={chosenClothes}
            onColorsSubmit={handleColorsSubmit}
          />
        </section>
        <WeatherSection />
      </main>
    </>
  );
}

export default App;
