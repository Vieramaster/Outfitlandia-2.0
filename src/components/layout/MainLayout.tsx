//COMPONENTS
import { Header } from "./Header";
import { Footer } from "./Footer";
//HOOKS
import { useDynamicVh } from "../../hooks/useDynamicVh";

interface MainLayoutProps {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: MainLayoutProps) => {
  useDynamicVh();
  return (
    <div className="bg-offwhite mainLayoutCSS w-screen min-h-[40rem]">
      <Header />
      <main className="flex-1 relative min-h-[30rem] ">{children}</main>
      <Footer />
    </div>
  );
};
