interface CardProps {
  children: React.ReactNode;
  isdescription: boolean;
  arial?: string;
}
export const Card = ({ arial, isdescription, children }: CardProps) => {
  return (
    <li
      className={`
          ${
            isdescription
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
