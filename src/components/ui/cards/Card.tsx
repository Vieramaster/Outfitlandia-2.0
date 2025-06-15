interface CardProps {
  children: React.ReactNode;
  arial?: string;
}
export const Card = ({ arial, children }: CardProps) => {
  return (
    <li
      className="w-[9rem] h-[14rem] flex-col bg-orange-400 flex gap-2 place-content-center items-center"
      aria-label={arial}
    >
      {children}
    </li>
  );
};
