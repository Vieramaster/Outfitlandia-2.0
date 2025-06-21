interface ClothesListProps {
  children: React.ReactNode;
}
export const ClothesList = ({ children }: ClothesListProps) => (
  <ul
    role="list"
    className="          
 p-10
    min-h-full 
    w-full 
    grid 
    grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] 
    place-content-center
    items-center
    gap-5
    lg:place-content-start
    "
  >
    {children}
  </ul>
);

