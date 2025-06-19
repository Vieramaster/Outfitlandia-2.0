interface ColorListProps {
  children: React.ReactNode;
}
export const ColorList = ({ children }: ColorListProps) => (
  <ul
    role="list"
    className="
    bg-sky-900 
    
    p-10
    min-h-full 
    w-full 
    grid 
    grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] 
    place-content-center
    gap-6"
  >
    {children}
  </ul>
);
