//HOOKS
import { MouseEventHandler, useState } from "react";

//COMPONENTS
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { MainSection } from "./components/sections/MainSection";
import { ChoiseSection } from "./components/sections/ChoiseSection";

//DATA
import { DefaultImages } from "./data/Images";
import "./data/types";

function App() {
  const [imagesMainButtons, setImagesMainButtons] = useState(DefaultImages);
  const [swapDiv, setSwapDiv] = useState(false);

  const handleSearch: MouseEventHandler<HTMLButtonElement> = (event) => {
    const {
      currentTarget: { dataset: id },
    } = event;
    console.log(id);
    setSwapDiv(true);
  };

  return (
    <>
      <Header />
      <main className="bg-red-300 grow flex justify-center items-center py-5 relative mt-16">
        <MainSection images={imagesMainButtons} handleSubmit={handleSearch} />
        <ChoiseSection isHidden={swapDiv} />
      </main>
      <Footer />
    </>
  );
}

export default App;
