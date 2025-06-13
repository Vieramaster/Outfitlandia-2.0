//COMPONENTS
import Header from "./Header";
import Footer from "./Footer";
//HOOKS
import { useDynamicVh } from "../../hooks/useDynamicVh";

interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  useDynamicVh();
  return (
    <div className="mainLayoutCSS w-screen bg-offwhite">
      <Header />
      <main className="flex-1 overflow-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
