import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

import { MainSection } from "./components/sections/MainSection";
function App() {
  return (
    <>
      <Header />
      <main className="bg-red-300 grow flex justify-center items-center" >
        <MainSection/>

      </main>
      <Footer />
    </>
  );
}

export default App;
