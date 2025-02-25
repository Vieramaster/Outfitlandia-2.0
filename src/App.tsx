//HOOKS
import { MouseEventHandler, useEffect, useState } from "react";
import { UseFetch } from "./hooks/UseFetch";

//DATA
import { DefaultImages } from "./data/Images";
import { productProps } from "./data/types";


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
    "top" | "coat" | "pants" | null
  >(null);
  const [chosenClothes, setChosenClothes] = useState<productProps[]>([]);
  const [hiddenList, setHiddenList] = useState(0);

  const resetState = () => {
    setImagesMainButtons(DefaultImages);
    setHideSection(false);
    setSearchClothes(null);
    setChosenClothes([]);
    setHiddenList(0);
  };

  const { data: garmentsData } = UseFetch("clothes", searchClothes);

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
  };

  const handleGarmentSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { id } = event.currentTarget;
    const garmentFilter = garmentsData?.filter(
      (garment) => garment.id === Number(id)
    );

    if (garmentFilter?.length) {
      setChosenClothes(garmentFilter);
      setHiddenList(2);
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

    setChosenClothes((prevState) =>
      prevState.length > 0 && prevState[0]
        ? [{ ...prevState[0], colors: [colorFilter] }]
        : []
    );

    setHiddenList(0);
    setHideSection(false);

    setImagesMainButtons((prevState) =>
      prevState.map((item) => ({
        ...item,
        [selectedGarment]: colorFilter.imageColor,
      }))
    );
  };

  const handleSearchOutfit = () => {};

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (garmentsData?.length) {
      setHiddenList(1);
    }
  }, [garmentsData]);

  //DATAAAAAAAAAA

  if (chosenClothes) {
    const chosenClothesID = chosenClothes[0]?.id;
    const chosenClothesGARMENT = chosenClothes[0]?.garment;
    const chosenClothesNAME = chosenClothes[0]?.name;
    const chosenClothesIMAGE = chosenClothes[0]?.image;
    const chosenClothesSTYLE = chosenClothes[0]?.style;
    const chosenClothesWEATHER = chosenClothes[0]?.weather;
    const chosenClothesCOLORS = chosenClothes[0]?.colors;
    const chosenClothesCOLORSNAME = chosenClothes[0]?.colors[0]?.colorName;

    const { data: fetchData } = UseFetch("clothes", null);
    const { data: fetchColors } = UseFetch("colors", null);


    const garmentFilter = fetchData?.filter(
      (item) => item.garment !== chosenClothesGARMENT
    );

    const findColorMatch = fetchColors?.filter((item) => chosenClothesCOLORSNAME.)
  }

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
            isHidden={hiddenList === 1}
            arrayClothes={garmentsData}
            onGarmentSubmit={handleGarmentSubmit}
          />
          <ColorList
            isHidden={hiddenList === 2}
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
