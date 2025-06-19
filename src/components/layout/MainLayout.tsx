interface MainLayoutProps {
  children: React.ReactNode;
}
export const HomeLayout = ({ children }: MainLayoutProps) => {
  return (
    <main
      className="
        flex flex-col            
        flex-1                   
        min-h-0                  
        bg-yellow-500  
        relative
        items-center              
        lg:flex-row lg:justify-between 
        lg:items-start
      "
    >
      {children}
    </main>
  );
};
