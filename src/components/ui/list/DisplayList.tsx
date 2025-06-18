interface DisplayListProps {
  display: "colors" | "garments";
  children: React.ReactNode;
}
export const DisplayList = ({ display, children }: DisplayListProps) => (
  <ul
    role="list"
    className={` 
        className="
          p-10 bg-red-500 mt-10
          flex flex-wrap gap-8
          w-full h-full
          min-h-80
          overflow-y-auto
          justify-center items-center
          lg:mt-0 lg:h-[90%] lg:w-[95%]
        "`}
  >
    {children}
  </ul>
);
