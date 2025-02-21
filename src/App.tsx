//HOOKS
import { MouseEventHandler, useEffect, useState } from "react";
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
import { Product } from "./data/types";

function App() {
  const [imagesMainButtons, setImagesMainButtons] = useState(DefaultImages);
  const [hideSection, setHideSection] = useState(false);
  const [searchClothes, setSearchClothes] = useState<
    "top" | "coat" | "pants" | undefined
  >(undefined);
  const [ClothesChoise, setClothesChoise] = useState<Product[] | undefined>([]);

  const resetState = () => {
    setSearchClothes(undefined);
    setShowDivMobile(false);
    setImagesMainButtons(DefaultImages);
    setClothesChoise([]);
  };

  const handleSearch: MouseEventHandler<HTMLButtonElement> = (event) => {
    resetState();
    const {
      currentTarget: { id },
    } = event;
    setSearchClothes(id as "top" | "coat" | "pants");

    if (window.innerWidth < 1024) {
      setShowDivMobile(true);
    }
  };

  const { data: garmentsData } = useFetch("clothes", searchClothes);

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setShowDivMobile(false);
      setImagesMainButtons(DefaultImages);
    }
  };

  const handleGarmentSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    const {
      currentTarget: { id },
    } = event;

    const garmentFilter = garmentsData?.filter(
      (garment: Product) => garment.id === Number(id)
    );

    setClothesChoise(garmentFilter);
  };

  const handleColorsSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    const {
      currentTarget: { id },
    } = event;
    const colorFilter = ClothesChoise?.[0]?.colors?.find((color) => {
      return color.colorName === id;
    });

    setClothesChoise((prevState) => {
      return [
        {
          ...prevState?.[0],

          colors: [colorFilter],
        },
      ] as Product[];
    });
  };

  console.log(ClothesChoise);

  useEffect(() => {
    resetState();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="relative w-full h-[calc(100vh-4rem)] min-h-[35rem] md:min-h-[45rem] flex flex-col  lg:flex-row">
        <MainSection handleSubmit={handleSearch} images={imagesMainButtons} />
        <section
          className={`${hideSection} w-full h-[calc(100vh-4rem)]  bg-rose-200 rounded shadow-md grid place-content-center place-items-center lg:block lg:relative lg:w-1/2  lg:order-3 2xl:w-2/3`}
        >
          <GarmentList handleGarmentSubmit={handleGarmentSubmit}/>
          <ColorList handleColorsSubmit={handleColorsSubmit}/>
          <ColorList />
        </section>

        <WeatherSection />
      </main>
    </>
  );
}

export default App;
/**
 *         <ChoiseSection
          isHidden={showDivMobile}
          arrayClothes={garmentsData}
          arrayColors={ClothesChoise}
          onGarmentSubmit={handleGarmentSubmit}
          onColorsSubmit={handleColorsSubmit}
        />
 */
