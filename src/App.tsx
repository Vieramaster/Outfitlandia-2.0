//HOOKS
import { MouseEventHandler, useEffect, useState } from "react";

//COMPONENTS
import { Header } from "./components/layout/Header";
import { MainSection } from "./components/sections/MainSection";
import { ChoiseSection } from "./components/sections/ChoiseSection";
import { WeatherSection } from "./components/sections/WeatherSection";
//DATA
import { DefaultImages } from "./data/Images";
import "./data/types";

function App() {
  const [imagesMainButtons, setImagesMainButtons] = useState(DefaultImages);
  const [showDivMobile, setShowDivMobile] = useState(false);

  const handleSearch: MouseEventHandler<HTMLButtonElement> = (event) => {
    const {
      currentTarget: { dataset: id },
    } = event;
    console.log(id);
    if (window.innerWidth < 1024) {
      setShowDivMobile(true);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setShowDivMobile(false);
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
      <main className="w-screen h-[calc(100vh-5rem)] min-h-[45rem] flex flex-col lg:min-h-[60rem] lg:flex-row">
        <MainSection handleSubmit={handleSearch} images={imagesMainButtons} />

        <section
          className={`${
            showDivMobile ? "absolute" : "hidden"
          } bg-orange-600 absolute w-screen h-[calc(100vh-4rem)] lg:block lg:w-2/3 lg:h-full lg:relative lg:order-3`}
        ></section>

        <section className="bg-violet-600 w-full h-22 lg:w-1/12 lg:h-full"></section>
      </main>
    </>
  );
}

export default App;
