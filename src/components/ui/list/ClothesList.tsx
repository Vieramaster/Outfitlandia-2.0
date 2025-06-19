interface ClothesListProps {
  children: React.ReactNode;
}
export const ClothesList = ({ children }: ClothesListProps) => (
  <ul
    role="list"
    className="          
bg-red-500 
    p-10
    overflow-x-auto    
    min-h-full 
    w-full 
    flex flex-wrap justify-center
    gap-6"
  >
    {children}
  </ul>
);

/**
 * 
 * bg-red-500 
    p-10
    overflow-x-auto    min-h-full 
    w-full 
    flex flex-wrap gap-8
    gap-6
 */
