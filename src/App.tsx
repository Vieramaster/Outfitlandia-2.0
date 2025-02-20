//HOOKS
import { MouseEventHandler, useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";

//COMPONENTS
import { Header } from "./components/layout/Header";
import { MainSection } from "./components/sections/MainSection";
import { ChoiseSection } from "./components/sections/ChoiseSection";
import { WeatherSection } from "./components/sections/WeatherSection";

//DATA
import { DefaultImages } from "./data/Images";
import "./data/types";
import { Product } from "./data/types";

function App() {
  const [imagesMainButtons, setImagesMainButtons] = useState(DefaultImages);
  const [showDivMobile, setShowDivMobile] = useState(false);
  const [searchClothes, setSearchClothes] = useState<
    "top" | "coat" | "pants" | undefined
  >(undefined);
  const [ClothesChoise, setClothesChoise] = useState<Product[] | undefined>([]);

  const handleSearch: MouseEventHandler<HTMLButtonElement> = (event) => {
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

    const lala = garmentsData?.filter(
      (garment: Product) => garment.id === Number(id)
    );

    setClothesChoise(lala);
  };

  const handleColorsSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    const {
      currentTarget: { id },
    } = event;
    setClothesChoise((prev) =>
      prev?.filter((garment: Product) => {
        return garment.colors?.filter((color) => color.colorName !== id);
      })
    );
  };

  console.log(ClothesChoise);
  const resetState = () => {
    setSearchClothes(undefined);
    setShowDivMobile(false);
    setImagesMainButtons(DefaultImages);
  };

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

        <ChoiseSection
          isHidden={showDivMobile}
          arrayClothes={garmentsData}
          arrayColors={ClothesChoise}
          onGarmentSubmit={handleGarmentSubmit}
          onColorsSubmit={handleColorsSubmit}
        />

        <WeatherSection />
      </main>
    </>
  );
}

export default App;
