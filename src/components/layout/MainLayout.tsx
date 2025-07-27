import { Footer } from "./Footer";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main
        className="
        flex flex-col            
        flex-1                   
        overflow-auto               
        bg-background
        relative
        items-center   
        lg:min-h-[38rem]           
        lg:flex-row lg:justify-between 
        lg:items-start
      "
      >
        {children}
      </main>
      <Footer />
    </>
  );
};
