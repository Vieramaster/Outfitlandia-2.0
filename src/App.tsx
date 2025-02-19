//HOOKS
import { MouseEventHandler, useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";

//COMPONENTS
import { Header } from "./components/layout/Header";
import { MainSection } from "./components/sections/MainSection";
import { ClothesButton } from "./components/buttons/ClothesButton";

//DATA
import { DefaultImages } from "./data/Images";
import "./data/types";

function App() {
  const [imagesMainButtons, setImagesMainButtons] = useState(DefaultImages);
  const [showDivMobile, setShowDivMobile] = useState(false);
  const [searchClothes, setSearchClothes] = useState<"top" | "coat" | "pants">(
    "top"
  );

  const handleSearch: MouseEventHandler<HTMLButtonElement> = (event) => {
    const {
      currentTarget: { id },
    } = event;
    setSearchClothes(id as "top" | "coat" | "pants");

    if (window.innerWidth < 1024) {
      setShowDivMobile(true);
    }
  };

  const { data: dataGarments } = useFetch("clothes", searchClothes);

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setShowDivMobile(false);
      setImagesMainButtons(DefaultImages);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="w-screen h-[calc(100vh-5rem)] min-h-[45rem]  flex flex-col  lg:flex-row">
        <MainSection handleSubmit={handleSearch} images={imagesMainButtons} />

        <section
          className={`${
            showDivMobile ? "absolute" : "hidden"
          } bg-orange-600 absolute w-screen min-h-[calc(100vh-5rem)] 
           
            grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]  gap-4 place-items-center


            
          lg:block lg:w-1/2 lg:h-full lg:relative lg:order-3 2xl:w-2/3  `}
        >
          {dataGarments?.map(({ garment, name, image }, index) => {
            return (
              <ClothesButton
                key={index}
                image={image}
                data-id={garment}
                aria-labelledby={name}
              />
            );
          })}
        </section>

        <section className="bg-violet-600 w-full h-22 lg:w-1/12 lg:h-full"></section>
      </main>
    </>
  );
}

export default App;
