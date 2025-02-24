import { MouseEventHandler, useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { Header } from "./components/layout/Header";
import { MainSection } from "./components/sections/MainSection";
import { WeatherSection } from "./components/sections/WeatherSection";
import { GarmentList } from "./components/lists/GarmentList";
import { ColorList } from "./components/lists/ColorList";
import { DefaultImages } from "./data/Images";
import { productProps } from "./data/types";

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

  const { data: garmentsData } = useFetch("clothes", searchClothes);

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setHideSection(false);
      setImagesMainButtons(DefaultImages);
    }
  };

  const handleSearch: MouseEventHandler<HTMLButtonElement> = (event) => {
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
      prevState.length > 0 ? [{ ...prevState[0], colors: [colorFilter] }] : []
    );

    setHiddenList(0);
    setHideSection(false);

    setImagesMainButtons((prevState) =>
      prevState.map((item) => ({
        ...item,
        [selectedGarment]: colorFilter.imageColor || item[selectedGarment],
      }))
    );
  };

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

  const isHideSection = hideSection ? "block" : "hidden";

  return (
    <>
      <Header />
      <main className="relative w-full h-[calc(100vh-4rem)] min-h-[35rem] md:min-h-[45rem] flex flex-col lg:flex-row">
        <MainSection handleSubmit={handleSearch} images={imagesMainButtons} />
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
