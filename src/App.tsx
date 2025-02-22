//HOOKS
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";

//COMPONENTS
import { Header } from "./components/layout/Header";
import { MainSection } from "./components/sections/MainSection";

import { WeatherSection } from "./components/sections/WeatherSection";
import { GarmentList } from "./components/lists/GarmentList";
import { ColorList } from "./components/lists/ColorList";

//DATA
import { DefaultImages } from "./data/Images";
import "./data/types";
import { ColorProductProps, productProps } from "./data/types";

function App() {
  //UseStates
  const [imagesMainButtons, setImagesMainButtons] = useState(DefaultImages);
  const [hideSection, setHideSection] = useState(false);
  const [searchClothes, setSearchClothes] = useState<
    "top" | "coat" | "pants" | null
  >(null);
  const [chosenClothes, setChosenClothes] = useState<productProps[] | null>([]);
  const [hiddenList, setHiddenList] = useState(0);

  //Reset the state of the app
  const resetState = () => {
    setImagesMainButtons(DefaultImages);
    setHideSection(false);
    setSearchClothes(null);
    setChosenClothes([]);
    setHiddenList(0);
  };

  //Fetch the data
  const { data: garmentsData } = useFetch("clothes", searchClothes);

  //Handle the resize of the window
  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setHideSection(false);
      setImagesMainButtons(DefaultImages);
    }
  };

  //Search the clothes
  const handleSearch: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      resetState();
      const {
        currentTarget: { id },
      } = event;
      setSearchClothes(id as "top" | "coat" | "pants");

      if (window.innerWidth < 1024) {
        setHideSection(true);
      }
    },
    []
  );

  //Overwrites the clothesChoise array with the designated garment
  const handleGarmentSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const {
        currentTarget: { id },
      } = event;
      const garmentFilter = garmentsData?.filter(
        (garment: productProps) => garment.id === Number(id)
      );
      
      if (garmentFilter) {
        setChosenClothes(garmentFilter);
      }
      setHiddenList(2);
    },
    [garmentsData]
  );

  //Overwrites the colors array of the selected item with the designated color
  const handleColorsSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const {
        currentTarget: { id },
      } = event;
      const colorFilter = chosenClothes?.[0]?.colors?.find(
        (color: ColorProductProps) => {
          return color.colorName === id;
        }
      );

      setChosenClothes((prevState) => {
        return [
          {
            ...prevState?.[0],

            colors: [colorFilter],
          },
        ] as productProps[];
      });
      setHiddenList(0);
      setHideSection(false);
    },

    [chosenClothes]
  );

  useEffect(() => {
    resetState();
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (garmentsData && garmentsData.length > 0) {
      setHiddenList(1);
    }
  }, [garmentsData]);

  const isHideSection = hideSection ? "block" : "hidden";

  return (
    <>
      <Header />
      <main className="relative w-full h-[calc(100vh-4rem)] min-h-[35rem] md:min-h-[45rem] flex flex-col  lg:flex-row">
        <MainSection handleSubmit={handleSearch} images={imagesMainButtons} />
        <section
          className={`${isHideSection} absolute w-full h-[calc(100vh-4rem)]  bg-rose-200 grid place-content-center place-items-center lg:block lg:relative lg:w-1/2  lg:order-3 2xl:w-2/3`}
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
