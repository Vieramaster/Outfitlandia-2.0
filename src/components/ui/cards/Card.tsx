interface CardProps {
  children: React.ReactNode;
  isDescription: boolean;
  arial?: string;
}
export const Card = ({ arial, isDescription, children }: CardProps) => {
  return (
    <li
      className={`
          ${
            isDescription
              ? "h-[18rem] md:h-[20.5rem] "
              : " h-[16rem] md:h-[18.2rem]"
          }
          w-[10rem] md:w-[12rem]
          flex-col m-auto flex gap-2
          place-content-center items-center 
        `}
      aria-label={arial}
    >
      {children}
    </li>
  );
};
