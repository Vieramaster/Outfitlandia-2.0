interface CardProps {
  children: React.ReactNode;
  arial?: string;
}
export const Card = ({ arial, children }: CardProps) => {
  return (
    <li
      className="w-[9rem] h-[14rem] flex-col m-auto flex gap-2 place-content-center items-center md:w-[12rem] md:h-[18.2rem] "
      aria-label={arial}
    >
      {children}
    </li>
  );
};
