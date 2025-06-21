interface MainLayoutProps {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main
      className="
        flex flex-col            
        flex-1                   
       overflow-auto               
        background-color
        relative
        items-center   
        lg:min-h-[38rem]           
        lg:flex-row lg:justify-between 
        lg:items-start
      "
    >
      {children}
    </main>
  );
};
